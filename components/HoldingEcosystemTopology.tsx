import React, { useState } from 'react';
import { 
  Building2, 
  Trophy, 
  Users, 
  Video, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight,
  Zap,
  Globe,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DivisionNode {
  id: string;
  name: string;
  code: string;
  color: string;
  holdingsCount: number;
  flagship: string;
  revenueModel: string;
  summary: string;
  metrics: { label: string; value: string }[];
}

const TOPOLOGY_DIVISIONS: DivisionNode[] = [
  {
    id: 'leagues',
    name: 'Competitive Leagues & Events',
    code: 'DIV-01',
    color: '#EAB308',
    holdingsCount: 7,
    flagship: 'College Esports Expo (CEX) & CDRL',
    revenueModel: 'Tournament Licensing · Gate Ticketing · Title Sponsorships',
    summary: 'Sanctions and stages premier varsity esports tournaments, drone racing circuits, and nationwide collegiate invitationals.',
    metrics: [
      { label: 'Annual Tournaments', value: '48 Matches' },
      { label: 'Campus Participation', value: '180+ Universities' },
      { label: 'Average Broadcast Reach', value: '450K Viewers' }
    ]
  },
  {
    id: 'nil',
    name: 'NIL & Creator Capital',
    code: 'DIV-02',
    color: '#68D391',
    holdingsCount: 15,
    flagship: 'College Esports NIL, High School NIL & Hub',
    revenueModel: '15% Escrow Liquidity Take-Rate · Corporate Matchmaking Fees · SaaS',
    summary: 'Direct-to-student commercial liquidity protocol connecting Fortune 500 brands to verified student athletes with automated Title IX compliance.',
    metrics: [
      { label: 'Audited Deals', value: '3,800+ Contracts' },
      { label: 'Active Roster Size', value: '14,200 Athletes' },
      { label: 'Escrow Clearing Time', value: '< 24 Hours' }
    ]
  },
  {
    id: 'media',
    name: 'Broadcast & Media Networks',
    code: 'DIV-03',
    color: '#38BDF8',
    holdingsCount: 6,
    flagship: 'College Esports TV & Esports NIL TV',
    revenueModel: 'FAST Channel Syndication · Programmatic CPMs · Docuseries Rights',
    summary: 'Packages high-fidelity digital match feeds into 24/7 connected-TV channels, OTT applications, and investigative documentary series.',
    metrics: [
      { label: 'FAST Households', value: '45M Potential' },
      { label: 'Average Watch Time', value: '48.5 Mins' },
      { label: 'Blended Ad CPM', value: '$24.50' }
    ]
  },
  {
    id: 'infrastructure',
    name: 'Campus Infrastructure & Health',
    code: 'DIV-04',
    color: '#A855F7',
    holdingsCount: 15,
    flagship: 'College Revenue Share & NIL Fair Market Value',
    revenueModel: 'Architectural Advisory Retainers · Telehealth Dues · SaaS Subscriptions',
    summary: 'Turnkey facility engineering, low-latency campus networks, ergonomic sports medicine, and varsity enterprise analytics.',
    metrics: [
      { label: 'Arena Designs', value: '32 Completed' },
      { label: 'Medical Coverage', value: '2,400 Competitors' },
      { label: 'Campus Retention Lift', value: '+18.4%' }
    ]
  }
];

export const HoldingEcosystemTopology: React.FC<{
  onSelectDivision?: (divisionName: string) => void;
}> = ({ onSelectDivision }) => {
  const [selectedDivId, setSelectedDivId] = useState<string>('leagues');

  const activeDivision = TOPOLOGY_DIVISIONS.find((d) => d.id === selectedDivId) || TOPOLOGY_DIVISIONS[0];

  return (
    <section className="py-16 md:py-20 bg-[#0A0D13] border-b border-white/[0.08] font-sans">
      <div className="max-w-[1360px] mx-auto px-6 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C89B3C] uppercase tracking-wider font-semibold">
              <Layers size={14} />
              <span>Institutional Holding Architecture · Synergistic Network Topology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Ecosystem Governance & Value Flow Topology
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Visualizing the structural relationship between our central corporate balance sheet, 
              four synergistic operating divisions, and 400+ collegiate partner institutions.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <ShieldCheck size={14} className="text-[#68D391]" />
            <span>Consolidated Intellectual Property & Fiduciary Core</span>
          </div>
        </div>

        {/* Visual Topology Diagram Container */}
        <div className="bg-[#10141D] rounded-xl border border-white/[0.08] p-6 lg:p-8 space-y-8 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C89B3C]/5 rounded-full blur-3xl pointer-events-none" />

          {/* LEVEL 1: THE CENTRAL HOLDING APEX */}
          <div className="flex flex-col items-center text-center space-y-3 relative z-10">
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#181D2A] to-[#121622] border border-[#C89B3C]/50 shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#C89B3C] uppercase tracking-widest pb-1 border-b border-white/5">
                <span>Enterprise Apex</span>
                <span className="font-bold">Delaware C-Corp</span>
              </div>
              <div className="pt-2">
                <div className="text-lg font-bold font-display text-white tracking-tight">
                  College Company Holding Group Inc.
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-0.5">
                  Central Capital Allocation · Regulatory Moat · 28 Controlled IP Portfolios
                </div>
              </div>
            </div>

            {/* Downward Connector Arrow Stem */}
            <div className="w-[2px] h-8 bg-gradient-to-b from-[#C89B3C] to-white/20" />
          </div>

          {/* LEVEL 2: 4 SYNERGISTIC DIVISIONS SELECTOR CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {TOPOLOGY_DIVISIONS.map((div) => {
              const isSelected = div.id === selectedDivId;
              return (
                <div
                  key={div.id}
                  onClick={() => setSelectedDivId(div.id)}
                  className={`p-5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                    isSelected
                      ? 'bg-[#151A26] border-[#C89B3C] shadow-lg ring-1 ring-[#C89B3C]/40'
                      : 'bg-[#0E121A] border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded font-bold" style={{ backgroundColor: `${div.color}20`, color: div.color }}>
                        {div.code}
                      </span>
                      <span className="text-neutral-400">{div.holdingsCount} Entities</span>
                    </div>

                    <h3 className="text-sm font-bold text-white font-display group-hover:text-[#E8C98B] transition-colors leading-snug">
                      {div.name}
                    </h3>

                    <p className="text-[11px] text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                      {div.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-neutral-500">Inspect Mechanics</span>
                    <span className="text-[#C89B3C] group-hover:translate-x-1 transition-transform">
                      {isSelected ? '● Active' : 'Select →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* LEVEL 3: SELECTED DIVISION DEEP-DIVE INSPECTION DOCK */}
          <div className="bg-[#0A0D14] p-6 sm:p-7 rounded-lg border border-white/[0.08] space-y-6 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeDivision.color }} />
                  <span className="text-white font-bold">{activeDivision.name}</span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-[#E8C98B] font-semibold">{activeDivision.flagship}</span>
                </div>
                <div className="text-xs text-neutral-400 font-mono">
                  Revenue Model: <strong className="text-neutral-300">{activeDivision.revenueModel}</strong>
                </div>
              </div>

              {onSelectDivision && (
                <button
                  onClick={() => onSelectDivision(activeDivision.name)}
                  className="px-4 py-2 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all self-start lg:self-auto cursor-pointer flex items-center gap-1.5"
                >
                  <span>View All {activeDivision.holdingsCount} Holdings in Asset Directory</span>
                  <ArrowUpRight size={14} />
                </button>
              )}
            </div>

            {/* 3 Metrics Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              {activeDivision.metrics.map((m, idx) => (
                <div key={idx} className="bg-[#11151F] p-4 rounded border border-white/5 space-y-1">
                  <div className="text-[10px] text-neutral-500 uppercase">{m.label}</div>
                  <div className="text-lg font-bold text-white font-mono mt-0.5">{m.value}</div>
                  <div className="text-[10px] text-[#68D391]">Institutional Benchmark Certified</div>
                </div>
              ))}
            </div>
          </div>

          {/* LEVEL 4: INTERFACING CAMPUS & REVENUE NETWORK FOOTER */}
          <div className="pt-2 border-t border-white/5 grid sm:grid-cols-3 gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#68D391] shrink-0" />
              <span>400+ North American Varsity Network Campuses</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#68D391] shrink-0" />
              <span>Smart-Contract Escrow & Title IX Geofencing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#68D391] shrink-0" />
              <span>Consolidated Master Media Sponsorship Agreements</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
