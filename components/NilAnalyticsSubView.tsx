import React, { useState, useMemo, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { 
  TrendingUp, 
  BarChart3, 
  Layers, 
  Trophy, 
  DollarSign, 
  Award, 
  Building2, 
  Calendar, 
  Filter, 
  ArrowUpRight, 
  Info, 
  Download,
  Users,
  ShieldCheck,
  Zap,
  PieChart,
  Eye,
  Hash,
  ArrowUpDown,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NilLiquidityTrendChart } from './NilLiquidityTrendChart';
import { NilMarketSignals } from './NilMarketSignals';

// --- DATA STRUCTURES ---

export interface MonthlyDataPoint {
  month: string;      // e.g. 'Oct 24'
  fullMonth: string;  // e.g. 'October 2024'
  year: string;
  // Sports Liquidity ($ in Millions)
  digitalSports: number;
  football: number;
  womensSports: number;
  mensBasketball: number;
  olympicSports: number;
  // Sports Deal Counts
  digitalSports_deals: number;
  football_deals: number;
  womensSports_deals: number;
  mensBasketball_deals: number;
  olympicSports_deals: number;
  // Conferences Liquidity ($ in Millions)
  sec: number;
  bigTen: number;
  digitalLeagues: number;
  big12: number;
  acc: number;
  // Conferences Deal Counts
  sec_deals: number;
  bigTen_deals: number;
  digitalLeagues_deals: number;
  big12_deals: number;
  acc_deals: number;
  // Totals
  totalLiquidity: number;
  totalDeals: number;
}

// 24 Consecutive Months of Detailed Historical and Trajectory NIL Growth
export const MONTHLY_NIL_DATA: MonthlyDataPoint[] = [
  {
    month: 'Oct 24', fullMonth: 'October 2024', year: '2024',
    digitalSports: 0.82, football: 1.15, womensSports: 0.38, mensBasketball: 0.32, olympicSports: 0.15,
    digitalSports_deals: 154, football_deals: 92, womensSports_deals: 68, mensBasketball_deals: 36, olympicSports_deals: 48,
    sec: 0.84, bigTen: 0.76, digitalLeagues: 0.48, big12: 0.42, acc: 0.32,
    sec_deals: 88, bigTen_deals: 82, digitalLeagues_deals: 112, big12_deals: 64, acc_deals: 52,
    totalLiquidity: 2.82, totalDeals: 398
  },
  {
    month: 'Nov 24', fullMonth: 'November 2024', year: '2024',
    digitalSports: 0.89, football: 1.28, womensSports: 0.42, mensBasketball: 0.45, olympicSports: 0.16,
    digitalSports_deals: 168, football_deals: 102, womensSports_deals: 74, mensBasketball_deals: 48, olympicSports_deals: 50,
    sec: 0.96, bigTen: 0.88, digitalLeagues: 0.54, big12: 0.46, acc: 0.36,
    sec_deals: 98, bigTen_deals: 92, digitalLeagues_deals: 122, big12_deals: 72, acc_deals: 58,
    totalLiquidity: 3.20, totalDeals: 442
  },
  {
    month: 'Dec 24', fullMonth: 'December 2024', year: '2024',
    digitalSports: 0.95, football: 1.05, womensSports: 0.48, mensBasketball: 0.58, olympicSports: 0.18,
    digitalSports_deals: 178, football_deals: 82, womensSports_deals: 84, mensBasketball_deals: 62, olympicSports_deals: 54,
    sec: 0.94, bigTen: 0.86, digitalLeagues: 0.60, big12: 0.48, acc: 0.36,
    sec_deals: 94, bigTen_deals: 88, digitalLeagues_deals: 136, big12_deals: 76, acc_deals: 66,
    totalLiquidity: 3.24, totalDeals: 460
  },
  {
    month: 'Jan 25', fullMonth: 'January 2025', year: '2025',
    digitalSports: 1.02, football: 0.85, womensSports: 0.54, mensBasketball: 0.65, olympicSports: 0.20,
    digitalSports_deals: 190, football_deals: 65, womensSports_deals: 92, mensBasketball_deals: 70, olympicSports_deals: 58,
    sec: 0.92, bigTen: 0.84, digitalLeagues: 0.68, big12: 0.46, acc: 0.36,
    sec_deals: 92, bigTen_deals: 86, digitalLeagues_deals: 152, big12_deals: 75, acc_deals: 70,
    totalLiquidity: 3.26, totalDeals: 475
  },
  {
    month: 'Feb 25', fullMonth: 'February 2025', year: '2025',
    digitalSports: 1.08, football: 0.72, womensSports: 0.62, mensBasketball: 0.72, olympicSports: 0.22,
    digitalSports_deals: 202, football_deals: 55, womensSports_deals: 104, mensBasketball_deals: 76, olympicSports_deals: 62,
    sec: 0.95, bigTen: 0.88, digitalLeagues: 0.72, big12: 0.45, acc: 0.36,
    sec_deals: 96, bigTen_deals: 90, digitalLeagues_deals: 160, big12_deals: 78, acc_deals: 75,
    totalLiquidity: 3.36, totalDeals: 499
  },
  {
    month: 'Mar 25', fullMonth: 'March 2025', year: '2025',
    digitalSports: 1.18, football: 0.65, womensSports: 0.78, mensBasketball: 0.88, olympicSports: 0.25,
    digitalSports_deals: 220, football_deals: 48, womensSports_deals: 130, mensBasketball_deals: 92, olympicSports_deals: 68,
    sec: 1.05, bigTen: 0.98, digitalLeagues: 0.82, big12: 0.51, acc: 0.38,
    sec_deals: 106, bigTen_deals: 102, digitalLeagues_deals: 182, big12_deals: 88, acc_deals: 80,
    totalLiquidity: 3.74, totalDeals: 558
  },
  {
    month: 'Apr 25', fullMonth: 'April 2025', year: '2025',
    digitalSports: 1.25, football: 0.78, womensSports: 0.60, mensBasketball: 0.52, olympicSports: 0.28,
    digitalSports_deals: 232, football_deals: 58, womensSports_deals: 98, mensBasketball_deals: 52, olympicSports_deals: 75,
    sec: 0.98, bigTen: 0.92, digitalLeagues: 0.85, big12: 0.42, acc: 0.26,
    sec_deals: 100, bigTen_deals: 94, digitalLeagues_deals: 190, big12_deals: 72, acc_deals: 59,
    totalLiquidity: 3.43, totalDeals: 515
  },
  {
    month: 'May 25', fullMonth: 'May 2025', year: '2025',
    digitalSports: 1.32, football: 0.82, womensSports: 0.52, mensBasketball: 0.46, olympicSports: 0.32,
    digitalSports_deals: 245, football_deals: 62, womensSports_deals: 86, mensBasketball_deals: 46, olympicSports_deals: 82,
    sec: 0.96, bigTen: 0.90, digitalLeagues: 0.92, big12: 0.40, acc: 0.26,
    sec_deals: 98, bigTen_deals: 92, digitalLeagues_deals: 202, big12_deals: 70, acc_deals: 59,
    totalLiquidity: 3.44, totalDeals: 521
  },
  {
    month: 'Jun 25', fullMonth: 'June 2025', year: '2025',
    digitalSports: 1.28, football: 0.95, womensSports: 0.48, mensBasketball: 0.42, olympicSports: 0.35,
    digitalSports_deals: 238, football_deals: 72, womensSports_deals: 80, mensBasketball_deals: 42, olympicSports_deals: 88,
    sec: 0.98, bigTen: 0.92, digitalLeagues: 0.90, big12: 0.41, acc: 0.27,
    sec_deals: 98, bigTen_deals: 92, digitalLeagues_deals: 198, big12_deals: 72, acc_deals: 60,
    totalLiquidity: 3.48, totalDeals: 520
  },
  {
    month: 'Jul 25', fullMonth: 'July 2025', year: '2025',
    digitalSports: 1.35, football: 1.10, womensSports: 0.50, mensBasketball: 0.45, olympicSports: 0.28,
    digitalSports_deals: 250, football_deals: 85, womensSports_deals: 82, mensBasketball_deals: 45, olympicSports_deals: 70,
    sec: 1.05, bigTen: 0.98, digitalLeagues: 0.96, big12: 0.42, acc: 0.27,
    sec_deals: 104, bigTen_deals: 98, digitalLeagues_deals: 210, big12_deals: 68, acc_deals: 52,
    totalLiquidity: 3.68, totalDeals: 532
  },
  {
    month: 'Aug 25', fullMonth: 'August 2025', year: '2025',
    digitalSports: 1.42, football: 1.45, womensSports: 0.58, mensBasketball: 0.50, olympicSports: 0.25,
    digitalSports_deals: 264, football_deals: 115, womensSports_deals: 95, mensBasketball_deals: 50, olympicSports_deals: 64,
    sec: 1.25, bigTen: 1.18, digitalLeagues: 1.02, big12: 0.45, acc: 0.30,
    sec_deals: 122, bigTen_deals: 118, digitalLeagues_deals: 224, big12_deals: 70, acc_deals: 54,
    totalLiquidity: 4.20, totalDeals: 588
  },
  {
    month: 'Sep 25', fullMonth: 'September 2025', year: '2025',
    digitalSports: 1.48, football: 1.58, womensSports: 0.64, mensBasketball: 0.52, olympicSports: 0.24,
    digitalSports_deals: 275, football_deals: 126, womensSports_deals: 105, mensBasketball_deals: 52, olympicSports_deals: 60,
    sec: 1.34, bigTen: 1.25, digitalLeagues: 1.08, big12: 0.47, acc: 0.32,
    sec_deals: 130, bigTen_deals: 124, digitalLeagues_deals: 235, big12_deals: 74, acc_deals: 55,
    totalLiquidity: 4.46, totalDeals: 618
  },
  {
    month: 'Oct 25', fullMonth: 'October 2025', year: '2025',
    digitalSports: 1.55, football: 1.62, womensSports: 0.70, mensBasketball: 0.56, olympicSports: 0.26,
    digitalSports_deals: 288, football_deals: 130, womensSports_deals: 114, mensBasketball_deals: 56, olympicSports_deals: 65,
    sec: 1.42, bigTen: 1.32, digitalLeagues: 1.12, big12: 0.50, acc: 0.33,
    sec_deals: 138, bigTen_deals: 130, digitalLeagues_deals: 245, big12_deals: 80, acc_deals: 60,
    totalLiquidity: 4.69, totalDeals: 653
  },
  {
    month: 'Nov 25', fullMonth: 'November 2025', year: '2025',
    digitalSports: 1.62, football: 1.70, womensSports: 0.76, mensBasketball: 0.68, olympicSports: 0.28,
    digitalSports_deals: 302, football_deals: 138, womensSports_deals: 122, mensBasketball_deals: 68, olympicSports_deals: 70,
    sec: 1.52, bigTen: 1.42, digitalLeagues: 1.18, big12: 0.56, acc: 0.36,
    sec_deals: 148, bigTen_deals: 140, digitalLeagues_deals: 258, big12_deals: 88, acc_deals: 66,
    totalLiquidity: 5.04, totalDeals: 700
  },
  {
    month: 'Dec 25', fullMonth: 'December 2025', year: '2025',
    digitalSports: 1.68, football: 1.45, womensSports: 0.82, mensBasketball: 0.78, olympicSports: 0.28,
    digitalSports_deals: 312, football_deals: 115, womensSports_deals: 132, mensBasketball_deals: 78, olympicSports_deals: 68,
    sec: 1.48, bigTen: 1.38, digitalLeagues: 1.25, big12: 0.54, acc: 0.36,
    sec_deals: 142, bigTen_deals: 136, digitalLeagues_deals: 270, big12_deals: 86, acc_deals: 71,
    totalLiquidity: 5.01, totalDeals: 705
  },
  {
    month: 'Jan 26', fullMonth: 'January 2026', year: '2026',
    digitalSports: 1.72, football: 1.15, womensSports: 0.88, mensBasketball: 0.85, olympicSports: 0.30,
    digitalSports_deals: 320, football_deals: 90, womensSports_deals: 140, mensBasketball_deals: 85, olympicSports_deals: 72,
    sec: 1.45, bigTen: 1.35, digitalLeagues: 1.28, big12: 0.48, acc: 0.34,
    sec_deals: 140, bigTen_deals: 132, digitalLeagues_deals: 280, big12_deals: 80, acc_deals: 75,
    totalLiquidity: 4.90, totalDeals: 707
  },
  {
    month: 'Feb 26', fullMonth: 'February 2026', year: '2026',
    digitalSports: 1.78, football: 0.95, womensSports: 0.95, mensBasketball: 0.92, olympicSports: 0.32,
    digitalSports_deals: 332, football_deals: 75, womensSports_deals: 150, mensBasketball_deals: 92, olympicSports_deals: 78,
    sec: 1.44, bigTen: 1.35, digitalLeagues: 1.32, big12: 0.46, acc: 0.35,
    sec_deals: 138, bigTen_deals: 132, digitalLeagues_deals: 295, big12_deals: 82, acc_deals: 80,
    totalLiquidity: 4.92, totalDeals: 727
  },
  {
    month: 'Mar 26', fullMonth: 'March 2026', year: '2026',
    digitalSports: 1.88, football: 0.88, womensSports: 1.15, mensBasketball: 1.05, olympicSports: 0.35,
    digitalSports_deals: 350, football_deals: 68, womensSports_deals: 180, mensBasketball_deals: 105, olympicSports_deals: 85,
    sec: 1.55, bigTen: 1.46, digitalLeagues: 1.42, big12: 0.52, acc: 0.36,
    sec_deals: 150, bigTen_deals: 142, digitalLeagues_deals: 312, big12_deals: 96, acc_deals: 88,
    totalLiquidity: 5.31, totalDeals: 788
  },
  {
    month: 'Apr 26', fullMonth: 'April 2026', year: '2026',
    digitalSports: 1.95, football: 1.02, womensSports: 0.85, mensBasketball: 0.68, olympicSports: 0.38,
    digitalSports_deals: 362, football_deals: 80, womensSports_deals: 135, mensBasketball_deals: 68, olympicSports_deals: 92,
    sec: 1.42, bigTen: 1.35, digitalLeagues: 1.40, big12: 0.44, acc: 0.27,
    sec_deals: 140, bigTen_deals: 135, digitalLeagues_deals: 310, big12_deals: 84, acc_deals: 68,
    totalLiquidity: 4.88, totalDeals: 737
  },
  {
    month: 'May 26', fullMonth: 'May 2026', year: '2026',
    digitalSports: 2.05, football: 1.10, womensSports: 0.78, mensBasketball: 0.62, olympicSports: 0.42,
    digitalSports_deals: 380, football_deals: 86, womensSports_deals: 124, mensBasketball_deals: 62, olympicSports_deals: 102,
    sec: 1.44, bigTen: 1.36, digitalLeagues: 1.48, big12: 0.42, acc: 0.27,
    sec_deals: 142, bigTen_deals: 136, digitalLeagues_deals: 326, big12_deals: 80, acc_deals: 70,
    totalLiquidity: 4.97, totalDeals: 754
  },
  {
    month: 'Jun 26', fullMonth: 'June 2026', year: '2026',
    digitalSports: 2.02, football: 1.25, womensSports: 0.75, mensBasketball: 0.58, olympicSports: 0.45,
    digitalSports_deals: 375, football_deals: 98, womensSports_deals: 118, mensBasketball_deals: 58, olympicSports_deals: 108,
    sec: 1.48, bigTen: 1.38, digitalLeagues: 1.46, big12: 0.45, acc: 0.28,
    sec_deals: 144, bigTen_deals: 138, digitalLeagues_deals: 322, big12_deals: 82, acc_deals: 71,
    totalLiquidity: 5.05, totalDeals: 757
  },
  {
    month: 'Jul 26', fullMonth: 'July 2026', year: '2026',
    digitalSports: 2.12, football: 1.45, womensSports: 0.78, mensBasketball: 0.62, olympicSports: 0.38,
    digitalSports_deals: 392, football_deals: 114, womensSports_deals: 122, mensBasketball_deals: 62, olympicSports_deals: 90,
    sec: 1.58, bigTen: 1.48, digitalLeagues: 1.52, big12: 0.48, acc: 0.29,
    sec_deals: 152, bigTen_deals: 146, digitalLeagues_deals: 334, big12_deals: 86, acc_deals: 62,
    totalLiquidity: 5.35, totalDeals: 780
  },
  {
    month: 'Aug 26', fullMonth: 'August 2026', year: '2026',
    digitalSports: 2.22, football: 1.85, womensSports: 0.88, mensBasketball: 0.68, olympicSports: 0.35,
    digitalSports_deals: 410, football_deals: 145, womensSports_deals: 138, mensBasketball_deals: 68, olympicSports_deals: 84,
    sec: 1.78, bigTen: 1.68, digitalLeagues: 1.62, big12: 0.56, acc: 0.34,
    sec_deals: 168, bigTen_deals: 162, digitalLeagues_deals: 355, big12_deals: 95, acc_deals: 65,
    totalLiquidity: 5.98, totalDeals: 845
  },
  {
    month: 'Sep 26', fullMonth: 'September 2026', year: '2026',
    digitalSports: 2.35, football: 2.05, womensSports: 0.98, mensBasketball: 0.72, olympicSports: 0.35,
    digitalSports_deals: 435, football_deals: 160, womensSports_deals: 152, mensBasketball_deals: 72, olympicSports_deals: 84,
    sec: 1.92, bigTen: 1.82, digitalLeagues: 1.74, big12: 0.60, acc: 0.37,
    sec_deals: 180, bigTen_deals: 174, digitalLeagues_deals: 375, big12_deals: 102, acc_deals: 72,
    totalLiquidity: 6.45, totalDeals: 903
  }
];

// Trend Sorting Options for Header Control
export type TrendSortOption = 'Most Growth' | 'Highest Liquidity' | 'Alphabetical';

// Series Styling Configuration
export const SPORT_SERIES_CONFIG = [
  { key: 'digitalSports', label: 'Collegiate Digital Sports & Esports', color: '#C89B3C', highlightColor: '#F5C869', dealKey: 'digitalSports_deals', growthCagr: 87.4 },
  { key: 'football', label: 'College Football (FBS)', color: '#38BDF8', highlightColor: '#7DD3FC', dealKey: 'football_deals', growthCagr: 48.6 },
  { key: 'womensSports', label: "Women's Basketball, Gymnastics & Olympic", color: '#EC4899', highlightColor: '#F472B6', dealKey: 'womensSports_deals', growthCagr: 77.9 },
  { key: 'mensBasketball', label: "Men's Basketball (Division 1)", color: '#A855F7', highlightColor: '#C084FC', dealKey: 'mensBasketball_deals', growthCagr: 49.2 },
  { key: 'olympicSports', label: 'Baseball, Soccer & Track', color: '#68D391', highlightColor: '#9AE6B4', dealKey: 'olympicSports_deals', growthCagr: 63.4 }
];

export const CONFERENCE_SERIES_CONFIG = [
  { key: 'sec', label: 'SEC (Southeastern Conference)', color: '#EAB308', highlightColor: '#FDE047', dealKey: 'sec_deals', growthCagr: 52.4 },
  { key: 'bigTen', label: 'Big Ten Conference', color: '#38BDF8', highlightColor: '#7DD3FC', dealKey: 'bigTen_deals', growthCagr: 58.2 },
  { key: 'digitalLeagues', label: 'Collegiate Esports Conferences (NACE/NECC)', color: '#C89B3C', highlightColor: '#F5C869', dealKey: 'digitalLeagues_deals', growthCagr: 114.6 },
  { key: 'big12', label: 'Big 12 Conference', color: '#F97316', highlightColor: '#FB923C', dealKey: 'big12_deals', growthCagr: 46.8 },
  { key: 'acc', label: 'ACC (Atlantic Coast Conference)', color: '#A855F7', highlightColor: '#C084FC', dealKey: 'acc_deals', growthCagr: 41.2 }
];

// Detailed Sport Analytics Breakdown
interface SportDetailRow {
  sport: string;
  volume2021: string;
  volume2026: string;
  fiveYearCagr: string;
  avgDealSize: string;
  activeAthletes: number;
  topSponsorSector: string;
  sharePct: string;
  color: string;
}

const SPORT_DETAIL_ROWS: SportDetailRow[] = [
  {
    sport: 'Collegiate Digital Sports & Esports',
    volume2021: '$0.8M',
    volume2026: '$18.5M',
    fiveYearCagr: '+87.4%',
    avgDealSize: '$5,800',
    activeAthletes: 4200,
    topSponsorSector: 'Hardware, Energy Drinks & Telecom',
    sharePct: '34.6%',
    color: '#C89B3C'
  },
  {
    sport: 'College Football (FBS)',
    volume2021: '$2.1M',
    volume2026: '$15.2M',
    fiveYearCagr: '+48.6%',
    avgDealSize: '$12,400',
    activeAthletes: 1850,
    topSponsorSector: 'Automotive, Banking & QSR',
    sharePct: '28.4%',
    color: '#38BDF8'
  },
  {
    sport: "Women's Basketball, Gymnastics & Olympic",
    volume2021: '$0.5M',
    volume2026: '$8.9M',
    fiveYearCagr: '+77.9%',
    avgDealSize: '$6,200',
    activeAthletes: 2100,
    topSponsorSector: 'Beauty, Athleisure & Nutrition',
    sharePct: '16.6%',
    color: '#EC4899'
  },
  {
    sport: "Men's Basketball (Division 1)",
    volume2021: '$1.0M',
    volume2026: '$7.4M',
    fiveYearCagr: '+49.2%',
    avgDealSize: '$9,800',
    activeAthletes: 980,
    topSponsorSector: 'Footwear, Sports Apparel & Hydration',
    sharePct: '13.8%',
    color: '#A855F7'
  },
  {
    sport: 'Baseball, Soccer & Track',
    volume2021: '$0.3M',
    volume2026: '$3.5M',
    fiveYearCagr: '+63.4%',
    avgDealSize: '$3,100',
    activeAthletes: 1450,
    topSponsorSector: 'Local Services & Equipment',
    sharePct: '6.5%',
    color: '#68D391'
  }
];

// Conference Detail Breakdown
interface ConferenceDetailRow {
  conference: string;
  totalVolume: string;
  avgPerCampus: string;
  memberCampuses: number;
  collectiveMaturity: string;
  topDealType: string;
  fiveYearCagr: string;
  color: string;
}

const CONFERENCE_DETAIL_ROWS: ConferenceDetailRow[] = [
  {
    conference: 'Collegiate Digital Conferences (NACE/NECC)',
    totalVolume: '$10.4M',
    avgPerCampus: '$346K',
    memberCampuses: 30,
    collectiveMaturity: 'Rapidly Consolidating',
    topDealType: 'Direct Commercial Escrow & Streaming',
    fiveYearCagr: '+114.6%',
    color: '#C89B3C'
  },
  {
    conference: 'Big Ten Conference',
    totalVolume: '$13.8M',
    avgPerCampus: '$766K',
    memberCampuses: 18,
    collectiveMaturity: 'Tier-1 High Liquidity',
    topDealType: 'National Media & Tech Brand Deals',
    fiveYearCagr: '+58.2%',
    color: '#38BDF8'
  },
  {
    conference: 'SEC (Southeastern Conference)',
    totalVolume: '$14.5M',
    avgPerCampus: '$906K',
    memberCampuses: 16,
    collectiveMaturity: 'Tier-1 High Liquidity',
    topDealType: 'Institutional Collectives & Auto',
    fiveYearCagr: '+52.4%',
    color: '#EAB308'
  },
  {
    conference: 'Big 12 Conference',
    totalVolume: '$8.6M',
    avgPerCampus: '$537K',
    memberCampuses: 16,
    collectiveMaturity: 'Established Regional',
    topDealType: 'Regional QSR & Beverage Pools',
    fiveYearCagr: '+46.8%',
    color: '#F97316'
  },
  {
    conference: 'ACC (Atlantic Coast Conference)',
    totalVolume: '$6.2M',
    avgPerCampus: '$364K',
    memberCampuses: 17,
    collectiveMaturity: 'Moderate Collective',
    topDealType: 'Health, Banking & Merch Royalties',
    fiveYearCagr: '+41.2%',
    color: '#A855F7'
  }
];

interface HoverTooltipState {
  visible: boolean;
  x: number;
  y: number;
  month: string;
  fullMonth: string;
  segmentKey: string;
  segmentLabel: string;
  segmentColor: string;
  segmentLiquidity: number;
  segmentDealCount: number;
  segmentSharePct: number;
  avgDealValue: number;
  totalMonthLiquidity: number;
  totalMonthDealCount: number;
}

export const NilAnalyticsSubView: React.FC<{
  onInspectRadar?: () => void;
  onOpenCalculator?: () => void;
}> = ({ onInspectRadar, onOpenCalculator }) => {
  const [breakdownType, setBreakdownType] = useState<'sport' | 'conference'>('sport');
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number>(MONTHLY_NIL_DATA.length - 1);
  const [activeHighlightKey, setActiveHighlightKey] = useState<string | null>(null);
  const [trendSortOption, setTrendSortOption] = useState<TrendSortOption>('Most Growth');
  
  // Floating Tooltip State
  const [tooltip, setTooltip] = useState<HoverTooltipState>({
    visible: false,
    x: 0,
    y: 0,
    month: '',
    fullMonth: '',
    segmentKey: '',
    segmentLabel: '',
    segmentColor: '',
    segmentLiquidity: 0,
    segmentDealCount: 0,
    segmentSharePct: 0,
    avgDealValue: 0,
    totalMonthLiquidity: 0,
    totalMonthDealCount: 0
  });

  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active configuration based on breakdown
  const seriesConfig = breakdownType === 'sport' ? SPORT_SERIES_CONFIG : CONFERENCE_SERIES_CONFIG;
  const currentData = MONTHLY_NIL_DATA;

  // Render D3 Stacked Area Chart with Precision Segment Tooltip
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const containerWidth = containerRef.current.clientWidth || 800;
    const height = 380;
    const margin = { top: 28, right: 36, bottom: 44, left: 56 };
    const width = containerWidth - margin.left - margin.right;

    svg.attr('viewBox', `0 0 ${containerWidth} ${height}`);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Keys to stack
    const keys = seriesConfig.map((s) => s.key);

    // D3 Stack layout
    const stack = d3.stack<MonthlyDataPoint>()
      .keys(keys)
      .value((d, key) => (d as any)[key] || 0)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackedSeries = stack(currentData);

    // Scales
    const months = currentData.map((d) => d.month);
    const xScale = d3.scalePoint<string>()
      .domain(months)
      .range([0, width])
      .padding(0.04);

    const maxVal = d3.max(stackedSeries, (layer) => d3.max(layer, (d) => d[1])) || 7;
    const yScale = d3.scaleLinear()
      .domain([0, maxVal * 1.1])
      .range([height - margin.top - margin.bottom, 0]);

    // Area Generator with smooth monotone curve
    const areaGenerator = d3.area<any>()
      .x((d) => xScale(d.data.month) || 0)
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]))
      .curve(d3.curveMonotoneX);

    // Defs for rich gradients
    const defs = svg.append('defs');
    seriesConfig.forEach((series) => {
      const gradient = defs.append('linearGradient')
        .attr('id', `area-gradient-${series.key}`)
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '0%').attr('y2', '100%');

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', series.color)
        .attr('stop-opacity', 0.9);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', series.color)
        .attr('stop-opacity', 0.22);
    });

    // Grid lines (horizontal)
    const yAxisTicks = yScale.ticks(6);
    g.selectAll('.grid-line')
      .data(yAxisTicks)
      .enter()
      .append('line')
      .attr('class', 'grid-line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', 'rgba(255, 255, 255, 0.07)')
      .attr('stroke-dasharray', '3 3');

    // Draw stacked layers
    const layers = g.selectAll('.stacked-layer')
      .data(stackedSeries)
      .enter()
      .append('path')
      .attr('class', 'stacked-layer')
      .attr('d', areaGenerator)
      .attr('fill', (d) => `url(#area-gradient-${d.key})`)
      .attr('stroke', (d) => {
        const conf = seriesConfig.find((s) => s.key === d.key);
        return conf ? conf.color : '#C89B3C';
      })
      .attr('stroke-width', (d) => {
        if (tooltip.visible && tooltip.segmentKey === d.key) return 2.5;
        if (activeHighlightKey === d.key) return 2.2;
        return 1.4;
      })
      .attr('opacity', (d) => {
        if (tooltip.visible && tooltip.segmentKey === d.key) return 1;
        if (activeHighlightKey) return activeHighlightKey === d.key ? 1 : 0.2;
        if (tooltip.visible) return 0.65;
        return 0.88;
      })
      .style('transition', 'opacity 0.15s ease, stroke-width 0.15s ease')
      .style('cursor', 'crosshair');

    // Bottom Axis (Months - display every 2nd or 3rd month label for high readability)
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

    // Left Axis ($M Monthly Liquidity)
    const yAxis = d3.axisLeft(yScale)
      .ticks(6)
      .tickFormat((d) => `$${d}M`)
      .tickSize(0)
      .tickPadding(8);

    const yAxisGroup = g.append('g').call(yAxis);
    yAxisGroup.select('.domain').remove();
    yAxisGroup.selectAll('text')
      .attr('fill', '#9CA3AF')
      .attr('font-size', '10px')
      .attr('font-family', 'monospace');

    // Indicator Elements (Vertical Line & Cursor Point)
    const trackingLine = g.append('line')
      .attr('class', 'tracking-line')
      .attr('stroke', '#C89B3C')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4 3')
      .style('opacity', 0)
      .style('pointer-events', 'none');

    const trackingCircle = g.append('circle')
      .attr('class', 'tracking-circle')
      .attr('r', 5)
      .attr('fill', '#C89B3C')
      .attr('stroke', '#090A0C')
      .attr('stroke-width', 2.5)
      .style('opacity', 0)
      .style('pointer-events', 'none');

    // Interactive Invisible Overlay for Mouse/Pointer Event Tracking
    const overlay = g.append('rect')
      .attr('width', width)
      .attr('height', height - margin.top - margin.bottom)
      .attr('fill', 'transparent')
      .style('cursor', 'crosshair');

    // Pointer move handler
    const handlePointerMove = (event: any) => {
      const [mouseX, mouseY] = d3.pointer(event, g.node());

      // 1. Find closest month
      let closestMonthIndex = 0;
      let minDistance = Infinity;

      months.forEach((m, idx) => {
        const x = xScale(m) || 0;
        const dist = Math.abs(x - mouseX);
        if (dist < minDistance) {
          minDistance = dist;
          closestMonthIndex = idx;
        }
      });

      const activeMonthData = currentData[closestMonthIndex];
      const activeMonthStr = activeMonthData.month;
      const xPos = xScale(activeMonthStr) || 0;

      setHoveredMonthIndex(closestMonthIndex);

      // 2. Determine which stacked segment contains mouseY
      let targetSegmentKey = seriesConfig[0].key;
      let targetYCenter = mouseY;
      let segmentFound = false;

      // Check each layer from top to bottom
      for (const layer of stackedSeries) {
        const point = layer[closestMonthIndex];
        if (!point) continue;

        const yBottom = yScale(point[0]);
        const yTop = yScale(point[1]);

        if (mouseY <= yBottom && mouseY >= yTop) {
          targetSegmentKey = layer.key;
          targetYCenter = (yTop + yBottom) / 2;
          segmentFound = true;
          break;
        }
      }

      // If mouse is above all stacks or below, pick top or bottom segment
      if (!segmentFound) {
        const topLayer = stackedSeries[stackedSeries.length - 1];
        const topPoint = topLayer[closestMonthIndex];
        if (mouseY < yScale(topPoint[1])) {
          targetSegmentKey = topLayer.key;
          targetYCenter = yScale(topPoint[1]);
        } else {
          targetSegmentKey = stackedSeries[0].key;
          targetYCenter = yScale(stackedSeries[0][closestMonthIndex][0]);
        }
      }

      const conf = seriesConfig.find((s) => s.key === targetSegmentKey) || seriesConfig[0];
      const segLiquidity = (activeMonthData as any)[targetSegmentKey] as number;
      const segDeals = (activeMonthData as any)[conf.dealKey] as number;
      const sharePct = (segLiquidity / activeMonthData.totalLiquidity) * 100;
      const avgDeal = segDeals > 0 ? (segLiquidity * 1000000) / segDeals : 0;

      // Update vertical line and circle
      trackingLine
        .attr('x1', xPos)
        .attr('x2', xPos)
        .attr('y1', 0)
        .attr('y2', height - margin.top - margin.bottom)
        .style('opacity', 0.9);

      trackingCircle
        .attr('cx', xPos)
        .attr('cy', targetYCenter)
        .attr('fill', conf.color)
        .style('opacity', 1);

      // Container bounding box for tooltip placement
      const containerRect = containerRef.current?.getBoundingClientRect();
      const clientX = event.clientX;
      const clientY = event.clientY;

      const relativeX = containerRect ? clientX - containerRect.left : xPos + margin.left;
      const relativeY = containerRect ? clientY - containerRect.top : targetYCenter + margin.top;

      setTooltip({
        visible: true,
        x: relativeX,
        y: relativeY,
        month: activeMonthData.month,
        fullMonth: activeMonthData.fullMonth,
        segmentKey: targetSegmentKey,
        segmentLabel: conf.label,
        segmentColor: conf.color,
        segmentLiquidity: segLiquidity,
        segmentDealCount: segDeals,
        segmentSharePct: sharePct,
        avgDealValue: avgDeal,
        totalMonthLiquidity: activeMonthData.totalLiquidity,
        totalMonthDealCount: activeMonthData.totalDeals
      });
    };

    const handlePointerLeave = () => {
      trackingLine.style('opacity', 0);
      trackingCircle.style('opacity', 0);
      setTooltip((prev) => ({ ...prev, visible: false }));
    };

    overlay
      .on('pointermove', handlePointerMove)
      .on('pointerleave', handlePointerLeave);

  }, [breakdownType, currentData, seriesConfig, activeHighlightKey, tooltip.visible, tooltip.segmentKey]);

  // Selected snapshot month
  const activeMonth = currentData[hoveredMonthIndex] || currentData[currentData.length - 1];

  // Sorted snapshot series indicators (for the 5 cards in snapshot breakdown)
  const sortedSnapshotSeries = useMemo(() => {
    return [...seriesConfig].sort((a, b) => {
      if (trendSortOption === 'Most Growth') {
        return (b.growthCagr || 0) - (a.growthCagr || 0);
      }
      if (trendSortOption === 'Highest Liquidity') {
        const valA = ((activeMonth as any)[a.key] as number) || 0;
        const valB = ((activeMonth as any)[b.key] as number) || 0;
        return valB - valA;
      }
      if (trendSortOption === 'Alphabetical') {
        return a.label.localeCompare(b.label);
      }
      return 0;
    });
  }, [seriesConfig, trendSortOption, activeMonth]);

  // Sorted sport rows for Longitudinal Matrix
  const sortedSportRows = useMemo(() => {
    return [...SPORT_DETAIL_ROWS].sort((a, b) => {
      if (trendSortOption === 'Most Growth') {
        const cagrA = parseFloat(a.fiveYearCagr.replace(/[^\d.-]/g, '')) || 0;
        const cagrB = parseFloat(b.fiveYearCagr.replace(/[^\d.-]/g, '')) || 0;
        return cagrB - cagrA;
      }
      if (trendSortOption === 'Highest Liquidity') {
        const volA = parseFloat(a.volume2026.replace(/[^\d.-]/g, '')) || 0;
        const volB = parseFloat(b.volume2026.replace(/[^\d.-]/g, '')) || 0;
        return volB - volA;
      }
      if (trendSortOption === 'Alphabetical') {
        return a.sport.localeCompare(b.sport);
      }
      return 0;
    });
  }, [trendSortOption]);

  // Sorted conference rows for Longitudinal Matrix
  const sortedConferenceRows = useMemo(() => {
    return [...CONFERENCE_DETAIL_ROWS].sort((a, b) => {
      if (trendSortOption === 'Most Growth') {
        const cagrA = parseFloat(a.fiveYearCagr.replace(/[^\d.-]/g, '')) || 0;
        const cagrB = parseFloat(b.fiveYearCagr.replace(/[^\d.-]/g, '')) || 0;
        return cagrB - cagrA;
      }
      if (trendSortOption === 'Highest Liquidity') {
        const volA = parseFloat(a.totalVolume.replace(/[^\d.-]/g, '')) || 0;
        const volB = parseFloat(b.totalVolume.replace(/[^\d.-]/g, '')) || 0;
        return volB - volA;
      }
      if (trendSortOption === 'Alphabetical') {
        return a.conference.localeCompare(b.conference);
      }
      return 0;
    });
  }, [trendSortOption]);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Context & Sub-view Summary Banner */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-48 bg-[#C89B3C]/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C89B3C] uppercase tracking-wider font-semibold">
              <BarChart3 size={15} />
              <span>Quantitative NIL Diligence · 24-Month Granular Run-Rate</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Intercollegiate NIL Deal & Liquidity Distribution
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Real-time audit tracking of student-athlete commercial deal counts, monthly liquidity volume, 
              and institutional collective velocity across varsity sports and collegiate conferences.
            </p>
            {onOpenCalculator && (
              <div className="pt-1">
                <button
                  onClick={onOpenCalculator}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#181F2E] hover:bg-[#222B3F] border border-[#C89B3C]/40 text-[#E8C98B] hover:text-white text-xs font-mono transition-all cursor-pointer shadow-sm group"
                >
                  <DollarSign size={13} className="text-[#C89B3C]" />
                  <span>Launch Individual Athlete Earnings Calculator</span>
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono shrink-0">
            <div className="bg-[#090C12] p-3 rounded-lg border border-white/5">
              <div className="text-[10px] text-neutral-500 uppercase">Current Month Liquidity</div>
              <div className="text-lg font-bold text-[#E8C98B] mt-0.5">${activeMonth.totalLiquidity.toFixed(2)}M</div>
              <div className="text-[10px] text-[#68D391] font-semibold mt-0.5">{activeMonth.fullMonth}</div>
            </div>

            <div className="bg-[#090C12] p-3 rounded-lg border border-white/5">
              <div className="text-[10px] text-neutral-500 uppercase">Monthly Verified Deals</div>
              <div className="text-lg font-bold text-white mt-0.5">{activeMonth.totalDeals.toLocaleString()}</div>
              <div className="text-[10px] text-[#38BDF8] mt-0.5">Clearinghouse Certified</div>
            </div>

            <div className="bg-[#090C12] p-3 rounded-lg border border-white/5 col-span-2 sm:col-span-1">
              <div className="text-[10px] text-neutral-500 uppercase">Average Deal Yield</div>
              <div className="text-lg font-bold text-[#68D391] mt-0.5">
                ${Math.round((activeMonth.totalLiquidity * 1000000) / activeMonth.totalDeals).toLocaleString()}
              </div>
              <div className="text-[10px] text-neutral-400 mt-0.5">Per-Athlete Monthly Yield</div>
            </div>
          </div>
        </div>

        {/* View Header Sorting Dropdown Bar for Market Trend Indicators */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <SlidersHorizontal size={14} className="text-[#C89B3C]" />
            <span className="font-semibold text-white">Market Trend Indicator Ordering:</span>
            <span className="text-neutral-500 hidden md:inline">Sort all sector distributions & longitudinal indicators</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <label htmlFor="trend-sort-dropdown" className="text-neutral-400 flex items-center gap-1.5 whitespace-nowrap">
              <ArrowUpDown size={13} className="text-[#C89B3C]" />
              <span>Sort Indicators By:</span>
            </label>
            <div className="relative">
              <select
                id="trend-sort-dropdown"
                value={trendSortOption}
                onChange={(e) => setTrendSortOption(e.target.value as TrendSortOption)}
                className="bg-[#090C12] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-1.5 text-xs text-white font-mono cursor-pointer transition-colors shadow-sm pr-7 appearance-none"
              >
                <option value="Most Growth">Most Growth</option>
                <option value="Highest Liquidity">Highest Liquidity</option>
                <option value="Alphabetical">Alphabetical</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#C89B3C]">
                <ChevronDown size={13} />
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1 bg-[#090C12] p-0.5 rounded border border-white/10">
              <button
                type="button"
                onClick={() => setTrendSortOption('Most Growth')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                  trendSortOption === 'Most Growth'
                    ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Growth
              </button>
              <button
                type="button"
                onClick={() => setTrendSortOption('Highest Liquidity')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                  trendSortOption === 'Highest Liquidity'
                    ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Liquidity
              </button>
              <button
                type="button"
                onClick={() => setTrendSortOption('Alphabetical')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                  trendSortOption === 'Alphabetical'
                    ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                A–Z
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-xl p-6 sm:p-8 space-y-6 shadow-xl relative">
        
        {/* Chart Header & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div className="space-y-1">
            <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Layers size={14} /> Monthly Stacked Area Liquidity & Contract Frequency
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              {breakdownType === 'sport' 
                ? 'Historical NIL Liquidity & Deal Counts by Collegiate Sport' 
                : 'Historical NIL Liquidity & Deal Counts by Conference & Circuit'}
            </h3>
          </div>

          {/* Toggle between Sport vs Conference Breakdown */}
          <div className="flex items-center bg-[#090C12] p-1 rounded-sm border border-white/10 text-xs font-mono shrink-0">
            <button
              onClick={() => { setBreakdownType('sport'); setActiveHighlightKey(null); }}
              className={`px-3.5 py-1.5 rounded transition-all cursor-pointer ${
                breakdownType === 'sport'
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Breakdown by Sport
            </button>
            <button
              onClick={() => { setBreakdownType('conference'); setActiveHighlightKey(null); }}
              className={`px-3.5 py-1.5 rounded transition-all cursor-pointer ${
                breakdownType === 'conference'
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Breakdown by Conference
            </button>
          </div>
        </div>

        {/* Legend Pills with Click-to-Highlight Capability */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-neutral-500 text-[11px] mr-1">Filter Series:</span>
            {seriesConfig.map((series) => (
              <button
                key={series.key}
                onClick={() => setActiveHighlightKey(activeHighlightKey === series.key ? null : series.key)}
                className={`px-2.5 py-1 rounded-sm border transition-all flex items-center gap-1.5 cursor-pointer text-[11px] ${
                  activeHighlightKey === series.key
                    ? 'bg-white/15 text-white font-bold border-white/30 shadow-sm'
                    : 'bg-[#151922] text-neutral-300 hover:text-white border-white/5'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: series.color }} />
                <span>{series.label}</span>
              </button>
            ))}
            {activeHighlightKey && (
              <button
                onClick={() => setActiveHighlightKey(null)}
                className="text-[10px] text-[#C89B3C] hover:underline ml-2"
              >
                Reset Filter
              </button>
            )}
          </div>

          <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
            <Eye size={12} className="text-[#C89B3C]" />
            <span>Hover segments for monthly deal counts & liquidity</span>
          </div>
        </div>

        {/* D3 Stacked Area Chart Container with Floating Precision Tooltip */}
        <div 
          ref={containerRef} 
          className="w-full relative overflow-hidden bg-[#0A0D14] p-4 rounded-lg border border-white/5"
        >
          <svg ref={svgRef} className="w-full h-auto block select-none" />

          {/* Precision Floating Glassmorphic Tooltip */}
          {tooltip.visible && (
            <div
              className="absolute pointer-events-none z-30 transition-all duration-75"
              style={{
                left: `${Math.min(Math.max(tooltip.x + 16, 12), (containerRef.current?.clientWidth || 800) - 270)}px`,
                top: `${Math.min(Math.max(tooltip.y - 120, 12), 200)}px`
              }}
            >
              <div className="bg-[#0C0F17]/95 backdrop-blur-md border border-[#C89B3C]/50 rounded-lg p-3.5 shadow-2xl space-y-2.5 w-64 text-xs font-mono">
                
                {/* Tooltip Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <div className="text-white font-bold font-sans text-xs">
                    {tooltip.fullMonth}
                  </div>
                  <span className="text-[10px] text-[#C89B3C] uppercase font-bold tracking-wider">
                    NIL Audit
                  </span>
                </div>

                {/* Hovered Segment Details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-white font-semibold truncate">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: tooltip.segmentColor }} 
                    />
                    <span className="truncate">{tooltip.segmentLabel}</span>
                  </div>

                  {/* Liquidity & Deal Count Highlights */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-[#121622] p-2 rounded border border-white/5">
                      <div className="text-[9px] text-neutral-400 uppercase">Segment Liquidity</div>
                      <div className="text-sm font-bold text-[#E8C98B] mt-0.5">
                        ${tooltip.segmentLiquidity.toFixed(2)}M
                      </div>
                      <div className="text-[9px] text-neutral-500">
                        {tooltip.segmentSharePct.toFixed(1)}% of Month
                      </div>
                    </div>

                    <div className="bg-[#121622] p-2 rounded border border-white/5">
                      <div className="text-[9px] text-neutral-400 uppercase">Precise Deals</div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        {tooltip.segmentDealCount.toLocaleString()} deals
                      </div>
                      <div className="text-[9px] text-[#68D391]">
                        ${Math.round(tooltip.avgDealValue).toLocaleString()} avg
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Month Overview Footer */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-400">
                  <span>Month Total:</span>
                  <span className="text-white font-bold">
                    ${tooltip.totalMonthLiquidity.toFixed(2)}M · {tooltip.totalMonthDealCount.toLocaleString()} deals
                  </span>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Year/Month Cross-Section Detail Strip */}
        <div className="bg-[#0D1017] p-5 rounded-lg border border-white/[0.06] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono border-b border-white/5 pb-2.5 gap-2">
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-[#C89B3C]" />
              <span className="text-neutral-400">Monthly Snapshot Breakdown:</span>
              <strong className="text-white text-sm">{activeMonth.fullMonth}</strong>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1">
                <span>Ordering:</span>
                <span className="text-[#E8C98B] font-semibold">{trendSortOption}</span>
              </span>
              <div className="text-[#68D391] font-bold text-xs sm:text-sm">
                Total Liquidity: ${(activeMonth.totalLiquidity).toFixed(2)}M · {activeMonth.totalDeals.toLocaleString()} Verified Deals
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-mono">
            {sortedSnapshotSeries.map((s) => {
              const val = (activeMonth as any)[s.key] as number;
              const deals = (activeMonth as any)[s.dealKey] as number;
              const share = ((val / activeMonth.totalLiquidity) * 100).toFixed(1);
              const isTargeted = tooltip.visible && tooltip.segmentKey === s.key;

              return (
                <div 
                  key={s.key} 
                  className={`p-2.5 rounded border transition-all ${
                    isTargeted 
                      ? 'bg-[#181F2E] border-[#C89B3C]' 
                      : 'bg-[#121620] border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="truncate">{s.label}</span>
                  </div>
                  <div className="text-white font-bold text-sm mt-1">${val.toFixed(2)}M</div>
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-0.5">
                    <span>{deals.toLocaleString()} deals</span>
                    <span className="text-neutral-500">{share}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Market Signal Intelligence: Emerging Growth Sectors & Inflow Momentum */}
      <NilMarketSignals onInspectRadar={onInspectRadar} externalSortOption={trendSortOption} />

      {/* Historical 24-Month Liquidity Growth & Deal Volume Trend Line Chart */}
      <NilLiquidityTrendChart />

      {/* Tabular Deep-Dive Breakdown */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Trophy size={14} /> Comprehensive Longitudinal Matrix
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              {breakdownType === 'sport' ? 'Collegiate Sports NIL Metrics & Growth Rates' : 'Intercollegiate Conference Capital Allocation'}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
            <span className="text-[11px] px-2.5 py-0.5 rounded bg-[#161B26] border border-white/5 text-[#E8C98B] font-semibold">
              Sorted by: {trendSortOption}
            </span>
            <span>Source: Institutional NIL Clearinghouse & Fiduciary Disclosures</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          {breakdownType === 'sport' ? (
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="pb-3 pr-4">Collegiate Sport</th>
                  <th className="pb-3 px-4">2021 Volume</th>
                  <th className="pb-3 px-4">2026 Proj.</th>
                  <th className="pb-3 px-4">5-Yr CAGR</th>
                  <th className="pb-3 px-4">Avg Deal</th>
                  <th className="pb-3 px-4">Roster Reach</th>
                  <th className="pb-3 px-4">Primary Brand Sector</th>
                  <th className="pb-3 pl-4 text-right">Market Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {sortedSportRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 pr-4 font-semibold text-white font-display flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                      <span>{row.sport}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-400">{row.volume2021}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#E8C98B]">{row.volume2026}</td>
                    <td className="py-3.5 px-4 font-mono text-[#68D391] font-semibold">{row.fiveYearCagr}</td>
                    <td className="py-3.5 px-4 font-mono text-neutral-300">{row.avgDealSize}</td>
                    <td className="py-3.5 px-4 font-mono text-neutral-400">{row.activeAthletes.toLocaleString()} ath</td>
                    <td className="py-3.5 px-4 text-neutral-300 text-[11px]">{row.topSponsorSector}</td>
                    <td className="py-3.5 pl-4 font-mono font-bold text-right text-white">{row.sharePct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="pb-3 pr-4">Conference / Circuit</th>
                  <th className="pb-3 px-4">2026 Annual Pool</th>
                  <th className="pb-3 px-4">5-Yr Growth Rate</th>
                  <th className="pb-3 px-4">Avg Per Campus</th>
                  <th className="pb-3 px-4">Campuses</th>
                  <th className="pb-3 px-4">Collective Maturity Level</th>
                  <th className="pb-3 pl-4">Predominant Sponsorship Inflow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {sortedConferenceRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 pr-4 font-semibold text-white font-display flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                      <span>{row.conference}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#E8C98B]">{row.totalVolume}</td>
                    <td className="py-3.5 px-4 font-mono text-[#68D391] font-semibold">{row.fiveYearCagr}</td>
                    <td className="py-3.5 px-4 font-mono text-[#68D391]">{row.avgPerCampus}</td>
                    <td className="py-3.5 px-4 font-mono text-neutral-300">{row.memberCampuses} Universities</td>
                    <td className="py-3.5 px-4 font-mono text-neutral-400 text-[11px]">{row.collectiveMaturity}</td>
                    <td className="py-3.5 pl-4 text-neutral-300 text-[11px]">{row.topDealType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Fiduciary Footnote */}
        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#68D391]" />
            <span>All deal counts and monthly liquidities are audited via certified institutional smart-contract escrows.</span>
          </div>
          <div className="text-neutral-500 text-[11px]">
            Audited Q3 2026 · Intercollegiate Fiduciary Clearing
          </div>
        </div>

      </div>

    </div>
  );
};
