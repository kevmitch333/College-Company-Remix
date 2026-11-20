/**
 * Syndicated Research Wire & Market Wire Feed for College Company.
 * Matches on-site Research Wire dispatches and Market Wire entries 1:1 in items and order.
 */

export interface ResearchDispatchItem {
  id: string;
  kind: 'article' | 'wire';
  title: string;
  subtitle: string;
  category: string;
  author: string;
  authorRole: string;
  pubDate: string;
  publishedAtFormatted: string;
  readTime: string;
  link: string;
  sourceName?: string;
  sourceUrl?: string;
  keyTakeaways: string[];
  content: string;
}

export const RESEARCH_WIRE_ITEMS: ResearchDispatchItem[] = [
  {
    id: 'art-01-creator-workforce-curriculum',
    kind: 'article',
    title: 'Inside the Five-Track Creator Economy Curriculum for General College Students',
    subtitle:
      'Why digital storytelling, live production, and contract literacy belong in every student’s career toolkit — not only varsity athletics.',
    category: 'Learn',
    author: 'Kevin Mitchell',
    authorRole: 'Founder, College Company',
    pubDate: 'Wed, 14 Oct 2026 09:00:00 GMT',
    publishedAtFormatted: 'October 2026',
    readTime: '4 min read',
    link: 'https://college.company/intelligence#art-01-creator-workforce-curriculum',
    keyTakeaways: [
      'Most college students never play a varsity sport, yet want hands-on media, production, and entrepreneurship skills.',
      'College Creator Academy teaches content, live production, business basics, compliance, and career translation across five structured tracks.',
      'Compliance, FTC disclosure, and recordkeeping are taught upfront alongside creative craft.',
    ],
    content: `### Beyond Varsity-Only Programs

When people hear about college digital sports or NIL, they often picture a small fraction of division-one varsity starters. Yet across every campus, thousands of general students want practical experience in video production, commentary, community leadership, and digital brand partnerships.

### Five Practical Workforce Tracks

College Creator Academy is organized into five step-by-step tracks designed to turn curiosity into real portfolio proof:

- **Content & Storytelling Foundations**: Voice, narrative craft, editing structure, and accessible formatting.
- **Production & Broadcast Crafts**: Practical audio, lighting, camera setup, and live event workflows.
- **Business Models & Audience Growth**: Building owned media kits, clear deliverables, and realistic rate cards.
- **Compliance, Disclosure & Taxes**: FTC paid-partnership rules, contract redlines, and recordkeeping.
- **Workforce Readiness & Career Launch**: Translating student projects into internships, agency roles, or small businesses.

### Why Compliance Belongs in the Curriculum

Students should never have to guess what disclosures a post requires or what happens when a brand sends free gear instead of cash. Making the rules part of the curriculum empowers students and gives families confidence from day one.`,
  },
  {
    id: 'art-02-nil-money-and-family-taxes',
    kind: 'article',
    title: 'What Every Student & Parent Should Know Before Saying Yes to a First Brand Deal',
    subtitle:
      'A plain-English look at the IRS $400 filing trigger, NIL Go $600 reporting, quarterly estimates, and financial aid conversations.',
    category: 'Trust & Taxes',
    author: 'Kevin Mitchell',
    authorRole: 'Founder, College Company',
    pubDate: 'Fri, 02 Oct 2026 13:30:00 GMT',
    publishedAtFormatted: 'October 2026',
    readTime: '5 min read',
    link: 'https://college.company/intelligence#art-02-nil-money-and-family-taxes',
    keyTakeaways: [
      'Net self-employment earnings of $400 or more generally require filing a federal tax return.',
      'Products, travel, and stipends can count as taxable fair market value alongside cash payments.',
      'Parents and students benefit from talking through W-9s, 1099-NECs, FAFSA timing, and state residency rules before signing.',
    ],
    content: `### Taxes Start Smaller Than Many Families Expect

A common myth is that students only owe taxes once a brand sends a Form 1099-NEC at $600. In reality, under federal tax rules, **net self-employment income of $400 or more** generally triggers a federal filing requirement — even if no 1099 form arrives in January and even when part of a deal is paid in gear or travel.

### Key Checkpoints Covered in NIL Money 101

1. **The $400 Filing Trigger**: Tracking gross income minus documented ordinary expenses early avoids surprises in April.
2. **NIL Go & $600 Reporting**: Understanding how institutional and conference reporting disclosures operate alongside tax paperwork.
3. **Forms Season & Quarterly Estimates**: Knowing what a W-9 asks for upfront and setting aside a tax reserve before spending payouts.
4. **Scholarships, Aid & Multi-State Cautions**: Checking how taxable earnings affect need-based aid, plus non-resident state filings and strict federal rules for F-1 international students.

### Education First, Not Surprises

NIL Money 101 provides general financial literacy for students and parents so families know what questions to ask a qualified CPA, campus financial aid advisor, or designated school official before agreeing to terms.`,
  },
  {
    id: 'art-03-student-first-charter-brand-match',
    kind: 'article',
    title: 'Why the Placement Desk Charges Brands a Disclosed Fee — and Zero Commission to Students',
    subtitle:
      'How the Student-First Charter aligns brand safety, clear deliverables, and full payout transparency.',
    category: 'Earn',
    author: 'Kevin Mitchell',
    authorRole: 'Founder, College Company',
    pubDate: 'Sun, 20 Sep 2026 10:00:00 GMT',
    publishedAtFormatted: 'September 2026',
    readTime: '4 min read',
    link: 'https://college.company/intelligence#art-03-student-first-charter-brand-match',
    keyTakeaways: [
      'Students and creators receive 100% of agreed compensation with zero commission withheld.',
      'Brands pay a single, clearly disclosed platform fee scoped per campaign brief.',
      'Every campaign checklist pairs deliverables with FTC disclosure and compliance standards.',
    ],
    content: `### Rethinking Marketplace Incentives

Traditional talent and influencer marketplaces frequently deduct 15% to 25% directly from student payouts. For college students balancing classes and early career growth, hidden percentage cuts erode trust before a campaign even ships.

### The Student-First Charter

Under College Company's Placement Desk model:

- **Zero Student Commission**: Learners and student competitors never pay a marketplace cut out of earned brand fees.
- **Disclosed Brand Fee**: Brands see the campaign budget and the platform service fee separated cleanly upfront.
- **Compliance Built In**: FTC disclosure language, clear deliverable dates, and usage rights stay plain-English and easy to audit.

By keeping incentives clean on both sides, students keep what they earn and sponsors build credible, compliant campus relationships.`,
  },
  {
    id: 'wire-01-ftc-endorsement-guides',
    kind: 'wire',
    title: 'FTC Endorsement Guides: Clear Paid-Partnership Disclosures for Student Creators',
    subtitle:
      'A reminder on visible #ad labeling, video overlays, and material-connection transparency when students receive cash or free gear.',
    category: 'Trust & Compliance',
    author: 'Federal Trade Commission (Reference)',
    authorRole: 'Regulatory Reference',
    pubDate: 'Thu, 15 Oct 2026 14:15:00 GMT',
    publishedAtFormatted: 'October 2026',
    readTime: '3 min read',
    link: 'https://college.company/intelligence/market-wire#wire-01-ftc-endorsement-guides',
    sourceName: 'FTC Business Guidance',
    sourceUrl: 'https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking',
    keyTakeaways: [
      'Free products, discounts, or event access trigger a material connection that requires clear disclosure.',
      'Disclosures should appear in plain language where viewers actually look and listen — not buried after a "more" fold.',
    ],
    content: `Federal Trade Commission guidance makes clear that when a student creator or athlete receives money, free products, or perks to talk about a brand, the relationship must be disclosed clearly and conspicuously. Both College Creator Academy and NIL Compliance Pro build practical FTC checklists into campaign workflows.`,
  },
  {
    id: 'wire-02-irs-gig-economy-tax-center',
    kind: 'wire',
    title: 'IRS Gig Economy & Self-Employment Tax Center: Reporting Rules for Creators',
    subtitle:
      'Key federal tax filing rules for independent contractor income, Form 1099-NEC, and keeping receipts for student earners.',
    category: 'Trust & Taxes',
    author: 'Internal Revenue Service (Reference)',
    authorRole: 'Tax Reference',
    pubDate: 'Wed, 14 Oct 2026 18:45:00 GMT',
    publishedAtFormatted: 'October 2026',
    readTime: '3 min read',
    link: 'https://college.company/intelligence/market-wire#wire-02-irs-gig-economy-tax-center',
    sourceName: 'IRS Gig Economy Tax Center',
    sourceUrl: 'https://www.irs.gov/businesses/gig-economy-tax-center',
    keyTakeaways: [
      'Self-employment tax filing begins at $400 in net earnings, independent of whether a Form 1099 was issued.',
      'Good recordkeeping separates gross revenue from deductible ordinary business expenses.',
    ],
    content: `According to official IRS guidance for gig workers and digital creators, taxable earnings must be reported even when work is part-time or paid in non-cash goods. NIL Money 101 translates these baseline federal rules into clear checklists for students and parents.`,
  },
  {
    id: 'wire-03-beyond-varsity-campus-clubs',
    kind: 'wire',
    title: 'Open Campus Competition: Designing Leagues Around Clubs & General Students',
    subtitle:
      'How CEX, CDRL, and CRL prioritize broad student access over varsity-only rosters.',
    category: 'Compete',
    author: 'College Company Editorial',
    authorRole: 'Program Brief',
    pubDate: 'Mon, 12 Oct 2026 16:00:00 GMT',
    publishedAtFormatted: 'October 2026',
    readTime: '3 min read',
    link: 'https://college.company/intelligence/market-wire#wire-03-beyond-varsity-campus-clubs',
    keyTakeaways: [
      'Campus gaming, drone, and sim-racing clubs welcome students across engineering, media, and business majors.',
      'All five Compete programs remain in development or concept stage with open interest forms for students and schools.',
    ],
    content: `College Company is designing CEX, College Drone Racing League (CDRL), College Racing League (CRL), College GTA, and AGONiQ so general college students and campus clubs can participate as players, mechanics, hosts, or organizers without requiring varsity recruiting.`,
  },
];

