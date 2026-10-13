// Writes one crawlable HTML file per route into dist/ after `vite build`.
// Each file carries its own title, description, canonical URL and a static summary,
// so search engines and link-preview bots read real content without running JavaScript.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const routes = JSON.parse(fs.readFileSync(path.join(root, 'src', 'routes.json'), 'utf8'));
const SITE = 'https://college.company';

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

function replaceOnce(html, pattern, replacement, label) {
  const matches = html.match(new RegExp(pattern.source, 'g')) || [];
  if (matches.length !== 1) throw new Error(`Expected one match for ${label}, found ${matches.length}`);
  return html.replace(pattern, replacement);
}

function renderRoute(route) {
  const url = `${SITE}${route.path === '/' ? '/' : route.path}`;
  const nav = routes
    .filter((r) => r.indexable)
    .map((r) => `<li><a href="${r.path}">${esc(r.h1)}</a></li>`)
    .join('');
  const body = `<div id="root"><header><p>College Company</p></header><main><h1>${esc(route.h1)}</h1><p>${esc(route.summary)}</p><nav aria-label="Site sections"><ul>${nav}</ul></nav><noscript><p>This site is an interactive application. Enable JavaScript to use the full experience.</p></noscript></main></div>`;

  let html = template;
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`, 'title');
  html = replaceOnce(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(route.description)}" />`, 'description');
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, 'canonical');
  html = replaceOnce(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`, 'og:url');
  html = replaceOnce(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(route.title)}" />`, 'og:title');
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(route.description)}" />`, 'og:description');
  html = replaceOnce(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(route.title)}" />`, 'twitter:title');
  html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(route.description)}" />`, 'twitter:description');
  html = replaceOnce(html, /<div id="root">[\s\S]*?<\/div>/, body, 'root');
  if (!route.indexable) {
    html = html.replace('</head>', '<meta name="robots" content="noindex, nofollow" />\n  </head>');
  }
  return html;
}

for (const route of routes) {
  const html = renderRoute(route);
  if (route.path === '/') {
    fs.writeFileSync(path.join(dist, 'index.html'), html);
    continue;
  }
  const dir = path.join(dist, route.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

const urls = routes
  .filter((r) => r.indexable)
  .map((r) => `  <url><loc>${SITE}${r.path}</loc></url>`)
  .join('\n');
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

console.log(`Prerendered ${routes.length} routes (${routes.filter((r) => r.indexable).length} indexable).`);
