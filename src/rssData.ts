/**
 * RSS 2.0 Feed Generator for College Company's 'Intelligence & News' section.
 * Provides syndicated market updates, regulatory House v. NCAA rulings,
 * media rights valuations, and thought leadership articles for news readers.
 */

export interface RssItem {
  id: string;
  title: string;
  link: string;
  description: string;
  contentEncoded?: string;
  category: string;
  author: string;
  pubDate: string; // RFC 822 format (e.g., Thu, 15 Oct 2026 12:00:00 GMT)
  sourceName?: string;
  sourceUrl?: string;
}

export const RSS_ITEMS: RssItem[] = [
  {
    id: 'art-01-collegiate-consolidation',
    title: 'The Great Collegiate Consolidation: Why Digital Sports Are Higher Education’s Next Linear Media Frontier',
    link: 'https://college.company/intelligence#art-01-collegiate-consolidation',
    category: 'Holding Strategy',
    author: 'Elena Rostova (Managing Director, Sovereign Capital & Collegiate Media)',
    pubDate: 'Wed, 14 Oct 2026 09:00:00 GMT',
    description: 'An executive analysis of shifting Gen-Z student demographics, campus athletic budgets, and how collegiate digital sports consolidation mirrors the 1984 CFA linear television revolution.',
    contentEncoded: `Over the past four decades, intercollegiate athletics was defined by the democratization and subsequent monetization of linear broadcast rights. Following the landmark 1984 Supreme Court ruling in NCAA v. Board of Regents, universities wrested control of television properties. In 2026, higher education stands at an identical inflection point across decentralized digital channels, varsity gaming circuits, and regional student streaming networks. Consolidated commercial leverage yields a 3.8x revenue premium compared to fragmented individual campus negotiations.`
  },
  {
    id: 'news-01-house-settlement',
    title: 'House v. NCAA Settlement Clears Landmark $2.8B Revenue-Sharing Framework for Power-4 Athletics',
    link: 'https://college.company/intelligence/market-wire#news-01-house-settlement',
    category: 'House v. NCAA & Revenue Share',
    author: 'Sports Business Journal via College Company Intelligence Wire',
    pubDate: 'Thu, 15 Oct 2026 14:15:00 GMT',
    sourceName: 'Sports Business Journal',
    sourceUrl: 'https://www.sportsbusinessjournal.com',
    description: 'Federal court grants preliminary approval to landmark collegiate antitrust settlement, paving the way for universities to directly distribute up to $22.5M annually in commercial media and ticket revenue to student-athletes starting 2025-26. Fiduciary Impact: Accelerates bifurcation between high-budget athletic departments and mid-majors, elevating private holding company consolidation of auxiliary digital leagues.',
    contentEncoded: `Federal judge grants preliminary approval for the historic multi-billion dollar antitrust settlement. Universities are authorized to directly share up to $22M annually with rostered student-athletes. This expands funding moats for elite athletic departments while elevating the necessity for consolidated third-party commercial holding entities like College Company to manage auxiliary digital sports and brand licensing.`
  },
  {
    id: 'art-02-nil-escrow-architecture',
    title: 'NIL Escrow Architecture: Algorithmic Compliance Under Evolving NCAA Bylaw 12 and Title IX',
    link: 'https://college.company/intelligence#art-02-nil-escrow-architecture',
    category: 'Athletic Compliance',
    author: 'Sarah Jenkins, J.D. (Chief Regulatory Counsel, Collegiate Compliance Directorate)',
    pubDate: 'Fri, 02 Oct 2026 13:30:00 GMT',
    description: 'How automated geofenced smart contracts protect student-athlete amateur status while providing athletic directors with 100% transparent audit trails across 32 differing state statutory mandates.',
    contentEncoded: `Since the inception of the Name, Image, and Likeness era, university compliance directors have faced an intricate compliance puzzle. With more than thirty distinct state statutes governing disclosure timelines and permitted commercial categories, manual review processes fail. College Company provides geofenced statutory validation, permanent category blacklisting, and direct athletic director API synchronization.`
  },
  {
    id: 'news-02-fast-carriage-expansion',
    title: 'Collegiate Esports TV and Conference Digital Divisions Announce Multi-Year Linear FAST Carriage Expansion',
    link: 'https://college.company/intelligence/market-wire#news-02-fast-carriage-expansion',
    category: 'Collegiate Esports & Digital Leagues',
    author: 'Esports Insider & Cablefax via College Company Intelligence Wire',
    pubDate: 'Thu, 15 Oct 2026 12:10:00 GMT',
    sourceName: 'Esports Insider & Cablefax',
    sourceUrl: 'https://esportsinsider.com',
    description: 'Collegiate varsity esports broadcasts surpass 48 million aggregate connected-TV minutes across major FAST streaming channels, driven by collegiate sim racing (CRL) and tactical FPS regional conference rivalries.',
    contentEncoded: `Collegiate varsity esports broadcasts achieve significant connected-TV scale, logging over 48 million viewing minutes across FAST platforms. Validates College Company's thesis: digital collegiate athletics generates lucrative non-linear advertising inventory commanding blended $18.00–$24.00 CPMs without traditional stadium capital overhead.`
  },
  {
    id: 'art-03-campus-infrastructure-roi',
    title: 'From Dorm LANs to Varsity Arenas: Campus Infrastructure ROI for Division 1 Athletic Directorates',
    link: 'https://college.company/intelligence#art-03-campus-infrastructure-roi',
    category: 'Campus Infrastructure',
    author: 'Marcus Vance (Head of Campus Infrastructure & Facility Design)',
    pubDate: 'Sun, 20 Sep 2026 10:00:00 GMT',
    description: 'Evaluating the capital expenditure and multi-year yield of dedicated university esports arenas, broadcast labs, and high-performance STEM training hubs across 150+ university deployments.',
    contentEncoded: `A state-of-the-art 60-seat varsity digital sports arena requires roughly 15% of the capital expenditure demanded by a modest basketball training court, yet generates disproportionate admissions, corporate technology sponsorship, and student retention yield.`
  },
  {
    id: 'news-03-sec-bigten-nil-standards',
    title: 'SEC and Big Ten Joint Advisory Committee Proposes Unified NIL Roster Contract Standards',
    link: 'https://college.company/intelligence/market-wire#news-03-sec-bigten-nil-standards',
    category: 'NIL & Collectives',
    author: 'The Athletic & ESPN via College Company Intelligence Wire',
    pubDate: 'Wed, 14 Oct 2026 18:45:00 GMT',
    sourceName: 'The Athletic & ESPN',
    sourceUrl: 'https://www.espn.com/college-sports',
    description: 'Top athletic directors draft standardized NIL agent accreditation guidelines, transparent smart-contract disclosure clauses, and student-athlete fiduciary financial literacy requirements.',
    contentEncoded: `Athletic directors from the nation's premier conferences propose unified commercial contract baselines, transparent smart-contract disclosure clauses, and mandatory fiduciary escrow verification, reinforcing audited clearinghouses.`
  },
  {
    id: 'art-04-valuing-conference-broadcast-rights',
    title: 'Valuing Conference Digital Broadcast Rights: Beyond the Traditional Linear Cable Bundle',
    link: 'https://college.company/intelligence#art-04-valuing-conference-broadcast-rights',
    category: 'Media Rights',
    author: 'David Kim (VP of Media Syndication & Rights Valuations)',
    pubDate: 'Wed, 16 Sep 2026 15:20:00 GMT',
    description: 'A quantitative framework for valuing digital sports match streams, FAST distribution deals, and viewer engagement in the post-cord-cutting collegiate economy.',
    contentEncoded: `As traditional cable subscriptions decline, digital sports broadcasts attract the most coveted demographic in advertising: digital natives aged 18 to 34. Average viewing duration exceeds 48 minutes per session, surpassing traditional non-revenue linear sports.`
  },
  {
    id: 'news-04-stem-sim-drone-surge',
    title: 'Automotive & Aerospace Defense Giants Allocate Record $14M to Collegiate Sim Racing & Drone Piloting Circuits',
    link: 'https://college.company/intelligence/market-wire#news-04-stem-sim-drone-surge',
    category: 'Collegiate Esports & Digital Leagues',
    author: 'On3 NIL & VentureBeat via College Company Intelligence Wire',
    pubDate: 'Tue, 13 Oct 2026 11:30:00 GMT',
    sourceName: 'On3 NIL & VentureBeat',
    sourceUrl: 'https://www.on3.com/nil',
    description: 'Corporate STEM recruitment drives a 160% surge in collegiate sim racing and FPV drone racing tournament prize pools, targeting top aerospace and mechanical engineering student competitors.',
    contentEncoded: `Proves the capital premium commanded by technical digital sports (CRL & CDRL) where corporate sponsors leverage commercial NIL as an executive talent acquisition funnel for engineering undergraduates.`
  },
  {
    id: 'news-05-ncaa-title9-registry',
    title: 'NCAA Division I Council Mandates Centralized Agent Registry & Title IX Equal Opportunity Disclosure',
    link: 'https://college.company/intelligence/market-wire#news-05-ncaa-title9-registry',
    category: 'Regulatory & Title IX',
    author: 'Sportico via College Company Intelligence Wire',
    pubDate: 'Mon, 12 Oct 2026 16:00:00 GMT',
    sourceName: 'Sportico',
    sourceUrl: 'https://www.sportico.com',
    description: 'New NCAA regulatory provisions require all commercial athlete agreements exceeding $600 to be archived with institutional compliance desks, with algorithmic parity auditing for women’s athletic programs.',
    contentEncoded: `Institutional compliance barriers favor consolidated platforms equipped with automated Title IX compliance monitoring and digital document audit trails.`
  },
  {
    id: 'news-06-private-equity-inflow',
    title: 'Private Equity Inflow into Collegiate Athletics Surpasses $1.2 Billion in Dedicated Special-Purpose Vehicles',
    link: 'https://college.company/intelligence/market-wire#news-06-private-equity-inflow',
    category: 'NIL & Collectives',
    author: 'Bloomberg & Wall Street Journal via College Company Intelligence Wire',
    pubDate: 'Sun, 11 Oct 2026 08:30:00 GMT',
    sourceName: 'Bloomberg & Wall Street Journal',
    sourceUrl: 'https://www.bloomberg.com',
    description: 'Institutional asset managers establish dedicated collegiate sports operating entities, targeting digital rights consolidation, facility naming, and turnkey commercial NIL infrastructure.',
    contentEncoded: `Positions College Company as an attractive sovereign operating partner with established proprietary intellectual property across 43 campus-facing digital sports, NIL clearinghouse, and infrastructure assets.`
  }
];

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Builds standard RSS 2.0 XML with Atom self-reference and Content Encoded extensions.
 */
