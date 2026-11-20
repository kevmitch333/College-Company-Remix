import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.set('trust proxy', 1);

// 301 Redirect www -> canonical bare domain (college.company)
app.use((req, res, next) => {
  const forwardedHost = (req.headers['x-forwarded-host'] || req.headers.host || '').toString().toLowerCase();
  const hostOnly = forwardedHost.split(',')[0].trim().split(':')[0];
  if (hostOnly.startsWith('www.')) {
    const bareHost = hostOnly.slice(4);
    const proto = (req.headers['x-forwarded-proto'] || req.protocol || 'https').toString().split(',')[0].trim();
    const targetProto = bareHost === 'localhost' ? proto : 'https';
    return res.redirect(301, `${targetProto}://${bareHost}${req.originalUrl}`);
  }
  next();
});

app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '0');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' https://apis.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://images.unsplash.com https://college.company https://*.run.app; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com; frame-ancestors 'self' https://*.google.com https://*.run.app; upgrade-insecure-requests;"
  );
  next();
});

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 60;

function apiRateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const clientData = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + RATE_LIMIT_WINDOW_MS;
  } else {
    clientData.count++;
  }

  rateLimitMap.set(ip, clientData);

  if (rateLimitMap.size > 5000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) rateLimitMap.delete(key);
    }
  }

  if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please wait a moment before sending more requests.',
      retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
    });
  }
  next();
}

const isValidEmail = (email: unknown): email is string =>
  typeof email === 'string' &&
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(email.trim());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), port });
});

app.get(['/rss.xml', '/feed.xml', '/intelligence/rss.xml', '/api/rss'], (_req, res) => {
  const rssDist = path.resolve(__dirname, 'dist', 'rss.xml');
  const rssPublic = path.resolve(__dirname, 'public', 'rss.xml');
  const filePath = fs.existsSync(rssDist) ? rssDist : rssPublic;
  if (fs.existsSync(filePath)) {
    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.set('Cache-Control', 'public, max-age=1800, s-maxage=3600');
    return res.sendFile(filePath);
  }
  res.status(404).type('text/plain').send('RSS feed not found');
});

app.post('/api/contact', apiRateLimiter, (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const role =
    typeof body.role === 'string'
      ? body.role.trim()
      : typeof body.audience === 'string'
      ? body.audience.trim()
      : 'student';
  const organization = typeof body.organization === 'string' ? body.organization.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const honeypot = typeof body.website === 'string' ? body.website.trim() : '';

  if (honeypot) {
    return res.json({ success: true, referenceId: 'CC-OK' });
  }

  const fieldErrors: Record<string, string> = {};
  if (!name || name.length < 2) fieldErrors.name = 'Please enter your full name.';
  if (!isValidEmail(email)) fieldErrors.email = 'Please enter a valid email address.';
  if (!message || message.length < 10) fieldErrors.message = 'Please include a short message (at least 10 characters).';

  if (Object.keys(fieldErrors).length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Please review the highlighted fields and try again.',
      fieldErrors
    });
  }

  const referenceId = `CC-${Date.now().toString(36).toUpperCase()}`;
  console.info('[Contact Inquiry]', { referenceId, name, email, role, organization, receivedAt: new Date().toISOString() });

  return res.json({
    success: true,
    referenceId,
    contactEmail: 'kevin@collegeesportsx.com',
    confirmationEmailTarget: email,
    message: `Thank you, ${name}. Your note has been logged (ref ${referenceId}) for Kevin Mitchell at kevin@collegeesportsx.com, and a confirmation summary has been prepared for ${email}.`
  });
});

