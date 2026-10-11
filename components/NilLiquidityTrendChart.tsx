import React, { useState, useMemo, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { 
  TrendingUp, 
  DollarSign, 
  Hash, 
  Calendar, 
  Zap, 
  ArrowUpRight, 
  Info, 
  Layers,
  Sparkles,
  Award,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { MonthlyDataPoint, MONTHLY_NIL_DATA } from './NilAnalyticsSubView';

export type TrendDisplayMode = 'dual' | 'liquidity' | 'deals';

interface InflectionPoint {
  month: string;
  label: string;
  detail: string;
}

const MARKET_INFLECTIONS: InflectionPoint[] = [
  { month: 'Jan 25', label: 'Bylaw 12 Clearing', detail: 'State escrow clearinghouse standardization' },
  { month: 'Sep 25', label: 'Fall Collective Surge', detail: 'Tier-1 conference multi-campus activations' },
  { month: 'Mar 26', label: 'FAST Syndication Launch', detail: 'National tournament ad syndication inflow' }
];

export const NilLiquidityTrendChart: React.FC = () => {
  const [displayMode, setDisplayMode] = useState<TrendDisplayMode>('dual');
  const [showInflections, setShowInflections] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<{
    data: MonthlyDataPoint;
    x: number;
    yLiquidity: number;
    yDeals: number;
    prevData?: MonthlyDataPoint;
  } | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const data = MONTHLY_NIL_DATA;

  // D3 Dual Line Chart Render
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const containerWidth = containerRef.current.clientWidth || 800;
    const height = 340;
    const margin = { 
      top: 28, 
      right: displayMode === 'liquidity' ? 36 : 64, 
      bottom: 40, 
      left: displayMode === 'deals' ? 36 : 56 
    };
    const width = containerWidth - margin.left - margin.right;

    svg.attr('viewBox', `0 0 ${containerWidth} ${height}`);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const months = data.map((d) => d.month);

    // X Scale
    const xScale = d3.scalePoint<string>()
      .domain(months)
      .range([0, width])
      .padding(0.04);

    // Left Y Scale (Liquidity in $M)
    const maxLiquidity = d3.max(data, (d) => d.totalLiquidity) || 7;
    const yLiquidityScale = d3.scaleLinear()
      .domain([0, maxLiquidity * 1.15])
      .range([height - margin.top - margin.bottom, 0]);

    // Right Y Scale (Deal Count)
    const maxDeals = d3.max(data, (d) => d.totalDeals) || 1000;
    const yDealsScale = d3.scaleLinear()
      .domain([0, maxDeals * 1.15])
      .range([height - margin.top - margin.bottom, 0]);

    // Defs for Gradients & Glow
    const defs = svg.append('defs');

    // Liquidity Gold Gradient
    const liqGradient = defs.append('linearGradient')
      .attr('id', 'liquidityLineGrad')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    liqGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#C89B3C')
      .attr('stop-opacity', 0.45);

    liqGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#C89B3C')
      .attr('stop-opacity', 0.0);

    // Deal Volume Cyan Gradient
    const dealsGradient = defs.append('linearGradient')
      .attr('id', 'dealsLineGrad')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    dealsGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#38BDF8')
      .attr('stop-opacity', 0.35);

    dealsGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#38BDF8')
      .attr('stop-opacity', 0.0);

    // Grid lines (horizontal)
    const yTicks = yLiquidityScale.ticks(5);
    g.selectAll('.trend-grid-line')
      .data(yTicks)
      .enter()
      .append('line')
      .attr('class', 'trend-grid-line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d) => yLiquidityScale(d))
      .attr('y2', (d) => yLiquidityScale(d))
      .attr('stroke', 'rgba(255, 255, 255, 0.06)')
      .attr('stroke-dasharray', '3 3');

    // 1. Draw Liquidity Area & Line
    if (displayMode === 'dual' || displayMode === 'liquidity') {
      const liquidityArea = d3.area<MonthlyDataPoint>()
        .x((d) => xScale(d.month) || 0)
        .y0(height - margin.top - margin.bottom)
        .y1((d) => yLiquidityScale(d.totalLiquidity))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(data)
        .attr('class', 'liquidity-area')
        .attr('d', liquidityArea)
        .attr('fill', 'url(#liquidityLineGrad)')
        .attr('pointer-events', 'none');

      const liquidityLine = d3.line<MonthlyDataPoint>()
        .x((d) => xScale(d.month) || 0)
        .y((d) => yLiquidityScale(d.totalLiquidity))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(data)
        .attr('class', 'liquidity-line')
        .attr('d', liquidityLine)
        .attr('fill', 'none')
        .attr('stroke', '#C89B3C')
        .attr('stroke-width', 2.8)
        .attr('pointer-events', 'none');
    }

    // 2. Draw Deal Volume Area & Line
    if (displayMode === 'dual' || displayMode === 'deals') {
      const dealsArea = d3.area<MonthlyDataPoint>()
        .x((d) => xScale(d.month) || 0)
        .y0(height - margin.top - margin.bottom)
        .y1((d) => yDealsScale(d.totalDeals))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(data)
        .attr('class', 'deals-area')
        .attr('d', dealsArea)
        .attr('fill', 'url(#dealsLineGrad)')
        .attr('pointer-events', 'none');

      const dealsLine = d3.line<MonthlyDataPoint>()
        .x((d) => xScale(d.month) || 0)
        .y((d) => yDealsScale(d.totalDeals))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(data)
        .attr('class', 'deals-line')
        .attr('d', dealsLine)
        .attr('fill', 'none')
        .attr('stroke', '#38BDF8')
        .attr('stroke-width', displayMode === 'dual' ? 2.2 : 2.8)
        .attr('stroke-dasharray', displayMode === 'dual' ? '5 3' : 'none')
        .attr('pointer-events', 'none');
    }

    // 3. Draw Inflection Points / Market Milestones
    if (showInflections) {
      MARKET_INFLECTIONS.forEach((inf) => {
        const infData = data.find((d) => d.month === inf.month);
        if (!infData) return;

        const xPos = xScale(inf.month);
        if (xPos === undefined) return;

        const yPos = displayMode === 'deals' 
          ? yDealsScale(infData.totalDeals) 
          : yLiquidityScale(infData.totalLiquidity);

        // Vertical milestone dashed guide
        g.append('line')
          .attr('x1', xPos)
          .attr('x2', xPos)
          .attr('y1', 0)
          .attr('y2', height - margin.top - margin.bottom)
          .attr('stroke', 'rgba(200, 155, 60, 0.4)')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '2 2')
          .attr('pointer-events', 'none');

        // Star / diamond marker
        g.append('circle')
          .attr('cx', xPos)
          .attr('cy', yPos)
          .attr('r', 5.5)
          .attr('fill', '#090C12')
          .attr('stroke', '#C89B3C')
          .attr('stroke-width', 2)
          .attr('pointer-events', 'none');

        // Text Badge
        g.append('text')
          .attr('x', xPos)
          .attr('y', Math.max(12, yPos - 12))
          .attr('text-anchor', 'middle')
          .attr('fill', '#E8C98B')
          .attr('font-size', '9px')
          .attr('font-family', 'monospace')
          .attr('font-weight', 'bold')
          .text(inf.label)
          .attr('pointer-events', 'none');
      });
    }

    // Bottom Axis (Months)
    const tickInterval = containerWidth < 640 ? 4 : 2;
    const tickMonths = months.filter((_, i) => i % tickInterval === 0 || i === months.length - 1);

    const xAxis = d3.axisBottom(xScale)
      .tickValues(tickMonths)
      .tickSize(0)
      .tickPadding(12);

    const xAxisGroup = g.append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(xAxis);

    xAxisGroup.select('.domain').attr('stroke', 'rgba(255, 255, 255, 0.15)');
    xAxisGroup.selectAll('text')
      .attr('fill', '#9CA3AF')
      .attr('font-size', '10px')
      .attr('font-family', 'monospace');

    // Left Axis ($M Liquidity)
    if (displayMode === 'dual' || displayMode === 'liquidity') {
      const yAxisLeft = d3.axisLeft(yLiquidityScale)
        .ticks(5)
        .tickFormat((d) => `$${d}M`)
        .tickSize(0)
        .tickPadding(8);

      const yLeftGroup = g.append('g').call(yAxisLeft);
      yLeftGroup.select('.domain').remove();
      yLeftGroup.selectAll('text')
        .attr('fill', '#C89B3C')
        .attr('font-size', '10px')
        .attr('font-family', 'monospace')
        .attr('font-weight', 'bold');
    }

    // Right Axis (Deal Count)
    if (displayMode === 'dual' || displayMode === 'deals') {
      const yAxisRight = d3.axisRight(yDealsScale)
        .ticks(5)
        .tickFormat((d) => `${d}`)
        .tickSize(0)
        .tickPadding(8);

      const yRightGroup = g.append('g')
        .attr('transform', `translate(${width}, 0)`)
        .call(yAxisRight);

      yRightGroup.select('.domain').remove();
      yRightGroup.selectAll('text')
        .attr('fill', '#38BDF8')
        .attr('font-size', '10px')
        .attr('font-family', 'monospace')
        .attr('font-weight', 'bold');
    }

    // Tracking Line & Indicators
    const trackingLine = g.append('line')
      .attr('class', 'tracking-line')
      .attr('stroke', 'rgba(255, 255, 255, 0.4)')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '3 3')
      .style('opacity', 0)
      .style('pointer-events', 'none');

    const liqPoint = g.append('circle')
      .attr('r', 5.5)
      .attr('fill', '#C89B3C')
      .attr('stroke', '#090C12')
      .attr('stroke-width', 2.5)
      .style('opacity', 0)
      .style('pointer-events', 'none');

    const dealsPoint = g.append('circle')
      .attr('r', 5.5)
      .attr('fill', '#38BDF8')
      .attr('stroke', '#090C12')
      .attr('stroke-width', 2.5)
      .style('opacity', 0)
      .style('pointer-events', 'none');

    // Transparent Hover Overlay
    const overlay = g.append('rect')
      .attr('width', width)
      .attr('height', height - margin.top - margin.bottom)
      .attr('fill', 'transparent')
      .style('cursor', 'crosshair');

    const handlePointerMove = (event: any) => {
      const [mouseX] = d3.pointer(event, g.node());

      let closestIdx = 0;
      let minDistance = Infinity;

      months.forEach((m, idx) => {
        const x = xScale(m) || 0;
        const dist = Math.abs(x - mouseX);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      const pt = data[closestIdx];
      const prevPt = closestIdx > 0 ? data[closestIdx - 1] : undefined;
      const xPos = xScale(pt.month) || 0;
      const yLiq = yLiquidityScale(pt.totalLiquidity);
      const yDeals = yDealsScale(pt.totalDeals);

      trackingLine
        .attr('x1', xPos)
        .attr('x2', xPos)
        .attr('y1', 0)
        .attr('y2', height - margin.top - margin.bottom)
        .style('opacity', 0.85);

      if (displayMode === 'dual' || displayMode === 'liquidity') {
        liqPoint
          .attr('cx', xPos)
          .attr('cy', yLiq)
          .style('opacity', 1);
      } else {
        liqPoint.style('opacity', 0);
      }

      if (displayMode === 'dual' || displayMode === 'deals') {
        dealsPoint
          .attr('cx', xPos)
          .attr('cy', yDeals)
          .style('opacity', 1);
      } else {
        dealsPoint.style('opacity', 0);
      }

      const containerRect = containerRef.current?.getBoundingClientRect();
      const clientX = event.clientX;
      const relativeX = containerRect ? clientX - containerRect.left : xPos + margin.left;

      setHoveredPoint({
        data: pt,
        x: relativeX,
        yLiquidity: yLiq,
        yDeals: yDeals,
        prevData: prevPt
      });
    };

    const handlePointerLeave = () => {
      trackingLine.style('opacity', 0);
      liqPoint.style('opacity', 0);
      dealsPoint.style('opacity', 0);
      setHoveredPoint(null);
    };

    overlay
      .on('pointermove', handlePointerMove)
      .on('pointerleave', handlePointerLeave);

  }, [data, displayMode, showInflections]);

  // Compute 24-Month Aggregate Expansion Stats
  const stats = useMemo(() => {
    const first = data[0];
    const last = data[data.length - 1];

    const liqGrowthPct = ((last.totalLiquidity - first.totalLiquidity) / first.totalLiquidity) * 100;
    const dealsGrowthPct = ((last.totalDeals - first.totalDeals) / first.totalDeals) * 100;
    const avgTicketStart = Math.round((first.totalLiquidity * 1000000) / first.totalDeals);
    const avgTicketEnd = Math.round((last.totalLiquidity * 1000000) / last.totalDeals);

    return {
      startMonth: first.fullMonth,
      endMonth: last.fullMonth,
      startLiquidity: first.totalLiquidity,
      endLiquidity: last.totalLiquidity,
      liqGrowthPct,
      startDeals: first.totalDeals,
      endDeals: last.totalDeals,
      dealsGrowthPct,
      avgTicketStart,
      avgTicketEnd
    };
  }, [data]);

  return (
    <div className="bg-[#11141B] border border-white/[0.08] rounded-xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-40 bg-[#C89B3C]/5 blur-3xl pointer-events-none" />

      {/* Header Bar with Toggle Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#1A202E] text-[#C89B3C] border border-[#C89B3C]/30">
              <TrendingUp size={14} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-[#C89B3C] font-semibold">
              Longitudinal NIL Velocity · 24-Month Expansion
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border font-bold text-[#68D391] bg-emerald-950/40 border-emerald-500/25">
              +128.7% LIQUIDITY
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-display">
            Historical Liquidity Growth & Deal Volume Trend
          </h3>
          <p className="text-xs text-neutral-400">
            Synchronized dual-axis trajectory tracking cumulative commercial capital inflow alongside verified athlete contract counts.
          </p>
        </div>

        {/* View Controls & Toggles */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Display Mode Pills */}
          <div className="flex items-center bg-[#090C12] p-1 rounded-sm border border-white/10 text-xs font-mono">
            <button
              onClick={() => setDisplayMode('dual')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                displayMode === 'dual'
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Dual Comparison
            </button>
            <button
              onClick={() => setDisplayMode('liquidity')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                displayMode === 'liquidity'
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Liquidity Only ($M)
            </button>
            <button
              onClick={() => setDisplayMode('deals')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                displayMode === 'deals'
                  ? 'bg-[#38BDF8] text-[#090A0C] font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Deals Only
            </button>
          </div>

          {/* Inflection Markers Toggle */}
          <button
            onClick={() => setShowInflections(!showInflections)}
            className={`px-2.5 py-1.5 rounded text-[11px] font-mono border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showInflections 
                ? 'bg-white/10 text-white border-white/20' 
                : 'bg-[#151922] text-neutral-500 border-white/5 hover:text-neutral-300'
            }`}
            title="Toggle market regulatory and syndication milestones"
          >
            <Sparkles size={11} className={showInflections ? 'text-[#C89B3C]' : 'text-neutral-500'} />
            <span className="hidden sm:inline">Milestones</span>
          </button>

        </div>
      </div>

      {/* Legend & Axis Guide */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-5">
          {(displayMode === 'dual' || displayMode === 'liquidity') && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#C89B3C] rounded-full inline-block" />
              <span className="text-white font-semibold">Monthly Liquidity ($M)</span>
              <span className="text-neutral-500 text-[10px] hidden sm:inline">(Solid Gold · Left Axis)</span>
            </div>
          )}

          {(displayMode === 'dual' || displayMode === 'deals') && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#38BDF8] rounded-full inline-block border-t border-dashed border-white" />
              <span className="text-[#38BDF8] font-semibold">Verified Deal Volume</span>
              <span className="text-neutral-500 text-[10px] hidden sm:inline">(Dashed Cyan · Right Axis)</span>
            </div>
          )}
        </div>

        <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
          <Eye size={12} className="text-[#C89B3C]" />
          <span>Hover curve to inspect monthly pace & ticket yields</span>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div 
        ref={containerRef} 
        className="w-full relative overflow-hidden bg-[#0A0D14] p-4 rounded-lg border border-white/5"
      >
        <svg ref={svgRef} className="w-full h-auto block select-none" />

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div 
            className="absolute pointer-events-none z-30 transition-all duration-75"
            style={{
              left: `${Math.min(Math.max(hoveredPoint.x + 16, 12), (containerRef.current?.clientWidth || 800) - 260)}px`,
              top: `24px`
            }}
          >
            <div className="bg-[#0C0F17]/95 backdrop-blur-md border border-[#C89B3C]/50 rounded-lg p-3.5 shadow-2xl space-y-2 w-64 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span className="text-white font-bold font-sans text-xs">
                  {hoveredPoint.data.fullMonth}
                </span>
                <span className="text-[10px] text-[#C89B3C] uppercase font-bold">
                  Monthly Pace
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                {/* Liquidity */}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C89B3C]" />
                    <span>Gross Liquidity:</span>
                  </span>
                  <span className="text-[#E8C98B] font-bold">
                    ${hoveredPoint.data.totalLiquidity.toFixed(2)}M
                  </span>
                </div>

                {/* Deal Count */}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                    <span>Contract Deals:</span>
                  </span>
                  <span className="text-white font-bold">
                    {hoveredPoint.data.totalDeals.toLocaleString()} deals
                  </span>
                </div>

                {/* Average Yield */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
                  <span className="text-neutral-400">Avg Deal Yield:</span>
                  <span className="text-[#68D391] font-bold">
                    ${Math.round((hoveredPoint.data.totalLiquidity * 1000000) / hoveredPoint.data.totalDeals).toLocaleString()} / athlete
                  </span>
                </div>

                {/* Month-over-Month Velocity if previous available */}
                {hoveredPoint.prevData && (
                  <div className="flex items-center justify-between text-[10px] text-neutral-400">
                    <span>MoM Velocity:</span>
                    <span className="text-[#68D391] font-semibold">
                      +{(((hoveredPoint.data.totalLiquidity - hoveredPoint.prevData.totalLiquidity) / hoveredPoint.prevData.totalLiquidity) * 100).toFixed(1)}% Liquidity
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 24-Month Expansion Metrics Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs font-mono">
        <div className="bg-[#090C12] p-3 rounded border border-white/5 space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase">24-Mo Liquidity Growth</div>
          <div className="text-[#E8C98B] font-bold text-base mt-0.5">
            +{stats.liqGrowthPct.toFixed(1)}%
          </div>
          <div className="text-[10px] text-neutral-400">
            ${stats.startLiquidity.toFixed(2)}M → ${stats.endLiquidity.toFixed(2)}M/mo
          </div>
        </div>

        <div className="bg-[#090C12] p-3 rounded border border-white/5 space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase">24-Mo Deal Expansion</div>
          <div className="text-[#38BDF8] font-bold text-base mt-0.5">
            +{stats.dealsGrowthPct.toFixed(1)}%
          </div>
          <div className="text-[10px] text-neutral-400">
            {stats.startDeals} → {stats.endDeals} deals/mo
          </div>
        </div>

        <div className="bg-[#090C12] p-3 rounded border border-white/5 space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase">Average Athlete Yield</div>
          <div className="text-[#68D391] font-bold text-base mt-0.5">
            ${stats.avgTicketEnd.toLocaleString()}
          </div>
          <div className="text-[10px] text-neutral-400">
            Steady +${(stats.avgTicketEnd - stats.avgTicketStart).toLocaleString()} / deal lift
          </div>
        </div>

        <div className="bg-[#090C12] p-3 rounded border border-white/5 space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase">Inflection Milestone</div>
          <div className="text-white font-bold text-base mt-0.5">
            3 Scaled Catalysts
          </div>
          <div className="text-[10px] text-[#C89B3C]">
            FAST syndication & NCAA Bylaw 12
          </div>
        </div>
      </div>

    </div>
  );
};
