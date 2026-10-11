import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export type GrowthScenario = 'Conservative' | 'Expected' | 'Aggressive';

export interface FinancialModelInputs {
  campusCount: number;
  avgNilDeal: number;
  mediaRightsTier: number;
  growthScenario?: GrowthScenario;
}

export interface CalculatedFinancials {
  totalAthletes: number;
  monetizedAthletes: number;
  nilVolume: number;
  platformNilRevenue: number;
  campusLicensing: number;
  mediaSponsorship: number;
  annualRunRate: number;
  grossMarginPct: number;
  grossProfit: number;
  revenuePerCampus: number;
}

export interface ProFormaYear {
  yearLabel: string;
  calendarYear: number;
  campuses: number;
  athletes: number;
  nilVolume: number;
  platformNilRevenue: number;
  campusLicensing: number;
  mediaSponsorship: number;
  totalRevenue: number;
  growthRatePct: number;
}

export const SCENARIO_CONFIG = {
  Conservative: {
    label: 'Conservative',
    tagline: 'Measured conference adoption, base NIL deal clearing, and strict compliance risk limits',
    multipliers: [1.0, 1.20, 1.45, 1.75, 2.10],
    monetizationRate: 0.32,
    sponsorPerCampus: 14500,
    grossMarginPct: 64.2,
    badgeColor: 'text-amber-400 bg-amber-950/40 border-amber-500/30'
  },
  Expected: {
    label: 'Expected',
    tagline: 'Base case aligned with verified Power-4 / Group of 5 expansion and FAST channel distribution',
    multipliers: [1.0, 1.38, 1.85, 2.38, 3.00],
    monetizationRate: 0.40,
    sponsorPerCampus: 18500,
    grossMarginPct: 68.4,
    badgeColor: 'text-[#E8C98B] bg-[#C89B3C]/15 border-[#C89B3C]/40'
  },
  Aggressive: {
    label: 'Aggressive',
    tagline: 'Accelerated saturation, high school feeder pipeline lockup, and premium tier-1 broadcast syndication',
    multipliers: [1.0, 1.58, 2.35, 3.25, 4.20],
    monetizationRate: 0.52,
    sponsorPerCampus: 24500,
    grossMarginPct: 72.8,
    badgeColor: 'text-[#68D391] bg-emerald-950/40 border-emerald-500/30'
  }
};

/**
 * Calculates current run-rate and derived metrics from active slider inputs and growth scenario
 */
export function calculateFinancialMetrics(inputs: FinancialModelInputs): CalculatedFinancials {
  const scenario = inputs.growthScenario || 'Expected';
  const config = SCENARIO_CONFIG[scenario];
  const { campusCount, avgNilDeal, mediaRightsTier } = inputs;

  const totalAthletes = campusCount * 45;
  const monetizedAthletes = Math.round(totalAthletes * config.monetizationRate);
  const nilVolume = totalAthletes * (avgNilDeal * config.monetizationRate);
  const platformNilRevenue = nilVolume * 0.15;
  const campusLicensing = campusCount * mediaRightsTier;
  const mediaSponsorship = campusCount * config.sponsorPerCampus;
  const annualRunRate = platformNilRevenue + campusLicensing + mediaSponsorship;
  const grossMarginPct = config.grossMarginPct;
  const grossProfit = annualRunRate * (grossMarginPct / 100);
  const revenuePerCampus = campusCount > 0 ? annualRunRate / campusCount : 0;

  return {
    totalAthletes,
    monetizedAthletes,
    nilVolume,
    platformNilRevenue,
    campusLicensing,
    mediaSponsorship,
    annualRunRate,
    grossMarginPct,
    grossProfit,
    revenuePerCampus
  };
}

/**
 * Generates 5-year expansion trajectory based on current active inputs and scenario
 */
