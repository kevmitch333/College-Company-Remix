# CORRECTION DOCUMENT — college.company
## Instructions for the AI Studio site builder: fix the defects below and gear the site toward the new focus and vision. The governing goal of every change is the CUSTOMER EXPERIENCE: every stakeholder — student, parent, school, brand, and partner — must be able to understand what College Company is, find their door, and complete their task quickly, on any device, without hitting a wall. Sections 1A and 6A (stakeholder journeys and UI/UX standards) carry the same weight as the defect fixes. Work through the sections in order. Do not invent facts, statistics, partners, or testimonials anywhere.

---

## SECTION 1 — THE NEW FOCUS (read first; this governs every change)
College Company is being repositioned. The old story — a holding company consolidating varsity esports, broadcast rights, and athlete NIL for investors — is retired as the public face.

**New positioning:** College Company is **the alternative institution of learning, workforce development, and team building for the future**: specialized micro-courses designed for job acquisition and entrepreneurship, and alternative programs beyond varsity-level sports that serve the **general collegiate population** — every student, not only athletes.

**New public structure — four doors, in this order:**
1. **LEARN** — College Creator Academy (flagship), NIL Money 101 and the NIL courses, College Creator Lab, EsportsEducation.com
2. **COMPETE** — College Esports Expo (CEX), College Drone Racing League (CDRL), College Racing League, College GTA, AGONiQ — open to the general student body
3. **EARN** — NIL Brand Match / Placement Desk, College NIL Hub
4. **TRUST** — NIL Compliance Pro, PlayerNIL.org (education), compliance and tax literacy woven through everything

**Primary audience order on the public site:** (1) students and parents, (2) schools and institutions, (3) brands, (4) investors/partners — investors move to a clearly labeled secondary path ("For Institutions & Partners"), NOT the homepage hero and NOT a gate in front of public content.

**Tone:** plain, warm, credible, student-first. Remove investor-deck language from public pages: "sovereign infrastructure," "institutional clearance," "fiduciary orchestrator," "escrow-backed" (unless describing a specific real mechanism), "clearance tiers" as a public concept.

---

## SECTION 1A — CUSTOMER EXPERIENCE BY STAKEHOLDER (the journeys the rebuild must serve)
Design and test the site against these five journeys. If a journey cannot be completed in the stated steps, the design is not done.

1. **Student (primary).** Lands on the homepage → understands the offer in under 10 seconds ("learn a skill, join a team, earn from both") → reaches a program page in 1 click → reaches the program itself (academy, league, hub) in 1 more click. No account, application, or modal may block *reading* anything public. Reading level: plain language a first-year student follows; every program page answers What is it / Who is it for / What do I get / How do I start / What does it cost or "pricing announced at launch" — never leave cost ambiguous or hidden behind a gate.
2. **Parent / guardian.** Finds the NIL Money 101 and PlayerNIL.org pages from the homepage in 2 clicks → understands the safety and rules story (compliance, taxes, disclosure) without jargon → can subscribe to updates or reach the contact page without creating an account. Parents are a buying and trust audience: give them their own visible entry point ("For Parents") in the Learn section, not a footnote.
3. **School / institution.** Finds "For Institutions & Partners" in the header → one page that states plainly what a school can offer its general student body (micro-course cohorts, club competitions, team-building programs), what it costs the school to start (or "pilot terms on request"), and one contact action. No prospectus language, no accreditation questions.
4. **Brand / sponsor.** Finds the Earn door → understands the Placement Desk in one page: how campaigns work, the disclosed-fee model, the Student-First Charter (students pay zero commission), and one inquiry action. Trust is the product: the compliance story (Trust section) must be one click from every brand page.
5. **Investor / partner.** Reaches a clearly labeled secondary path ("For Institutions & Partners" → Investor Relations) with the Request Information form (Section 2 rules apply: no pre-checked boxes, no check sizes, no live-offering framing). Investors are served fully — but they never stand between the other four audiences and public content.

**Cross-cutting experience rules:** every page has exactly one primary call to action; every call to action goes somewhere real (a page, a working form, or a labeled "coming soon — join the list" state — never a dead modal); a visitor who hits any form gets a clear success state, an error state that says what to fix, and a confirmation by email where an email was given; contact information is identical everywhere (kevin@collegeesportsx.com).

---