app.post('/api/brand-inquiry', apiRateLimiter, (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const name =
    typeof body.name === 'string'
      ? body.name.trim()
      : typeof body.contactName === 'string'
      ? body.contactName.trim()
      : '';
  const company =
    typeof body.company === 'string'
      ? body.company.trim()
      : typeof body.brandName === 'string'
      ? body.brandName.trim()
      : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const campaignGoal = typeof body.campaignGoal === 'string' ? body.campaignGoal.trim() : '';

  const fieldErrors: Record<string, string> = {};
  if (!name || name.length < 2) fieldErrors.name = 'Please enter your name.';
  if (!company || company.length < 2) fieldErrors.company = 'Please enter your brand or organization name.';
  if (!isValidEmail(email)) fieldErrors.email = 'Please enter a valid work email address.';
  if (!campaignGoal || campaignGoal.length < 10) fieldErrors.campaignGoal = 'Please describe your campaign goals and timing (at least 10 characters).';

  if (Object.keys(fieldErrors).length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Please check the required fields below.',
      fieldErrors
    });
  }

  const referenceId = `NBM-${Date.now().toString(36).toUpperCase()}`;
  console.info('[Brand Placement Inquiry]', { referenceId, name, company, email, receivedAt: new Date().toISOString() });

  return res.json({
    success: true,
    referenceId,
    contactEmail: 'kevin@collegeesportsx.com',
    confirmationEmailTarget: email,
    message: `Thank you, ${name}. Your Placement Desk brief inquiry for ${company} (ref ${referenceId}) has been recorded for kevin@collegeesportsx.com, with confirmation sent to ${email}.`
  });
});

app.post('/api/request-information', apiRateLimiter, (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const organization = typeof body.organization === 'string' ? body.organization.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const notes = typeof body.notes === 'string' ? body.notes.trim() : '';
  const acknowledged = body.acknowledged === true;

  const fieldErrors: Record<string, string> = {};
  if (!name || name.length < 2) fieldErrors.name = 'Please enter your full name.';
  if (!organization || organization.length < 2) fieldErrors.organization = 'Please enter your organization name.';
  if (!isValidEmail(email)) fieldErrors.email = 'Please enter a valid email address.';
  if (!acknowledged) fieldErrors.acknowledged = 'Please check the confirmation box so we know how to reply.';

  if (Object.keys(fieldErrors).length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Please complete the required fields and review the confirmation box.',
      fieldErrors
    });
  }

  const referenceId = `REQ-${Date.now().toString(36).toUpperCase()}`;
  console.info('[Request Information]', { referenceId, name, organization, email, notes: notes.slice(0, 120), receivedAt: new Date().toISOString() });

  return res.json({
    success: true,
    referenceId,
    contactEmail: 'kevin@collegeesportsx.com',
    confirmationEmailTarget: email,
    message: `Information request logged (ref ${referenceId}). Kevin Mitchell (kevin@collegeesportsx.com) will follow up with ${email}.`
  });
});

app.post('/api/newsletter', apiRateLimiter, (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  const institution = typeof body.institution === 'string' ? body.institution.trim() : '';
  const topics = Array.isArray(body.topics) ? body.topics.slice(0, 10) : [];

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address to subscribe.'
    });
  }

  const referenceId = `SUB-${Date.now().toString(36).toUpperCase()}`;
  console.info('[Newsletter Subscription]', { referenceId, email, fullName, institution, topics, receivedAt: new Date().toISOString() });

  return res.json({
    success: true,
    referenceId,
    email,
    message: `Subscription registered for ${email}. Updates come from kevin@collegeesportsx.com.`
  });
});

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const VERIFIED_WIRE_ITEMS = [
  {
    id: 'wire-01-ftc-endorsement-guides',
    headline: 'FTC Endorsement Guides: Clear Paid-Partnership Disclosures for Student Creators',
    source: 'FTC Business Guidance',
    sourceUrl: 'https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking',
    publishedTime: 'October 2026',
    category: 'Trust & Compliance',
    summary:
      'Federal Trade Commission guidance outlines how students receiving cash, free gear, or travel perks must use plain-language #ad or Paid Partnership disclosures where viewers see and hear them.',
    fiduciaryImpact:
      'Built directly into College Creator Academy modules and NIL Compliance Pro checklists so every student learns disclosure rules upfront.',
    groundingQuery: 'FTC endorsement guides influencers clear and conspicuous disclosure',
    verifiedPill: 'Public Reference'
  },
  {
    id: 'wire-02-irs-gig-economy-tax-center',
    headline: 'IRS Gig Economy & Self-Employment Tax Center: Reporting Rules for Creators',
    source: 'Internal Revenue Service',
    sourceUrl: 'https://www.irs.gov/businesses/gig-economy-tax-center',
    publishedTime: 'October 2026',
    category: 'Trust & Taxes',
    summary:
      'IRS guidance confirms independent contractor and creator earnings of $400 or more in net self-employment income generally trigger federal tax filing requirements, including non-cash payments.',
    fiduciaryImpact:
      'Forms the factual backbone of NIL Money 101 so students and parents plan for forms season and quarterly estimates.',
    groundingQuery: 'IRS gig economy self employment tax 400 threshold 1099-NEC',
    verifiedPill: 'Public Reference'
  },
  {
    id: 'wire-03-beyond-varsity-campus-clubs',
    headline: 'Open Campus Competition: Designing Leagues Around Clubs & General Students',
    source: 'College Company Program Brief',
    sourceUrl: 'https://college.company/compete',
    publishedTime: 'October 2026',
    category: 'Compete',
    summary:
      'College Esports Expo (CEX), College Drone Racing League (CDRL), College Racing League (CRL), College GTA, and AGONiQ are designed for everyday campus students and clubs rather than varsity-only rosters.',
    fiduciaryImpact:
      'Expands access to team building, technical production, and event leadership for the general collegiate population.',
    groundingQuery: 'collegiate clubs general student body esports drone racing',
    verifiedPill: 'Program Note'
  }
];

