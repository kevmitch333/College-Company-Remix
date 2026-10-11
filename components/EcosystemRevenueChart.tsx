import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { TrendingUp, BarChart2 } from 'lucide-react';

interface EcosystemRevenueChartProps {
  campusCount: number;
  avgNilDeal: number;
  mediaRightsTier: number;
  scenario?: 'Conservative' | 'Expected' | 'Aggressive';
}

export interface YearProjection {
  year: string;
  yearNum: number;
  campuses: number;
  revenue: number; // in millions
  growthRate: number; // percentage from previous year
}

export const EcosystemRevenueChart: React.FC<EcosystemRevenueChartProps> = ({
  campusCount,
  avgNilDeal,
  mediaRightsTier,
  scenario = 'Expected'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [activeBar, setActiveBar] = useState<YearProjection | null>(null);

  const scenarioConfig = {
    Conservative: {
      multipliers: [1.0, 1.20, 1.45, 1.75, 2.10],
      monetizationRate: 0.32,
      sponsorBase: 14500,
      badge: 'Conservative (2.1x)',
      badgeClass: 'text-amber-400 bg-amber-950/40 border-amber-500/30'
    },
    Expected: {
      multipliers: [1.0, 1.38, 1.85, 2.38, 3.00],
      monetizationRate: 0.40,
      sponsorBase: 18500,
      badge: 'Expected Base (3.0x)',
      badgeClass: 'text-[#E8C98B] bg-[#C89B3C]/15 border-[#C89B3C]/40'
    },
    Aggressive: {
      multipliers: [1.0, 1.58, 2.35, 3.25, 4.20],
      monetizationRate: 0.52,
      sponsorBase: 24500,
      badge: 'Aggressive (4.2x)',
      badgeClass: 'text-[#68D391] bg-emerald-950/40 border-emerald-500/30'
    }
  };

  const activeConfig = scenarioConfig[scenario];

  // Generate 5-year projections based on current campus adoption rate and selected scenario
  const projections: YearProjection[] = React.useMemo(() => {
    const multipliers = activeConfig.multipliers;
    const baseYear = 2026;

    let prevRev = 0;
    return multipliers.map((multiplier, idx) => {
      // Projected campuses capped at 450 total target universities
      const projectedCampuses = Math.min(450, Math.round(campusCount * multiplier));
      const athletes = projectedCampuses * 45;
      const nilVol = athletes * (avgNilDeal * activeConfig.monetizationRate);
      const platformNil = nilVol * 0.15;
      const campusLicensing = projectedCampuses * mediaRightsTier;
      const mediaSponsorship = projectedCampuses * activeConfig.sponsorBase;
      const totalRevMillions = (platformNil + campusLicensing + mediaSponsorship) / 1000000;

      let growth = 0;
      if (idx > 0 && prevRev > 0) {
        growth = ((totalRevMillions - prevRev) / prevRev) * 100;
      }
      prevRev = totalRevMillions;

      return {
        year: `Y${idx + 1} (${baseYear + idx})`,
        yearNum: baseYear + idx,
        campuses: projectedCampuses,
        revenue: totalRevMillions,
        growthRate: growth
      };
    });
  }, [campusCount, avgNilDeal, mediaRightsTier, activeConfig]);

  const [containerWidth, setContainerWidth] = useState<number>(0);

  // ResizeObserver for responsive width
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = containerWidth || container.clientWidth || 540;
    const height = 310;
    const margin = { top: 35, right: 25, bottom: 45, left: 55 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous elements
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', height);

    // Defs: Gradients and filters for an investable, sovereign gold appearance
    const defs = svg.append('defs');

    // Bar linear gradient
    const goldGradient = defs
      .append('linearGradient')
      .attr('id', 'goldBarGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    goldGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#E8C98B');

    goldGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#A3792A');

    // Highlighted bar gradient
    const activeGradient = defs
      .append('linearGradient')
      .attr('id', 'activeBarGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    activeGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#FFFFFF');

    activeGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#C89B3C');

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale
    const xScale = d3
      .scaleBand()
      .domain(projections.map((d) => d.year))
      .range([0, innerWidth])
      .padding(0.35);

    // Y Scale (0 to 15% above max revenue)
    const maxRev = d3.max(projections, (d) => d.revenue) || 10;
    const yScale = d3
      .scaleLinear()
      .domain([0, maxRev * 1.18])
      .nice()
      .range([innerHeight, 0]);

    // Horizontal Grid Lines
    const yTicks = yScale.ticks(5);
    g.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(yTicks)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', 'rgba(255, 255, 255, 0.06)')
      .attr('stroke-dasharray', '3 3');

    // X Axis
    const xAxis = d3.axisBottom(xScale).tickSize(0);
    const xAxisGroup = g
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    xAxisGroup.select('.domain').attr('stroke', 'rgba(255, 255, 255, 0.12)');
    xAxisGroup
      .selectAll('text')
      .attr('fill', '#9BA3AF')
      .attr('font-size', '11px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('dy', '14px');

    // Y Axis
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => `$${d}M`)
      .tickSize(0);

    const yAxisGroup = g.append('g').call(yAxis);
    yAxisGroup.select('.domain').attr('stroke', 'transparent');
    yAxisGroup
      .selectAll('text')
      .attr('fill', '#6B7280')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('dx', '-6px');

    // Draw Bars with transition
    const bars = g
      .selectAll('.bar-group')
      .data(projections)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .style('cursor', 'pointer');

    // Animated Rects
    bars
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.year) || 0)
      .attr('width', xScale.bandwidth())
      .attr('y', innerHeight)
      .attr('height', 0)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('fill', 'url(#goldBarGradient)')
      .attr('stroke', 'rgba(255, 255, 255, 0.1)')
      .attr('stroke-width', 0.5)
      .on('mouseenter', function (event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('fill', 'url(#activeBarGradient)');
        setActiveBar(d);
      })
      .on('mouseleave', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', 'url(#goldBarGradient)');
        setActiveBar(null);
      })
      .transition()
      .duration(750)
      .delay((_, i) => i * 80)
      .ease(d3.easeCubicOut)
      .attr('y', (d) => yScale(d.revenue))
      .attr('height', (d) => innerHeight - yScale(d.revenue));

    // Value Labels on top of bars
    bars
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d) => (xScale(d.year) || 0) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.revenue) - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', '#E8C98B')
      .attr('font-size', '11px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-weight', '600')
      .attr('opacity', 0)
      .text((d) => `$${d.revenue.toFixed(1)}M`)
      .transition()
      .duration(600)
      .delay((_, i) => i * 80 + 350)
      .attr('opacity', 1);

    // Campus count sublabels below the bar labels or top
    bars
      .append('text')
      .attr('class', 'campus-label')
      .attr('x', (d) => (xScale(d.year) || 0) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.revenue) - 22)
      .attr('text-anchor', 'middle')
      .attr('fill', '#71717A')
      .attr('font-size', '9px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('opacity', 0)
      .text((d) => `${d.campuses} Univ.`)
      .transition()
      .duration(600)
      .delay((_, i) => i * 80 + 400)
      .attr('opacity', 1);

  }, [projections, containerWidth]);

  // Overall 5-year CAGR computation
  const fiveYearCagr = useMemo(() => {
    if (projections.length < 2 || projections[0].revenue <= 0) return 0;
    const start = projections[0].revenue;
    const end = projections[projections.length - 1].revenue;
    return (Math.pow(end / start, 1 / 4) - 1) * 100;
  }, [projections]);

  return (
    <div className="bg-[#11141B] rounded-lg border border-white/[0.08] p-6 space-y-5">
      {/* Header with Title & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
        <div>
          <div className="text-[10px] font-mono text-[#C89B3C] uppercase tracking-widest flex items-center gap-1.5">
            <BarChart2 size={13} /> D3 Quantitative Modeling
          </div>
          <h3 className="text-base font-semibold text-white font-display mt-0.5">
            5-Year Projected Ecosystem Revenue Trajectory
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-mono">
          <div className={`px-2.5 py-1 rounded border text-[11px] font-semibold flex items-center gap-1 ${activeConfig.badgeClass}`}>
            <span>Scenario:</span>
            <span>{activeConfig.badge}</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#C89B3C]"></span>
            <span>Annual Run-Rate</span>
          </div>
          <div className="px-2.5 py-1 bg-[#181D26] border border-white/10 rounded text-[#E8C98B]">
            CAGR: <span className="font-bold text-white">+{fiveYearCagr.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* D3 SVG Container */}
      <div ref={containerRef} className="w-full relative overflow-x-auto">
        <svg ref={svgRef} className="w-full h-[300px] overflow-visible" />
      </div>

      {/* Dynamic Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/[0.06] text-xs font-mono">
        <div className="bg-[#0D1016] p-3 rounded border border-white/[0.05]">
          <div className="text-[10px] text-neutral-500 uppercase">Year 1 Baseline</div>
          <div className="text-white font-bold text-sm mt-0.5">
            ${projections[0].revenue.toFixed(2)}M
          </div>
          <div className="text-[10px] text-neutral-400">{campusCount} Universities</div>
        </div>

        <div className="bg-[#0D1016] p-3 rounded border border-white/[0.05]">
          <div className="text-[10px] text-neutral-500 uppercase">Year 3 Expansion</div>
          <div className="text-white font-bold text-sm mt-0.5">
            ${projections[2].revenue.toFixed(2)}M
          </div>
          <div className="text-[10px] text-[#68D391]">
            +{projections[2].growthRate.toFixed(0)}% YoY
          </div>
        </div>

        <div className="bg-[#0D1016] p-3 rounded border border-white/[0.05]">
          <div className="text-[10px] text-neutral-500 uppercase">Year 5 Terminal</div>
          <div className="text-[#E8C98B] font-bold text-sm mt-0.5">
            ${projections[4].revenue.toFixed(2)}M
          </div>
          <div className="text-[10px] text-neutral-400">{projections[4].campuses} Universities</div>
        </div>

        <div className="bg-[#0D1016] p-3 rounded border border-white/[0.05]">
          <div className="text-[10px] text-neutral-500 uppercase">5-Yr Total TAM Captured</div>
          <div className="text-white font-bold text-sm mt-0.5">
            ${projections.reduce((acc, curr) => acc + curr.revenue, 0).toFixed(1)}M
          </div>
          <div className="text-[10px] text-neutral-400">Cumulative Volume</div>
        </div>
      </div>

      {/* Active Bar Inspection Callout (if hovered) */}
      {activeBar && (
        <div className="p-3 bg-[#161B24] border border-[#C89B3C]/30 rounded text-xs text-neutral-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white font-mono">{activeBar.year}:</span>
            <span>
              Projected to scale to <strong className="text-white">{activeBar.campuses} campuses</strong> generating{' '}
              <strong className="text-[#E8C98B]">${activeBar.revenue.toFixed(2)}M</strong> in annual recurring ecosystem revenue.
            </span>
          </div>
          {activeBar.growthRate > 0 && (
            <span className="text-[#68D391] font-mono text-[11px] font-semibold whitespace-nowrap">
              +{activeBar.growthRate.toFixed(1)}% YoY Growth
            </span>
          )}
        </div>
      )}
    </div>
  );
};