export function generateRssXml(items: RssItem[] = RSS_ITEMS): string {
  const siteUrl = 'https://college.company';
  const feedUrl = `${siteUrl}/rss.xml`;
  const intelligenceUrl = `${siteUrl}/intelligence`;
  const buildDate = new Date().toUTCString();

  const itemsXml = items.map((item) => {
    const itemLink = item.link.startsWith('http') ? item.link : `${siteUrl}${item.link}`;
    const escapedTitle = escapeXml(item.title);
    const escapedCategory = escapeXml(item.category);
    const escapedAuthor = escapeXml(item.author);

    return `    <item>
      <title>${escapedTitle}</title>
      <link>${itemLink}</link>
      <guid isPermaLink="false">${escapeXml(item.id)}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <category>${escapedCategory}</category>
      <author>${escapedAuthor}</author>
      <description><![CDATA[${item.description}]]></description>
      ${item.contentEncoded ? `<content:encoded><![CDATA[${item.contentEncoded}]]></content:encoded>` : ''}
      ${item.sourceName && item.sourceUrl ? `<source url="${escapeXml(item.sourceUrl)}">${escapeXml(item.sourceName)}</source>` : ''}
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>College Company · Intelligence &amp; Market Wire</title>
    <link>${intelligenceUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>Executive research dispatches, regulatory antitrust rulings (House v. NCAA), collegiate media rights valuations, and NIL market updates across 400+ varsity athletic departments.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${items[0]?.pubDate || buildDate}</pubDate>
    <copyright>Copyright 2026 College Company Holding Group Inc. All rights reserved.</copyright>
    <managingEditor>kevin@collegeesportsx.com (Kevin Mitchell)</managingEditor>
    <webMaster>kevin@collegeesportsx.com (Kevin Mitchell)</webMaster>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <generator>College Company Fiduciary Intelligence Engine</generator>
    <image>
      <url>${siteUrl}/og-image.jpg</url>
      <title>College Company · Intelligence &amp; Market Wire</title>
      <link>${intelligenceUrl}</link>
      <width>1200</width>
      <height>630</height>
    </image>
${itemsXml}
  </channel>
</rss>`;
}