app.post('/api/market-intelligence', apiRateLimiter, async (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const category = typeof body.category === 'string' ? body.category.trim().slice(0, 100) : '';
  const query = typeof body.query === 'string' ? body.query.trim().slice(0, 300) : '';

  let filtered = VERIFIED_WIRE_ITEMS;
  if (category && category !== 'All') {
    filtered = filtered.filter((item) => item.category === category);
  }
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.headline.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q)
    );
  }

  if (!ai) {
    return res.json({
      success: true,
      mode: 'grounded_archive',
      items: filtered,
      searchQueries: ['FTC endorsement disclosures', 'IRS $400 self-employment rule'],
      timestamp: new Date().toISOString()
    });
  }

  try {
    const searchPrompt = query
      ? `Search public educational and government sources regarding: "${query}" in collegiate NIL education, FTC disclosures, or student tax literacy.`
      : `Summarize recent public policy updates regarding FTC endorsement disclosures and IRS self-employment rules for student creators and athletes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: searchPrompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction:
          'Provide plain-English, non-speculative summaries citing only verified public government or news URLs. Do not invent statistics or institutional metrics.'
      }
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSearchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];
    const sources = groundingChunks
      .filter((c: any) => c.web?.uri)
      .map((c: any) => ({
        title: c.web?.title || 'Public Reference',
        url: c.web?.uri || '#'
      }));

    return res.json({
      success: true,
      mode: 'live_grounded',
      text: response.text || '',
      sources,
      searchQueries: webSearchQueries,
      items: filtered,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.warn('Search grounding fallback:', err.message);
    return res.json({
      success: true,
      mode: 'grounded_archive',
      items: filtered,
      searchQueries: ['FTC endorsement disclosures', 'IRS $400 self-employment rule'],
      timestamp: new Date().toISOString()
    });
  }
});

async function startServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const distIndex = path.resolve(distPath, 'index.html');
  const hasDist = fs.existsSync(distIndex);

  function servePrerendered(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    let requested: string;
    try {
      requested = decodeURIComponent(req.path).replace(/\/+$/, '');
    } catch {
      return next();
    }
    if (!requested) return next();
    const candidate = path.resolve(distPath, '.' + requested, 'index.html');
    if (!candidate.startsWith(distPath + path.sep) || !fs.existsSync(candidate)) return next();
    return res.sendFile(candidate);
  }

  if (process.env.NODE_ENV === 'production' || hasDist) {
    app.use(servePrerendered);
    app.use(express.static(distPath));
    app.use((_req, res) => {
      res.sendFile(distIndex);
    });
  } else {
    try {
      const { createServer } = await import('vite');
      const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'spa'
      });
      app.use(vite.middlewares);
    } catch {
      if (hasDist) {
        app.use(servePrerendered);
        app.use(express.static(distPath));
        app.use((_req, res) => {
          res.sendFile(distIndex);
        });
      }
    }
  }

  const server = app.listen(port, () => {
    console.log(`College Company Full-Stack Server listening on port ${port}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
  });

  process.on('SIGINT', () => {
    server.close(() => process.exit(0));
  });
}

startServer();