export function generateFiveYearProjections(inputs: FinancialModelInputs): ProFormaYear[] {
  const scenario = inputs.growthScenario || 'Expected';
  const config = SCENARIO_CONFIG[scenario];
  const { campusCount, avgNilDeal, mediaRightsTier } = inputs;
  const multipliers = config.multipliers;
  const baseYear = 2026;
  let previousTotal = 0;

  return multipliers.map((mult, idx) => {
    const projectedCampuses = Math.min(450, Math.round(campusCount * mult));
    const athletes = projectedCampuses * 45;
    const nilVol = athletes * (avgNilDeal * config.monetizationRate);
    const platformNil = nilVol * 0.15;
    const campusLicensing = projectedCampuses * mediaRightsTier;
    const mediaSponsorship = projectedCampuses * config.sponsorPerCampus;
    const totalRev = platformNil + campusLicensing + mediaSponsorship;

    let growth = 0;
    if (idx > 0 && previousTotal > 0) {
      growth = ((totalRev - previousTotal) / previousTotal) * 100;
    }
    previousTotal = totalRev;

    return {
      yearLabel: `Year ${idx + 1}`,
      calendarYear: baseYear + idx,
      campuses: projectedCampuses,
      athletes,
      nilVolume: nilVol,
      platformNilRevenue: platformNil,
      campusLicensing,
      mediaSponsorship,
      totalRevenue: totalRev,
      growthRatePct: growth
    };
  });
}

/**
 * Generates and downloads an Excel-compatible CSV Report
 */