## SECTION 2 — P0 DEFECTS (fix before anything else)
1. **www.college.company does not load.** Make www resolve and 301-redirect to the canonical bare domain (or serve identically). Verify both https://college.company and https://www.college.company load.
2. **Remove the prototype investor solicitation mechanics.** Delete the pre-checked "I confirm I am an accredited investor" checkbox (never pre-check any consent or accreditation box anywhere on the site), remove the "Anticipated Check Size" ranges, and retitle the prospectus form "Request Information." No public form may imply a live securities offering.
3. **Remove public Edit/Delete buttons** from Research Wire articles — those are CMS admin controls and must never render for visitors.
4. **Fix Research Wire rendering:** article bodies must render formatted Markdown as HTML (no raw ### or ** visible); remove the duplicated featured article from the list; make the on-site article list match the RSS feed (same items, same order) and make /intelligence and /intelligence/market-wire real pages with the article content — or remove those URLs from the RSS feed.
5. **Fix the header at tablet/mobile widths:** the "Member Sign In" control wraps and overlaps the logo and modal text around 800px and below. Rework the header so nothing overlaps at 320, 375, 390, 430, 768, and 1024px.
6. **Membership wall must close on Escape** and on backdrop click, every time, without a page reload.

## SECTION 3 — CLAIMS: REMOVE OR EVIDENCE (no exceptions)
Remove the following from all public pages unless a dated, linked source is displayed next to the claim: "400+ campuses / universities," "43 owned brands" (as operating businesses), "14,000+ varsity athletes," "zero campus capex," "100% pre-funded escrow," "100% on-time disbursements," "$41M college media rights," "$6.8B media rights." Where a number describes the domain portfolio, say exactly that (e.g., "a portfolio of college-focused properties and domains in development"). Add a visible line to the homepage footer area: **"Development preview — programs, data, and commercial terms are illustrative and subject to verification."** Do not remove that line.

## SECTION 4 — ONE NAMING SYSTEM
- Entity name everywhere: **College Company**. Remove "College Company Holding Group Inc." and "Operating Holding Group" from public headers/footers (legal footer may read "© 2026 College Company. All rights reserved.").
- One hero headline, used on every load: **"Learn a skill. Join a team. Earn from both."** Subhead: "College Company is the alternative institution for the general collegiate population — micro-courses for jobs and entrepreneurship, competitions beyond varsity, and compliant ways to earn while you learn."
- The four public section names are **Learn / Compete / Earn / Trust** — use them in the header nav, homepage, footer, and search index identically. Retire the three conflicting division-naming systems ("Varsity Leagues & Competitions," "Competitive Leagues & Circuits," "NIL & Creator Capital Division," etc.).
- Fix badges: College Esports Expo's badge is **CEX** (not "CEE"); College Esports NIL's badge is its real initials or none.

## SECTION 5 — REAL PUBLIC PAGES (end the one-page gate)
Create real, linkable pages (own URLs) for at least:
- **/learn/college-creator-academy** — what CCA is (creator-economy workforce curriculum: 5 tracks from content foundations to compliance and career), who it's for, course list by track, and a working outbound link to the academy site. This page is a priority: CCA is the flagship and is currently invisible.
- **/learn/nil-money-101** — the NIL tax & financial-planning micro-course for athletes and parents (what it covers: the $400 filing trigger, NIL Go's $600 reporting rule, forms season, quarterly estimates, scholarships, multi-state and international-athlete cautions; education, not tax advice).
- **/compete/college-drone-racing-league** and **/compete/college-esports-expo** — what they are, who can join (general students, clubs — not only varsity), status labeled honestly as "in development."
- **/earn/nil-brand-match** — the Placement Desk: brands pay a disclosed fee; learners pay zero commission. Student-First Charter stated plainly.
- **/about** — what College Company is, the Learn/Compete/Earn/Trust model, founded and led by Kevin Mitchell (music & entertainment executive and educator), Boston, Massachusetts.
- **/contact** — a real contact page. Use kevin@collegeesportsx.com consistently everywhere (remove any other address). No street address; "Boston, Massachusetts" is fine.
- **/privacy** and **/terms** — real pages, linked in the footer.
Every property page must state its status honestly: **Live / In development / Concept**. Do not label anything "Operating" that is not operating.

## SECTION 6 — HOMEPAGE REBUILD (top to bottom)
1. Hero: the Section 4 headline/subhead; primary CTA **"Explore Programs"** (scrolls to Learn), secondary CTA "For Institutions & Partners."
2. **Learn** section: CCA card (flagship), NIL Money 101 card, EsportsEducation.com card, Creator Lab card — each with one plain sentence and a link to its page.
3. **Compete** section: CEX, CDRL, CRL, College GTA, AGONiQ cards — lead with "open to every student, not just varsity."
4. **Earn** section: NIL Brand Match / Placement Desk and College NIL Hub; state the Student-First Charter (brands pay a disclosed fee; students pay zero commission).
5. **Trust** section: NIL Compliance Pro + PlayerNIL.org + one line: "The rules are part of the curriculum — NIL reporting, FTC disclosure, and taxes, taught in every program."
6. Research Wire preview (3 latest, correctly rendered, linking to real article pages).
7. Newsletter signup (keep — it works) with the development-preview line from Section 3 in the footer.
Remove from the homepage: the clearance-tier directory, the gated tools directory, the audience-filter panel that rewrites copy per stakeholder, and all "Unlock" buttons. Public content must be public; member tools, if kept, live behind an actual sign-in page, not a modal wall in front of public pages.

## SECTION 6A — UI/UX STANDARDS (apply across the whole site)
- **Mobile-first.** Most students arrive on a phone. Design at 390px first, then scale up. Test at 320, 375, 390, 430, 768, 1024px and desktop: no horizontal scrolling, no overlapping elements, no clipped buttons, tap targets at least 44px, body text at least 16px.
- **Navigation.** Persistent header with the four doors (Learn / Compete / Earn / Trust) + About + Contact + a single "For Institutions & Partners" link. A visitor must be able to reach any flagship page in at most 2 clicks from anywhere. Breadcrumbs or a clear "you are here" state on inner pages. The mobile menu must list the same items as desktop, in the same order, and close cleanly after selection.
- **Speed and stability.** Pages must feel instant on a mid-range phone: compress images, lazy-load below-the-fold media, avoid layout shift (fixed dimensions for images/cards), and keep the homepage free of heavy autoplaying media. If a page cannot load fast, simplify the page — do not add a loading spinner as a substitute.
- **Accessibility.** WCAG 2.1 AA as the floor: sufficient color contrast in both the gold/teal palette and any dark sections, visible focus states, full keyboard navigation (including modals, with focus trapped while open and returned on close), alt text on every meaningful image, labels on every form field, and no information conveyed by color alone.
- **Consistency.** One design system: one button style for primary actions, one for secondary; one card pattern for programs; one spacing and type scale. The same program must look like the same program in the homepage card, the search results, and its own page.
- **Search.** Results show the program name, its door (Learn/Compete/Earn/Trust), one plain sentence, and its status (Live / In development / Concept) — and link to the real page. No result may open a modal.
- **Trust by design.** Honest status labels, the development-preview line, dated sources beside any statistic, a named human (Kevin Mitchell, founder) on the About page, and working Privacy/Terms pages. Trust elements are UI requirements, not copy extras.
- **Feedback loops.** Add a lightweight "Was this page helpful?" or a single feedback link in the footer routed to the contact email, so stakeholder experience problems surface after launch.

## SECTION 7 — SEARCH, FOOTER, DETAILS
- Search index: keep the property entries, but each result must link to its real page (Section 5) — never to a membership modal. Remove near-duplicate placeholder entries that are name variants with no page.
- Footer: Learn / Compete / Earn / Trust links (real pages), About, Contact, Privacy, Terms, Research Wire, RSS. Social links: add when Kevin supplies them; do not fabricate icons/links.
- Forms: POST submissions, programmatic labels, autocomplete attributes, clear success and error states; no pre-checked boxes anywhere.
- Accessibility/meta: add a real meta description ("College Company — the alternative institution: micro-courses, beyond-varsity competitions, and compliant earning for the general collegiate population."), a favicon, and alt text on images.

## SECTION 8 — DO NOT DO
- Do not add statistics, school names, partner logos, testimonials, or revenue figures that are not in this document.
- Do not describe programs as operating, sanctioned, or partnered unless this document says so.
- Do not restore the membership wall in front of public content, the accredited-investor form, or the clearance tiers.
- Do not rename the four sections or the entity.
- When a fact is not in this document, leave a clearly marked placeholder for Kevin rather than inventing copy.

**Acceptance check before you call it done:** www loads; Escape closes every modal; no raw Markdown or Edit/Delete buttons are visible to visitors; no pre-checked boxes exist; every homepage card reaches a real page; CCA has a public page with a working outbound link; the claims in Section 3 are gone or sourced; the development-preview line is in the footer; **all five stakeholder journeys in Section 1A complete in their stated steps on a phone at 390px**; no horizontal scroll or overlap at any Section 6A test width; every form shows working success and error states; keyboard-only navigation reaches every page and closes every modal.