export interface RssItem {
  id: string;
  title: string;
  link: string;
  description: string;
  contentEncoded?: string;
  category: string;
  author: string;
  pubDate: string;
  sourceName?: string;
  sourceUrl?: string;
}

export const RSS_ITEMS: RssItem[] = RESEARCH_WIRE_ITEMS.map((item) => ({
  id: item.id,
  title: item.title,
  link: item.link,
  description: item.subtitle,
  contentEncoded: item.content,
  category: item.category,
  author: `${item.author} (${item.authorRole})`,
  pubDate: item.pubDate,
  sourceName: item.sourceName,
  sourceUrl: item.sourceUrl,
}));

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateRssXml(items: RssItem[] = RSS_ITEMS): string {
  const siteUrl = 'https://college.company';
  const feedUrl = `${siteUrl}/rss.xml`;
  const intelligenceUrl = `${siteUrl}/intelligence`;
  const buildDate = new Date().toUTCString();

  const itemsXml = items
    .map((item) => {
      const itemLink = item.link.startsWith('http') ? item.link : `${siteUrl}${item.link}`;
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(itemLink)}</link>
      <guid isPermaLink="false">${escapeXml(item.id)}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <author>kevin@collegeesportsx.com (${escapeXml(item.author)})</author>
      <description><![CDATA[${item.description}]]></description>
      ${item.contentEncoded ? `<content:encoded><![CDATA[${item.contentEncoded}]]></content:encoded>` : ''}
      ${item.sourceName && item.sourceUrl ? `<source url="${escapeXml(item.sourceUrl)}">${escapeXml(item.sourceName)}</source>` : ''}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>College Company | Research Wire &amp; Updates</title>
    <link>${intelligenceUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>Plain-English guides and updates on micro-courses, collegiate competitions beyond varsity, and student-first earning compliance.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${items[0]?.pubDate || buildDate}</pubDate>
    <copyright>Copyright 2026 College Company. All rights reserved.</copyright>
    <managingEditor>kevin@collegeesportsx.com (Kevin Mitchell)</managingEditor>
    <webMaster>kevin@collegeesportsx.com (Kevin Mitchell)</webMaster>
    <docs>https://www.rssboard.org/rss-specification</docs>
${itemsXml}
  </channel>
</rss>`;
}
