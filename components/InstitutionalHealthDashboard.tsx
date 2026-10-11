import React, { useState, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  ShieldCheck, 
  TrendingUp, 
  Percent, 
  BarChart3, 
  ArrowUpRight, 
  ArrowUp,
  ArrowDown,
  Activity, 
  Zap,
  Info,
  Calendar,
  Clock
} from 'lucide-react';

interface InstitutionalHealthProps {
  campusCount: number;
  annualRunRate: number;
}

export type HealthDateRange = '1-year' | '3-year' | '5-year';

interface SparklineDataPoint {
  period: string;
  value: number;
}

// Reusable SVG Sparkline with smooth curve, gradient fill, and end-point indicator
const MiniSparkline: React.FC<{
  data: SparklineDataPoint[];
  color?: string;
  gradientId: string;
  unitPrefix?: string;
  unitSuffix?: string;
}> = ({ 
  data, 
  color = '#C89B3C', 
  gradientId,
  unitPrefix = '',
  unitSuffix = ''
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<SparklineDataPoint | null>(null);

  const width = 140;
  const height = 44;
  const padding = 6;

  const { pathD, areaD, points, lastPoint } = useMemo(() => {
    if (!data || data.length === 0) return { pathD: '', areaD: '', points: [], lastPoint: null };

    const values = data.map((d) => d.value);
    const minVal = values.length > 0 ? Math.min(...values) : 0;
    const maxVal = values.length > 0 ? Math.max(...values) : 1;
    const valSpan = maxVal - minVal || 1;

    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
      .domain([minVal - valSpan * 0.15, maxVal + valSpan * 0.15])
      .range([height - padding, padding]);

    const lineGenerator = d3.line<SparklineDataPoint>()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const areaGenerator = d3.area<SparklineDataPoint>()
      .x((_, i) => xScale(i))
      .y0(height)
      .y1((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const mappedPoints = data.map((d, i) => ({
      x: xScale(i),
      y: yScale(d.value),
      data: d
    }));

    return {
      pathD: lineGenerator(data) || '',
      areaD: areaGenerator(data) || '',
      points: mappedPoints,
      lastPoint: mappedPoints[mappedPoints.length - 1]
    };
  }, [data, width, height]);

  return (
    <div className="relative flex items-center">
      <svg 
        width={width} 
        height={height} 
        className="overflow-visible cursor-crosshair"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Gradient fill underneath */}
        <path d={areaD} fill={`url(#${gradientId})`} />

        {/* Stroke line */}
        <path 
          d={pathD} 
          fill="none" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Active / End indicator dot */}
        {lastPoint && (
          <circle 
            cx={lastPoint.x} 
            cy={lastPoint.y} 
            r="3.5" 
            fill={color} 
            stroke="#090A0C" 
            strokeWidth="1.5" 
          />
        )}

        {/* Interactive hover points */}
        {points.map((pt, i) => (
          <g key={i}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r="7"
              fill="transparent"
              onMouseEnter={() => setHoveredPoint(pt.data)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
            {hoveredPoint === pt.data && (
              <circle
                cx={pt.x}
                cy={pt.y}
                r="3.5"
                fill="#FFFFFF"
                stroke={color}
                strokeWidth="2"
              />
            )}
          </g>
        ))}
      </svg>

      {/* Floating Sparkline Tooltip */}
      {hoveredPoint && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#090A0C] border border-white/20 px-2 py-0.5 rounded text-[10px] font-mono text-white whitespace-nowrap shadow-xl z-20 pointer-events-none">
          {hoveredPoint.period}: <span className="font-bold text-[#E8C98B]">{unitPrefix}{hoveredPoint.value}{unitSuffix}</span>
        </div>
      )}
    </div>
  );
};

export const InstitutionalHealthDashboard: React.FC<InstitutionalHealthProps> = ({
  campusCount,
  annualRunRate
}) => {
  // Date-range filter state: '1-year' | '3-year' | '5-year'
  const [dateRange, setDateRange] = useState<HealthDateRange>('1-year');

  const totalTargetCampuses = 450;
  const currentPenetration = (campusCount / totalTargetCampuses) * 100;

  // Base brand valuation multiple
  const baseMultiple = useMemo(() => {
    const base = 5.6;
    const premium = (campusCount / 450) * 2.8;
    return parseFloat((base + premium).toFixed(1));
  }, [campusCount]);

  // =========================================================================
  // 1. DYNAMIC PROJECTIONS BASED ON DATE RANGE
  // =========================================================================

  // --- KPI 1: Market Penetration Projection ---
  const penetrationConfig = useMemo(() => {
    if (dateRange === '1-year') {
      // 6 quarterly points over 1 year (trailing 4 quarters up to current)
      const ratios = [0.35, 0.48, 0.62, 0.76, 0.88, 1.0];
      const sparkline: SparklineDataPoint[] = ratios.map((r, i) => {
        const labels = ["Q1 '25", "Q2 '25", "Q3 '25", "Q4 '25", "Q1 '26", "Current"];
        return {
          period: labels[i],
          value: parseFloat((currentPenetration * r).toFixed(1))
        };
      });

      return {
        displayValue: `${currentPenetration.toFixed(1)}%`,
        subText: `(${campusCount}/${totalTargetCampuses} Campuses)`,
        velocityLabel: "1-Yr Trailing Velocity",
        velocityValue: `+${(currentPenetration * 0.42).toFixed(1)}% YoY`,
        description: "Active footprint across Tier-1 NCAA, NAIA, and varsity athletic departments nationwide.",
        sparkline
      };
    } else if (dateRange === '3-year') {
      // 3-year projection: 2025 (Hist), 2026 (Now), 2027 (Proj), 2028 (Target)
      const yr1 = currentPenetration * 0.65;
      const yr2 = currentPenetration;
      const yr3 = Math.min(100, currentPenetration * 1.45);
      const yr4 = Math.min(100, currentPenetration * 1.90);
      const projectedCampuses3Yr = Math.min(450, Math.round(campusCount * 1.90));

      const sparkline: SparklineDataPoint[] = [
        { period: "2025 (Hist)", value: parseFloat(yr1.toFixed(1)) },
        { period: "2026 (Now)", value: parseFloat(yr2.toFixed(1)) },
        { period: "2027 (P1)", value: parseFloat(yr3.toFixed(1)) },
        { period: "2028 (P2)", value: parseFloat(yr4.toFixed(1)) }
      ];

      return {
        displayValue: `${yr4.toFixed(1)}%`,
        subText: `(${projectedCampuses3Yr}/${totalTargetCampuses} Target)`,
        velocityLabel: "3-Yr Expansion Delta",
        velocityValue: `+${(yr4 - yr1).toFixed(1)}% Pts`,
        description: "Projected penetration across intercollegiate conference-wide syndication pacts.",
        sparkline
      };
    } else {
      // 5-year projection: 2026 through 2030 terminal adoption
      const y1 = currentPenetration;
      const y2 = Math.min(100, currentPenetration * 1.40);
      const y3 = Math.min(100, currentPenetration * 1.85);
      const y4 = Math.min(100, currentPenetration * 2.35);
      const y5 = Math.min(100, currentPenetration * 2.85);
      const terminalCampuses = Math.min(450, Math.round(campusCount * 2.85));

      const sparkline: SparklineDataPoint[] = [
        { period: "2026 (Base)", value: parseFloat(y1.toFixed(1)) },
        { period: "2027", value: parseFloat(y2.toFixed(1)) },
        { period: "2028", value: parseFloat(y3.toFixed(1)) },
        { period: "2029", value: parseFloat(y4.toFixed(1)) },
        { period: "2030 (Terminal)", value: parseFloat(y5.toFixed(1)) }
      ];

      return {
        displayValue: `${y5.toFixed(1)}%`,
        subText: `(${terminalCampuses}/${totalTargetCampuses} Terminal)`,
        velocityLabel: "5-Yr Terminal Saturation",
        velocityValue: `${y5 >= 90 ? 'National Saturation' : `+${(y5 - y1).toFixed(1)}% Lift`}`,
        description: "Terminal national saturation benchmark across North American collegiate athletics.",
        sparkline
      };
    }
  }, [dateRange, currentPenetration, campusCount, totalTargetCampuses]);

  // --- KPI 2: Net Asset Growth YOY Projection ---
  const assetGrowthConfig = useMemo(() => {
    if (dateRange === '1-year') {
      const sparkline: SparklineDataPoint[] = [
        { period: "Q1 '25", value: 18.2 },
        { period: "Q2 '25", value: 24.5 },
        { period: "Q3 '25", value: 29.8 },
        { period: "Q4 '25", value: 34.0 },
        { period: "Q1 '26", value: 38.2 },
        { period: "Q2 '26", value: 42.6 }
      ];

      return {
        displayValue: "+42.6%",
        subText: "vs Sector 22.7%",
        velocityLabel: "Historical CAGR",
        velocityValue: "Trailing 12-Mo.",
        description: "Capital compounding driven by proprietary domain equity, NIL take-rate liquidity, and licensing contracts.",
        sparkline
      };
    } else if (dateRange === '3-year') {
      const sparkline: SparklineDataPoint[] = [
        { period: "2024", value: 19.5 },
        { period: "2025", value: 34.0 },
        { period: "2026 (Now)", value: 42.6 },
        { period: "2027 (Proj)", value: 58.4 },
        { period: "2028 (Proj)", value: 76.2 }
      ];

      return {
        displayValue: "+76.2%",
        subText: "3-Yr Cumulative Base",
        velocityLabel: "3-Yr Compound CAGR",
        velocityValue: "+31.8% Annualized",
        description: "Consolidated IP valuation compounding across 28 controlled brands and tournament circuits.",
        sparkline
      };
    } else {
      const sparkline: SparklineDataPoint[] = [
        { period: "2026 (Base)", value: 42.6 },
        { period: "2027", value: 68.0 },
        { period: "2028", value: 104.5 },
        { period: "2029", value: 148.0 },
        { period: "2030 (Terminal)", value: 210.5 }
      ];

      return {
        displayValue: "+210.5%",
        subText: "5-Yr Capital Expansion",
        velocityLabel: "5-Yr Terminal Asset Lift",
        velocityValue: "5.4x Enterprise Base",
        description: "Long-term institutional balance sheet appreciation through permanent domain monopolies and media rights.",
        sparkline
      };
    }
  }, [dateRange]);

  // --- KPI 3: Brand Valuation Multiple Projection ---
  const valuationMultipleConfig = useMemo(() => {
    if (dateRange === '1-year') {
      const impliedEnterpriseVal = (annualRunRate * baseMultiple) / 1000000;
      const sparkline: SparklineDataPoint[] = [
        { period: "Q1 '25", value: 4.8 },
        { period: "Q2 '25", value: 5.2 },
        { period: "Q3 '25", value: 5.8 },
        { period: "Q4 '25", value: 6.2 },
        { period: "Current", value: baseMultiple }
      ];

      return {
        displayValue: `${baseMultiple}x`,
        subText: `($${impliedEnterpriseVal.toFixed(1)}M Implied EV)`,
        velocityLabel: "Multiple Expansion",
        velocityValue: `+${(baseMultiple - 4.8).toFixed(1)}x Lift`,
        description: "Consolidated holding enterprise valuation benchmarked against sports media and NIL comps.",
        sparkline
      };
    } else if (dateRange === '3-year') {
      const projectedMultiple3Yr = parseFloat((baseMultiple * 1.30).toFixed(1));
      const projectedRunRate3Yr = annualRunRate * 1.95;
      const impliedEnterpriseVal3Yr = (projectedRunRate3Yr * projectedMultiple3Yr) / 1000000;

      const sparkline: SparklineDataPoint[] = [
        { period: "2025", value: 5.2 },
        { period: "2026 (Now)", value: baseMultiple },
        { period: "2027", value: parseFloat((baseMultiple * 1.15).toFixed(1)) },
        { period: "2028", value: projectedMultiple3Yr }
      ];

      return {
        displayValue: `${projectedMultiple3Yr}x`,
        subText: `($${impliedEnterpriseVal3Yr.toFixed(1)}M Pro-Forma EV)`,
        velocityLabel: "3-Yr Target Multiple",
        velocityValue: `+${(projectedMultiple3Yr - baseMultiple).toFixed(1)}x Expansion`,
        description: "Enterprise multiple maturation as high-margin SaaS dues and media rights revenue dominate gross receipts.",
        sparkline
      };
    } else {
      const terminalMultiple5Yr = parseFloat((baseMultiple * 1.55).toFixed(1));
      const projectedRunRate5Yr = annualRunRate * 3.10;
      const impliedEnterpriseVal5Yr = (projectedRunRate5Yr * terminalMultiple5Yr) / 1000000;

      const sparkline: SparklineDataPoint[] = [
        { period: "2026 (Base)", value: baseMultiple },
        { period: "2027", value: parseFloat((baseMultiple * 1.12).toFixed(1)) },
        { period: "2028", value: parseFloat((baseMultiple * 1.25).toFixed(1)) },
        { period: "2029", value: parseFloat((baseMultiple * 1.40).toFixed(1)) },
        { period: "2030 (Terminal)", value: terminalMultiple5Yr }
      ];

      return {
        displayValue: `${terminalMultiple5Yr}x`,
        subText: `($${impliedEnterpriseVal5Yr.toFixed(1)}M Terminal EV)`,
        velocityLabel: "Terminal Exit Multiple",
        velocityValue: `+${(terminalMultiple5Yr - baseMultiple).toFixed(1)}x Multiple`,
        description: "Institutional Tier-1 sports holding exit multiple benchmarked against Learfield and IMG College comparables.",
        sparkline
      };
    }
  }, [dateRange, baseMultiple, annualRunRate]);

  return (
    <div className="bg-[#101319] border border-white/[0.09] rounded-xl p-6 lg:p-7 space-y-6 shadow-2xl relative overflow-hidden">
      
      {/* Subtle background ambient glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#C89B3C]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header bar of Institutional Health with Date Range Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.07] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#68D391] animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C89B3C]">
              Institutional Governance & Risk Matrix
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            Institutional Health Dashboard
          </h2>
        </div>

        {/* Right Controls: Fiduciary Badge + Date-Range Filter */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Date-Range Filter Control */}
          <div className="flex items-center bg-[#090C10] p-1 rounded-sm border border-white/10 text-xs font-mono">
            <div className="flex items-center gap-1 px-2 text-neutral-500 border-r border-white/10 mr-1 hidden sm:flex">
              <Calendar size={12} className="text-[#C89B3C]" />
              <span className="text-[10px] uppercase tracking-wider">Horizon</span>
            </div>
            
            {(['1-year', '3-year', '5-year'] as const).map((range) => {
              const isActive = dateRange === range;
              return (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-sm transition-all ${
                    isActive
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                  aria-pressed={isActive}
                >
                  {range}
                </button>
              );
            })}
          </div>

          {/* Fiduciary Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171B24] border border-white/10 rounded-sm text-neutral-300 text-xs font-mono">
            <ShieldCheck size={14} className="text-[#68D391]" />
            <span>Fiduciary: <strong className="text-white">Accredited A+</strong></span>
          </div>
        </div>
      </div>

      {/* Active Horizon Sub-banner */}
      <div className="flex items-center justify-between text-xs font-mono px-3 py-2 bg-[#0A0D12] rounded border border-white/[0.05] text-neutral-400">
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-[#C89B3C]" />
          <span>Active Projection Horizon:</span>
          <span className="text-[#E8C98B] font-semibold uppercase">{dateRange} Projection Model</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] text-neutral-500">
          Sparklines reflect {dateRange === '1-year' ? 'trailing 12-month historical pacing' : dateRange === '3-year' ? '3-year network syndication target' : '5-year institutional terminal saturation'}
        </span>
      </div>

      {/* KPI 3-Column Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* KPI 1: Total Market Penetration % */}
        {(() => {
          const penSpark = penetrationConfig.sparkline;
          const penDelta = penSpark.length >= 2 
            ? penSpark[penSpark.length - 1].value - penSpark[penSpark.length - 2].value 
            : 0;

          return (
            <div className="bg-[#141822] p-5 rounded-lg border border-white/[0.07] hover:border-white/15 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-2">
                  <span className="uppercase tracking-wider">Total Market Penetration</span>
                  <span className="text-[#C89B3C] font-semibold">Addressable TAM</span>
                </div>
                
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-white tabular-nums tracking-tight">
                    {penetrationConfig.displayValue}
                  </span>
                  <span 
                    className={`inline-flex items-center gap-0.5 text-xs font-mono font-bold px-1.5 py-0.5 rounded border ${
                      penDelta >= 0 
                        ? 'text-[#68D391] bg-emerald-950/40 border-emerald-500/30' 
                        : 'text-rose-400 bg-rose-950/40 border-rose-500/30'
                    }`} 
                    title={`Velocity vs previous period (${penSpark[penSpark.length - 2]?.period || 'prior'}): ${penDelta >= 0 ? '+' : ''}${penDelta.toFixed(1)}%`}
                  >
                    {penDelta >= 0 ? <ArrowUp size={11} className="stroke-[2.5]" /> : <ArrowDown size={11} className="stroke-[2.5]" />}
                    <span>{penDelta >= 0 ? `+${penDelta.toFixed(1)}%` : `${penDelta.toFixed(1)}%`}</span>
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {penetrationConfig.subText}
                  </span>
                </div>

                <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                  {penetrationConfig.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-end justify-between">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">
                    {penetrationConfig.velocityLabel}
                  </div>
                  <div className="text-xs font-mono text-[#68D391] font-semibold flex items-center gap-1">
                    <ArrowUpRight size={13} /> {penetrationConfig.velocityValue}
                  </div>
                </div>
                <MiniSparkline 
                  key={`pen-${dateRange}-${campusCount}`}
                  data={penetrationConfig.sparkline} 
                  color="#C89B3C" 
                  gradientId="penetrationGrad" 
                  unitSuffix="%" 
                />
              </div>
            </div>
          );
        })()}

        {/* KPI 2: Net Asset Growth YOY */}
        {(() => {
          const assetSpark = assetGrowthConfig.sparkline;
          const assetDelta = assetSpark.length >= 2 
            ? assetSpark[assetSpark.length - 1].value - assetSpark[assetSpark.length - 2].value 
            : 0;

          return (
            <div className="bg-[#141822] p-5 rounded-lg border border-white/[0.07] hover:border-white/15 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-2">
                  <span className="uppercase tracking-wider">Net Asset Growth YOY</span>
                  <span className="text-[#68D391] font-semibold">28 Portfolios</span>
                </div>

                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-[#68D391] tabular-nums tracking-tight">
                    {assetGrowthConfig.displayValue}
                  </span>
                  <span 
                    className={`inline-flex items-center gap-0.5 text-xs font-mono font-bold px-1.5 py-0.5 rounded border ${
                      assetDelta >= 0 
                        ? 'text-[#68D391] bg-emerald-950/40 border-emerald-500/30' 
                        : 'text-rose-400 bg-rose-950/40 border-rose-500/30'
                    }`} 
                    title={`Velocity vs previous period (${assetSpark[assetSpark.length - 2]?.period || 'prior'}): ${assetDelta >= 0 ? '+' : ''}${assetDelta.toFixed(1)}%`}
                  >
                    {assetDelta >= 0 ? <ArrowUp size={11} className="stroke-[2.5]" /> : <ArrowDown size={11} className="stroke-[2.5]" />}
                    <span>{assetDelta >= 0 ? `+${assetDelta.toFixed(1)}%` : `${assetDelta.toFixed(1)}%`}</span>
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {assetGrowthConfig.subText}
                  </span>
                </div>

                <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                  {assetGrowthConfig.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-end justify-between">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">
                    {assetGrowthConfig.velocityLabel}
                  </div>
                  <div className="text-xs font-mono text-white font-semibold">
                    {assetGrowthConfig.velocityValue}
                  </div>
                </div>
                <MiniSparkline 
                  key={`asset-${dateRange}`}
                  data={assetGrowthConfig.sparkline} 
                  color="#68D391" 
                  gradientId="assetGrowthGrad" 
                  unitPrefix="+" 
                  unitSuffix="%" 
                />
              </div>
            </div>
          );
        })()}

        {/* KPI 3: Brand Valuation Multiple */}
        {(() => {
          const valSpark = valuationMultipleConfig.sparkline;
          const valDelta = valSpark.length >= 2 
            ? valSpark[valSpark.length - 1].value - valSpark[valSpark.length - 2].value 
            : 0;

          return (
            <div className="bg-[#141822] p-5 rounded-lg border border-white/[0.07] hover:border-white/15 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-2">
                  <span className="uppercase tracking-wider">Brand Valuation Multiple</span>
                  <span className="text-[#E8C98B] font-semibold">EV / ARR</span>
                </div>

                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-[#E8C98B] tabular-nums tracking-tight">
                    {valuationMultipleConfig.displayValue}
                  </span>
                  <span 
                    className={`inline-flex items-center gap-0.5 text-xs font-mono font-bold px-1.5 py-0.5 rounded border ${
                      valDelta >= 0 
                        ? 'text-[#68D391] bg-emerald-950/40 border-emerald-500/30' 
                        : 'text-rose-400 bg-rose-950/40 border-rose-500/30'
                    }`} 
                    title={`Velocity vs previous period (${valSpark[valSpark.length - 2]?.period || 'prior'}): ${valDelta >= 0 ? '+' : ''}${valDelta.toFixed(1)}x`}
                  >
                    {valDelta >= 0 ? <ArrowUp size={11} className="stroke-[2.5]" /> : <ArrowDown size={11} className="stroke-[2.5]" />}
                    <span>{valDelta >= 0 ? `+${valDelta.toFixed(1)}x` : `${valDelta.toFixed(1)}x`}</span>
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {valuationMultipleConfig.subText}
                  </span>
                </div>

                <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                  {valuationMultipleConfig.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-end justify-between">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">
                    {valuationMultipleConfig.velocityLabel}
                  </div>
                  <div className="text-xs font-mono text-[#E8C98B] font-semibold flex items-center gap-1">
                    <ArrowUpRight size={13} /> {valuationMultipleConfig.velocityValue}
                  </div>
                </div>
                <MiniSparkline 
                  key={`val-${dateRange}-${campusCount}-${annualRunRate}`}
                  data={valuationMultipleConfig.sparkline} 
                  color="#E8C98B" 
                  gradientId="multipleGrad" 
                  unitSuffix="x" 
                />
              </div>
            </div>
          );
        })()}

      </div>

      {/* Institutional Health Footer Footnote */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-neutral-400 font-mono gap-2">
        <div className="flex items-center gap-2">
          <Info size={13} className="text-[#C89B3C]" />
          <span>
            {dateRange === '1-year' 
              ? 'Displaying 1-year trailing pacing synced with active slider parameters.' 
              : dateRange === '3-year' 
                ? 'Displaying 3-year pro-forma compounding based on regional conference network effects.' 
                : 'Displaying 5-year terminal horizon modeling national NCAA/NAIA saturation.'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>Audit Standard: <strong>GAAP Compliant Pro-Forma</strong></span>
          <span>·</span>
          <span>Capital Structure: <strong>Clean Common Equity</strong></span>
        </div>
      </div>

    </div>
  );
};