export function downloadFinancialCSV(inputs: FinancialModelInputs): void {
  const metrics = calculateFinancialMetrics(inputs);
  const projections = generateFiveYearProjections(inputs);
  const timestamp = new Date().toISOString().split('T')[0];

  const lines: string[] = [];

  // Metadata Header
  lines.push('=============================================================================');
  lines.push('COLLEGE COMPANY HOLDING GROUP INC. - FINANCIAL MODEL & TAM SIMULATION REPORT');
  lines.push('=============================================================================');
  lines.push(`Report Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
  lines.push(`Projection Variance Scenario: ${(inputs.growthScenario || 'Expected').toUpperCase()} (${SCENARIO_CONFIG[inputs.growthScenario || 'Expected'].tagline})`);
  lines.push('Corporate Office: Boston, Massachusetts - Cambridge Innovation Hub');
  lines.push('Classification: Confidential - Accredited Investor & Athletic Directorate Brief');
  lines.push('');

  // Active Inputs
  lines.push('--- SECTION 1: ACTIVE OPERATIONAL SLIDER INPUTS ---');
  lines.push('Parameter,Value,Unit / Context');
  lines.push(`Projection Variance Scenario,${inputs.growthScenario || 'Expected'},${SCENARIO_CONFIG[inputs.growthScenario || 'Expected'].tagline}`);
  lines.push(`Active University Campuses,${inputs.campusCount},Member higher education institutions`);
  lines.push(`Annual NIL Deal Volume per Athlete,$${inputs.avgNilDeal.toLocaleString()},Annualized average gross contract value`);
  lines.push(`Campus Broadcast & Media Rights Tier,$${inputs.mediaRightsTier.toLocaleString()},Annual university membership & stream package`);
  lines.push('Average Roster Depth per Campus,45,Student-athletes across varsity & academy rosters');
  lines.push(`Active NIL Monetization Rate,${(SCENARIO_CONFIG[inputs.growthScenario || 'Expected'].monetizationRate * 100).toFixed(1)}%,Percentage of roster commanding active sponsorships`);
  lines.push('Platform NIL Take-Rate Commission,15.0%,Smart-contract escrow clearing fee');
  lines.push(`Projected Gross Margin,${metrics.grossMarginPct}%,Scenario gross margin threshold`);
  lines.push('');

  // Current Output Summary
  lines.push('--- SECTION 2: CURRENT ANNUALIZED RUN-RATE SUMMARY ---');
  lines.push('Revenue Engine,Annual Gross ($),Formatted ($M),Share of Total Run-Rate');
  lines.push(`Campus League & Broadcast Rights,$${Math.round(metrics.campusLicensing).toLocaleString()},$${(metrics.campusLicensing / 1000000).toFixed(2)}M,${((metrics.campusLicensing / metrics.annualRunRate) * 100).toFixed(1)}%`);
  lines.push(`Student-Athlete NIL Platform Take-Rate (15%),$${Math.round(metrics.platformNilRevenue).toLocaleString()},$${(metrics.platformNilRevenue / 1000000).toFixed(2)}M,${((metrics.platformNilRevenue / metrics.annualRunRate) * 100).toFixed(1)}%`);
  lines.push(`National Aggregate Sponsor Pool,$${Math.round(metrics.mediaSponsorship).toLocaleString()},$${(metrics.mediaSponsorship / 1000000).toFixed(2)}M,${((metrics.mediaSponsorship / metrics.annualRunRate) * 100).toFixed(1)}%`);
  lines.push(`TOTAL ANNUAL ECOSYSTEM RUN-RATE,$${Math.round(metrics.annualRunRate).toLocaleString()},$${(metrics.annualRunRate / 1000000).toFixed(2)}M,100.0%`);
  lines.push(`Projected Gross Profit (68.4% Margin),$${Math.round(metrics.grossProfit).toLocaleString()},$${(metrics.grossProfit / 1000000).toFixed(2)}M,-`);
  lines.push('');

  // Operational Scale Metrics
  lines.push('--- SECTION 3: EXPANSION & REACH METRICS ---');
  lines.push('Operational Metric,Value,Description');
  lines.push(`Total Active Student Competitors,${metrics.totalAthletes.toLocaleString()},Varsity and club athletes across network`);
  lines.push(`Active NIL Monetized Athletes,${metrics.monetizedAthletes.toLocaleString()},Student-athletes with active brand campaigns`);
  lines.push(`Total Processed NIL Liquidity,$${Math.round(metrics.nilVolume).toLocaleString()},Gross sponsorship volume cleared in escrow`);
  lines.push(`Average Annual Revenue per Campus,$${Math.round(metrics.revenuePerCampus).toLocaleString()},Ecosystem monetization yield per institution`);
  lines.push('');

  // 5-Year Pro-Forma Projections Table
  lines.push('--- SECTION 4: 5-YEAR PRO-FORMA EXPANSION TRAJECTORY (2026-2030) ---');
  lines.push('Period,Calendar Year,Active Campuses,Student Athletes,Gross NIL Volume ($M),Platform NIL Rev ($M),Campus Rights ($M),Media Sponsorship ($M),Total Ecosystem Revenue ($M),YoY Growth');

  projections.forEach((p) => {
    lines.push(
      `${p.yearLabel},${p.calendarYear},${p.campuses},${p.athletes},` +
      `$${(p.nilVolume / 1000000).toFixed(2)}M,$${(p.platformNilRevenue / 1000000).toFixed(2)}M,` +
      `$${(p.campusLicensing / 1000000).toFixed(2)}M,$${(p.mediaSponsorship / 1000000).toFixed(2)}M,` +
      `$${(p.totalRevenue / 1000000).toFixed(2)}M,` +
      `${p.growthRatePct > 0 ? '+' + p.growthRatePct.toFixed(1) + '%' : 'Base Year'}`
    );
  });

  lines.push('');
  lines.push('--- SECTION 5: REGULATORY & LEGAL DISCLAIMER ---');
  lines.push('This model reflects pro-forma forward-looking statements based on active collegiate network parameters.');
  lines.push('All student-athlete compensation complies with NCAA Dual-Eligibility Bylaws and State NIL Escrow Statutes.');

  const csvContent = lines.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `College_Company_Financial_Report_${inputs.campusCount}Campuses_${timestamp}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads a Professional PDF Document using jsPDF and autoTable
 */
export function downloadFinancialPDF(inputs: FinancialModelInputs): void {
  const metrics = calculateFinancialMetrics(inputs);
  const projections = generateFiveYearProjections(inputs);
  const timestamp = new Date().toISOString().split('T')[0];

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36; // 0.5 in

  // Background Header Banner
  doc.setFillColor(15, 18, 25);
  doc.rect(0, 0, pageWidth, 90, 'F');

  // Gold Sovereign Accent Strip
  doc.setFillColor(200, 155, 60);
  doc.rect(0, 88, pageWidth, 3, 'F');

  // Title & Monogram
  doc.setTextColor(232, 201, 139);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('COLLEGE COMPANY HOLDING GROUP INC.', margin, 38);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('EXECUTIVE FINANCIAL MODEL & PRO-FORMA TAM REPORT', margin, 54);

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  const scenarioName = inputs.growthScenario || 'Expected';
  doc.text(`Generated: ${new Date().toLocaleDateString()} | Scenario: ${scenarioName.toUpperCase()} | Fiduciary Model v2.4`, margin, 70);

  // Status Badge (Right Aligned)
  doc.setFillColor(25, 30, 42);
  doc.roundedRect(pageWidth - margin - 150, 25, 150, 44, 3, 3, 'F');
  doc.setTextColor(200, 155, 60);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(`${scenarioName.toUpperCase()} VARIANCE`, pageWidth - margin - 140, 39);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text(`$${(metrics.annualRunRate / 1000000).toFixed(2)}M RUN-RATE`, pageWidth - margin - 140, 53);
  doc.setFontSize(7);
  doc.setTextColor(104, 211, 145);
  doc.text(`${metrics.grossMarginPct}% Margin Target`, pageWidth - margin - 140, 63);

  let currentY = 110;

  // Section 1: Executive KPI Highlight Cards
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 35, 45);
  doc.text(`1. ACTIVE MODEL HIGHLIGHTS (${scenarioName.toUpperCase()} SCENARIO)`, margin, currentY);
  currentY += 12;

  const cardWidth = (pageWidth - margin * 2 - 24) / 3;
  const cardHeight = 52;

  // Card 1: Campuses
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(margin, currentY, cardWidth, cardHeight, 4, 4, 'F');
  doc.setFontSize(8);
  doc.setTextColor(110, 115, 125);
  doc.setFont('helvetica', 'bold');
  doc.text('ACTIVE CAMPUSES', margin + 10, currentY + 16);
  doc.setFontSize(16);
  doc.setTextColor(20, 25, 35);
  doc.text(`${inputs.campusCount}`, margin + 10, currentY + 36);
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.setFont('helvetica', 'normal');
  doc.text('Universities onboarded', margin + 45, currentY + 36);

  // Card 2: NIL Volume
  const card2X = margin + cardWidth + 12;
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(card2X, currentY, cardWidth, cardHeight, 4, 4, 'F');
  doc.setFontSize(8);
  doc.setTextColor(110, 115, 125);
  doc.setFont('helvetica', 'bold');
  doc.text('ANNUAL NIL VOLUME', card2X + 10, currentY + 16);
  doc.setFontSize(16);
  doc.setTextColor(20, 25, 35);
  doc.text(`$${(metrics.nilVolume / 1000000).toFixed(2)}M`, card2X + 10, currentY + 36);
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.setFont('helvetica', 'normal');
  doc.text(`Avg $${inputs.avgNilDeal.toLocaleString()}/ath`, card2X + 10, currentY + 46);

  // Card 3: Total Athletes
  const card3X = card2X + cardWidth + 12;
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(card3X, currentY, cardWidth, cardHeight, 4, 4, 'F');
  doc.setFontSize(8);
  doc.setTextColor(110, 115, 125);
  doc.setFont('helvetica', 'bold');
  doc.text('STUDENT COMPETITORS', card3X + 10, currentY + 16);
  doc.setFontSize(16);
  doc.setTextColor(20, 25, 35);
  doc.text(`${metrics.totalAthletes.toLocaleString()}`, card3X + 10, currentY + 36);
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.setFont('helvetica', 'normal');
  doc.text('45 athletes / campus roster', card3X + 10, currentY + 46);

  currentY += cardHeight + 20;

  // Section 2: Current Revenue Breakdown Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 35, 45);
  doc.text('2. ANNUALIZED REVENUE COMPOSITION', margin, currentY);
  currentY += 8;

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [['Ecosystem Revenue Engine', 'Description', 'Annual Gross ($)', '% Share']],
    body: [
      [
        'Campus League & Media Rights',
        `Annual dues across ${inputs.campusCount} campuses @ $${inputs.mediaRightsTier.toLocaleString()}/yr tier`,
        `$${Math.round(metrics.campusLicensing).toLocaleString()}`,
        `${((metrics.campusLicensing / metrics.annualRunRate) * 100).toFixed(1)}%`
      ],
      [
        'Student-Athlete NIL Platform Fee',
        `15% platform take-rate on $${(metrics.nilVolume / 1000000).toFixed(2)}M processed liquidity`,
        `$${Math.round(metrics.platformNilRevenue).toLocaleString()}`,
        `${((metrics.platformNilRevenue / metrics.annualRunRate) * 100).toFixed(1)}%`
      ],
      [
        'National Aggregate Sponsor Pool',
        'Consolidated tournament & digital broadcasts ($18,500 base per campus)',
        `$${Math.round(metrics.mediaSponsorship).toLocaleString()}`,
        `${((metrics.mediaSponsorship / metrics.annualRunRate) * 100).toFixed(1)}%`
      ],
      [
        'TOTAL ANNUAL ECOSYSTEM RUN-RATE',
        'Consolidated enterprise revenue across all four holding divisions',
        `$${Math.round(metrics.annualRunRate).toLocaleString()} ($${(metrics.annualRunRate / 1000000).toFixed(2)}M)`,
        '100.0%'
      ]
    ],
    theme: 'grid',
    headStyles: {
      fillColor: [18, 22, 32],
      textColor: [232, 201, 139],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    styles: {
      fontSize: 8,
      cellPadding: 4.5,
      textColor: [35, 40, 50]
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 150 },
      2: { halign: 'right', fontStyle: 'bold' },
      3: { halign: 'right' }
    }
  });

  // @ts-ignore
  currentY = doc.lastAutoTable.finalY + 22;

  // Section 3: 5-Year Expansion Pro-Forma Forecast
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 35, 45);
  doc.text('3. FIVE-YEAR PRO-FORMA EXPANSION TRAJECTORY (2026 - 2030)', margin, currentY);
  currentY += 8;

  const tableBody = projections.map((p) => [
    `${p.yearLabel} (${p.calendarYear})`,
    `${p.campuses}`,
    `${p.athletes.toLocaleString()}`,
    `$${(p.nilVolume / 1000000).toFixed(2)}M`,
    `$${(p.platformNilRevenue / 1000000).toFixed(2)}M`,
    `$${(p.campusLicensing / 1000000).toFixed(2)}M`,
    `$${(p.mediaSponsorship / 1000000).toFixed(2)}M`,
    `$${(p.totalRevenue / 1000000).toFixed(2)}M`,
    p.growthRatePct > 0 ? `+${p.growthRatePct.toFixed(1)}%` : 'Base'
  ]);

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [[
      'Period',
      'Campuses',
      'Athletes',
      'NIL Vol ($M)',
      'NIL Fee ($M)',
      'Campus ($M)',
      'Sponsor ($M)',
      'Total ($M)',
      'YoY'
    ]],
    body: tableBody,
    theme: 'striped',
    headStyles: {
      fillColor: [18, 22, 32],
      textColor: [232, 201, 139],
      fontStyle: 'bold',
      fontSize: 8
    },
    styles: {
      fontSize: 7.5,
      cellPadding: 4,
      textColor: [35, 40, 50]
    },
    columnStyles: {
      0: { fontStyle: 'bold' },
      7: { fontStyle: 'bold', textColor: [180, 135, 45] },
      8: { fontStyle: 'bold', halign: 'right' }
    }
  });

  // @ts-ignore
  currentY = doc.lastAutoTable.finalY + 18;

  // Section 4: Unit Economics Summary Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(220, 225, 235);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 54, 4, 4, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 35, 45);
  doc.text('UNIT ECONOMICS & MARGIN ARCHITECTURE:', margin + 12, currentY + 16);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 85, 95);
  doc.text(`- Average Annual Revenue per Campus: $${Math.round(metrics.revenuePerCampus).toLocaleString()}`, margin + 12, currentY + 30);
  doc.text(`- Gross Margin: ${metrics.grossMarginPct}% | Gross Profit: $${(metrics.grossProfit / 1000000).toFixed(2)}M`, margin + 12, currentY + 42);
  doc.text(`- Student Competitors per Campus: 45 Athletes (40% active monetization rate)`, margin + 260, currentY + 30);
  doc.text(`- Dual-Eligibility Protection: Full compliance under NCAA Bylaw 14.2`, margin + 260, currentY + 42);

  // Footer Disclaimer
  doc.setFontSize(7);
  doc.setTextColor(140, 145, 155);
  doc.text(
    'CONFIDENTIAL: Prepared for authorized collegiate partners and accredited investors. College Company Holding Group Inc. Boston MA.',
    margin,
    pageHeight - 20
  );
  doc.text(`Page 1 of 1`, pageWidth - margin - 40, pageHeight - 20);

  // Download PDF
  doc.save(`College_Company_Financial_Report_${inputs.campusCount}Campuses_${timestamp}.pdf`);
}
