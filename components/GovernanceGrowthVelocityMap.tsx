import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import usAtlas from 'us-atlas/states-10m.json';
import { 
  Building2, 
  MapPin, 
  Scale, 
  ShieldCheck, 
  FileCheck2, 
  Clock, 
  TrendingUp, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Layers, 
  ArrowUpRight, 
  Compass, 
  Sparkles,
  Users,
  Award,
  Filter
} from 'lucide-react';

export type ExpansionWave = 'All' | 'Wave 1' | 'Wave 2' | 'Wave 3' | 'Wave 4';
export type PipelineStage = 'All' | 'Stage 3: Sanctioned' | 'Stage 2: Board Review' | 'Stage 1: Charter Diligence';

export interface PipelineUniversity {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  region: 'Atlantic' | 'Heartland' | 'Southern' | 'Western';
  wave: 'Wave 1' | 'Wave 2' | 'Wave 3' | 'Wave 4';
  waveTiming: string;
  conference: string;
  coordinates: [number, number]; // [lon, lat]
  stage: 'Stage 3: Sanctioned' | 'Stage 2: Board Review' | 'Stage 1: Charter Diligence';
  stageProgress: number; // 0 to 100
  complianceReadiness: number; // 0 to 100
  keyStakeholders: string;
  projectedAthletes: number;
  projectedAnnualNil: string;
  primaryDivision: string;
  governanceClearances: {
    titleIX: boolean;
    nilEscrow: boolean;
    trademarkCharter: boolean;
    broadcastPermit: boolean;
  };
  notes: string;
  priorityHub?: boolean;
}

// 22 Curated High-Yield Pipeline Universities
const PIPELINE_UNIVERSITIES: PipelineUniversity[] = [
  // --- WAVE 1: ATLANTIC & IVY CORRIDOR (Q1-Q2 2026) ---
  {
    id: 'upenn',
    name: 'University of Pennsylvania',
    shortName: 'Penn',
    city: 'Philadelphia',
    state: 'PA',
    region: 'Atlantic',
    wave: 'Wave 1',
    waveTiming: 'Q1-Q2 2026',
    conference: 'Ivy League',
    coordinates: [-75.1932, 39.9522],
    stage: 'Stage 3: Sanctioned',
    stageProgress: 94,
    complianceReadiness: 98,
    keyStakeholders: 'Dr. Alanna Vance (Vice Provost Athletics), Ivy League Compliance Council',
    projectedAthletes: 72,
    projectedAnnualNil: '$420,000',
    primaryDivision: 'CEX Varsity & CRL Sim Racing',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: true,
      broadcastPermit: true
    },
    notes: 'Wharton Sports Analytics & Franklin Field Digital Staging Pavilion ratification complete.',
    priorityHub: true
  },
  {
    id: 'uva',
    name: 'University of Virginia',
    shortName: 'UVA',
    city: 'Charlottesville',
    state: 'VA',
    region: 'Atlantic',
    wave: 'Wave 1',
    waveTiming: 'Q1-Q2 2026',
    conference: 'ACC',
    coordinates: [-78.5080, 38.0336],
    stage: 'Stage 3: Sanctioned',
    stageProgress: 90,
    complianceReadiness: 96,
    keyStakeholders: 'Athletic Directorate, ACC Media Rights Governance Board',
    projectedAthletes: 64,
    projectedAnnualNil: '$380,000',
    primaryDivision: 'CEX Varsity & Broadcast TV',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: true,
      broadcastPermit: true
    },
    notes: 'Approved for direct linear syndication into College Esports TV network.'
  },
  {
    id: 'georgetown',
    name: 'Georgetown University',
    shortName: 'Georgetown',
    city: 'Washington',
    state: 'DC',
    region: 'Atlantic',
    wave: 'Wave 1',
    waveTiming: 'Q1-Q2 2026',
    conference: 'Big East',
    coordinates: [-77.0723, 38.9072],
    stage: 'Stage 2: Board Review',
    stageProgress: 75,
    complianceReadiness: 92,
    keyStakeholders: 'Board of Regents, Intercollegiate Athletic Committee',
    projectedAthletes: 48,
    projectedAnnualNil: '$290,000',
    primaryDivision: 'CEX Varsity & NIL Syndicate',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: true,
      broadcastPermit: false
    },
    notes: 'Finalizing campus broadcast fiber uplink and federal compliance audit.'
  },
  {
    id: 'duke',
    name: 'Duke University',
    shortName: 'Duke',
    city: 'Durham',
    state: 'NC',
    region: 'Atlantic',
    wave: 'Wave 1',
    waveTiming: 'Q1-Q2 2026',
    conference: 'ACC',
    coordinates: [-78.9382, 36.0014],
    stage: 'Stage 2: Board Review',
    stageProgress: 68,
    complianceReadiness: 89,
    keyStakeholders: 'Cameron Athletics Board, Innovation & Technology Transfer Office',
    projectedAthletes: 58,
    projectedAnnualNil: '$350,000',
    primaryDivision: 'CDRL Drones & CEX Varsity',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: false,
      broadcastPermit: true
    },
    notes: 'Pratt School of Engineering co-charter for CDRL flight drone corridor testing.'
  },
  {
    id: 'clemson',
    name: 'Clemson University',
    shortName: 'Clemson',
    city: 'Clemson',
    state: 'SC',
    region: 'Atlantic',
    wave: 'Wave 1',
    waveTiming: 'Q1-Q2 2026',
    conference: 'ACC',
    coordinates: [-82.8374, 34.6834],
    stage: 'Stage 1: Charter Diligence',
    stageProgress: 42,
    complianceReadiness: 81,
    keyStakeholders: 'Clemson Athletic Administration, Student Governance Senate',
    projectedAthletes: 52,
    projectedAnnualNil: '$310,000',
    primaryDivision: 'CEX Varsity & CRL Sim Racing',
    governanceClearances: {
      titleIX: true,
      nilEscrow: false,
      trademarkCharter: false,
      broadcastPermit: false
    },
    notes: 'Initial MOU signed; student-athlete NIL escrow framework undergoing legal counsel review.'
  },

  // --- WAVE 2: HEARTLAND & BIG TEN EXPANSION (Q3-Q4 2026) ---
  {
    id: 'msu',
    name: 'Michigan State University',
    shortName: 'Michigan State',
    city: 'East Lansing',
    state: 'MI',
    region: 'Heartland',
    wave: 'Wave 2',
    waveTiming: 'Q3-Q4 2026',
    conference: 'Big Ten',
    coordinates: [-84.4839, 42.7018],
    stage: 'Stage 3: Sanctioned',
    stageProgress: 92,
    complianceReadiness: 97,
    keyStakeholders: 'Spartan Athletic Council, ComArtSci Dean of Media Studies',
    projectedAthletes: 95,
    projectedAnnualNil: '$560,000',
    primaryDivision: 'CEX Varsity, CRL Sim Racing & Broadcast TV',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: true,
      broadcastPermit: true
    },
    notes: 'Breslin Student Events Center retrofitted for regional championship staging.',
    priorityHub: true
  },
  {
    id: 'iowa',
    name: 'University of Iowa',
    shortName: 'Iowa',
    city: 'Iowa City',
    state: 'IA',
    region: 'Heartland',
    wave: 'Wave 2',
    waveTiming: 'Q3-Q4 2026',
    conference: 'Big Ten',
    coordinates: [-91.5360, 41.6627],
    stage: 'Stage 3: Sanctioned',
    stageProgress: 88,
    complianceReadiness: 94,
    keyStakeholders: 'Hawkeye Athletic Board, UI Hospitals & Clinics Sports Medicine',
    projectedAthletes: 68,
    projectedAnnualNil: '$390,000',
    primaryDivision: 'CEX Varsity & College Esports Med',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: true,
      broadcastPermit: true
    },
    notes: 'Pioneering College Esports Med clinical ergonomics protocol with varsity roster.'
  },
  {
    id: 'uchicago',
    name: 'University of Chicago',
    shortName: 'UChicago',
    city: 'Chicago',
    state: 'IL',
    region: 'Heartland',
    wave: 'Wave 2',
    waveTiming: 'Q3-Q4 2026',
    conference: 'UAA',
    coordinates: [-87.5987, 41.7886],
    stage: 'Stage 2: Board Review',
    stageProgress: 70,
    complianceReadiness: 91,
    keyStakeholders: 'Office of the Provost, Booth School of Business Sports Institute',
    projectedAthletes: 44,
    projectedAnnualNil: '$270,000',
    primaryDivision: 'College Esports Biz AI & CEX Varsity',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: true,
      broadcastPermit: false
    },
    notes: 'Partnering on algorithmic athletic department roster ROI and monetization modeling.'
  },
  {
    id: 'marquette',
    name: 'Marquette University',
    shortName: 'Marquette',
    city: 'Milwaukee',
    state: 'WI',
    region: 'Heartland',
    wave: 'Wave 2',
    waveTiming: 'Q3-Q4 2026',
    conference: 'Big East',
    coordinates: [-87.9304, 43.0387],
    stage: 'Stage 2: Board Review',
    stageProgress: 65,
    complianceReadiness: 88,
    keyStakeholders: 'Intercollegiate Athletics Board, Diederich College of Comm',
    projectedAthletes: 54,
    projectedAnnualNil: '$310,000',
    primaryDivision: 'CEX Varsity & Broadcast TV',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: false,
      broadcastPermit: true
    },
    notes: 'Drafting multi-camera arena feed integration for Big East digital championship.'
  },
  {
    id: 'nebraska',
    name: 'University of Nebraska-Lincoln',
    shortName: 'Nebraska',
    city: 'Lincoln',
    state: 'NE',
    region: 'Heartland',
    wave: 'Wave 2',
    waveTiming: 'Q3-Q4 2026',
    conference: 'Big Ten',
    coordinates: [-96.7005, 40.8202],
    stage: 'Stage 1: Charter Diligence',
    stageProgress: 45,
    complianceReadiness: 83,
    keyStakeholders: 'Husker Athletic Senate, Agricultural Engineering Faculty',
    projectedAthletes: 62,
    projectedAnnualNil: '$340,000',
    primaryDivision: 'CDRL Drones & CEX Varsity',
    governanceClearances: {
      titleIX: true,
      nilEscrow: false,
      trademarkCharter: false,
      broadcastPermit: false
    },
    notes: 'Developing high-acreage agricultural drone obstacle testing courses for CDRL.'
  },

  // --- WAVE 3: SOUTHERN BELT & SEC ACCELERATION (2027) ---
  {
    id: 'auburn',
    name: 'Auburn University',
    shortName: 'Auburn',
    city: 'Auburn',
    state: 'AL',
    region: 'Southern',
    wave: 'Wave 3',
    waveTiming: 'Q1-Q2 2027',
    conference: 'SEC',
    coordinates: [-85.4808, 32.6010],
    stage: 'Stage 3: Sanctioned',
    stageProgress: 86,
    complianceReadiness: 95,
    keyStakeholders: 'Auburn Athletics Board, Samuel Ginn College of Engineering',
    projectedAthletes: 82,
    projectedAnnualNil: '$480,000',
    primaryDivision: 'CRL Sim Racing & CEX Varsity',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: true,
      broadcastPermit: true
    },
    notes: 'Motorsports telemetry lab sanctioned with regional automotive supplier sponsorships.',
    priorityHub: true
  },
  {
    id: 'arkansas',
    name: 'University of Arkansas',
    shortName: 'Arkansas',
    city: 'Fayetteville',
    state: 'AR',
    region: 'Southern',
    wave: 'Wave 3',
    waveTiming: 'Q1-Q2 2027',
    conference: 'SEC',
    coordinates: [-94.1719, 36.0687],
    stage: 'Stage 2: Board Review',
    stageProgress: 72,
    complianceReadiness: 90,
    keyStakeholders: 'Razorback Athletics Directorate, Walton College of Business',
    projectedAthletes: 74,
    projectedAnnualNil: '$430,000',
    primaryDivision: 'CEX Varsity & NIL Syndicate',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: true,
      broadcastPermit: false
    },
    notes: 'Retail enterprise sponsorship syndication with Fortune 1 consumer brands.'
  },
  {
    id: 'kentucky',
    name: 'University of Kentucky',
    shortName: 'Kentucky',
    city: 'Lexington',
    state: 'KY',
    region: 'Southern',
    wave: 'Wave 3',
    waveTiming: 'Q1-Q2 2027',
    conference: 'SEC',
    coordinates: [-84.5040, 38.0307],
    stage: 'Stage 2: Board Review',
    stageProgress: 66,
    complianceReadiness: 87,
    keyStakeholders: 'Wildcat Athletic Foundation, UK Healthcare Sports Science',
    projectedAthletes: 80,
    projectedAnnualNil: '$450,000',
    primaryDivision: 'CEX Varsity & College Esports Med',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: false,
      broadcastPermit: true
    },
    notes: 'Forming joint repetitive strain injury (RSI) prevention clinic on campus.'
  },
  {
    id: 'baylor',
    name: 'Baylor University',
    shortName: 'Baylor',
    city: 'Waco',
    state: 'TX',
    region: 'Southern',
    wave: 'Wave 3',
    waveTiming: 'Q3-Q4 2027',
    conference: 'Big 12',
    coordinates: [-97.1141, 31.5469],
    stage: 'Stage 2: Board Review',
    stageProgress: 60,
    complianceReadiness: 86,
    keyStakeholders: 'Board of Trustees, Hankamer School of Business',
    projectedAthletes: 58,
    projectedAnnualNil: '$330,000',
    primaryDivision: 'CEX Varsity & NIL Syndicate',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: false,
      broadcastPermit: false
    },
    notes: 'Drafting charter for Texas intercollegiate championship invitational.'
  },
  {
    id: 'olemiss',
    name: 'University of Mississippi',
    shortName: 'Ole Miss',
    city: 'Oxford',
    state: 'MS',
    region: 'Southern',
    wave: 'Wave 3',
    waveTiming: 'Q3-Q4 2027',
    conference: 'SEC',
    coordinates: [-89.5381, 34.3647],
    stage: 'Stage 1: Charter Diligence',
    stageProgress: 38,
    complianceReadiness: 78,
    keyStakeholders: 'Rebel Athletic Committee, Student Affairs Directorate',
    projectedAthletes: 50,
    projectedAnnualNil: '$280,000',
    primaryDivision: 'CEX Varsity',
    governanceClearances: {
      titleIX: true,
      nilEscrow: false,
      trademarkCharter: false,
      broadcastPermit: false
    },
    notes: 'State disclosure and student-athlete NIL contract validation underway.'
  },
  {
    id: 'texastech',
    name: 'Texas Tech University',
    shortName: 'Texas Tech',
    city: 'Lubbock',
    state: 'TX',
    region: 'Southern',
    wave: 'Wave 3',
    waveTiming: 'Q3-Q4 2027',
    conference: 'Big 12',
    coordinates: [-101.8746, 33.5843],
    stage: 'Stage 1: Charter Diligence',
    stageProgress: 35,
    complianceReadiness: 79,
    keyStakeholders: 'Red Raider Athletic Council, College of Engineering',
    projectedAthletes: 64,
    projectedAnnualNil: '$360,000',
    primaryDivision: 'CDRL Drones & CEX Varsity',
    governanceClearances: {
      titleIX: true,
      nilEscrow: false,
      trademarkCharter: false,
      broadcastPermit: false
    },
    notes: 'West Texas wide-radius drone telemetry zone exploration.'
  },

  // --- WAVE 4: WESTERN & PACIFIC RIM FRONTIER (2027-2028) ---
  {
    id: 'ucsd',
    name: 'University of California, San Diego',
    shortName: 'UC San Diego',
    city: 'La Jolla',
    state: 'CA',
    region: 'Western',
    wave: 'Wave 4',
    waveTiming: 'Q1-Q2 2028',
    conference: 'Big West',
    coordinates: [-117.2340, 32.8801],
    stage: 'Stage 3: Sanctioned',
    stageProgress: 88,
    complianceReadiness: 96,
    keyStakeholders: 'Triton Athletics, Qualcomm Institute / Calit2',
    projectedAthletes: 86,
    projectedAnnualNil: '$510,000',
    primaryDivision: 'CEX Varsity, CDRL Drones & CRL Sim Racing',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: true,
      broadcastPermit: true
    },
    notes: 'Direct fiber link to Los Angeles media broadcast facility; San Diego flagship hub.',
    priorityHub: true
  },
  {
    id: 'arizona',
    name: 'University of Arizona',
    shortName: 'Arizona',
    city: 'Tucson',
    state: 'AZ',
    region: 'Western',
    wave: 'Wave 4',
    waveTiming: 'Q1-Q2 2028',
    conference: 'Big 12',
    coordinates: [-110.9501, 32.2319],
    stage: 'Stage 2: Board Review',
    stageProgress: 68,
    complianceReadiness: 89,
    keyStakeholders: 'Wildcat Athletic Board, School of Information',
    projectedAthletes: 76,
    projectedAnnualNil: '$440,000',
    primaryDivision: 'CEX Varsity & Broadcast TV',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: true,
      broadcastPermit: false
    },
    notes: 'Regional desert rivalry bracket expansion with Arizona State flagship hub.'
  },
  {
    id: 'wsu',
    name: 'Washington State University',
    shortName: 'Washington State',
    city: 'Pullman',
    state: 'WA',
    region: 'Western',
    wave: 'Wave 4',
    waveTiming: 'Q2-Q3 2028',
    conference: 'Pac-12',
    coordinates: [-117.1661, 46.7325],
    stage: 'Stage 2: Board Review',
    stageProgress: 62,
    complianceReadiness: 85,
    keyStakeholders: 'Cougar Athletics, Edward R. Murrow College of Communication',
    projectedAthletes: 60,
    projectedAnnualNil: '$350,000',
    primaryDivision: 'CEX Varsity & Broadcast TV',
    governanceClearances: {
      titleIX: true,
      nilEscrow: true,
      trademarkCharter: false,
      broadcastPermit: true
    },
    notes: 'Pacific Northwest collegiate broadcasting syndication pact.'
  },
  {
    id: 'unlv',
    name: 'University of Nevada, Las Vegas',
    shortName: 'UNLV',
    city: 'Las Vegas',
    state: 'NV',
    region: 'Western',
    wave: 'Wave 4',
    waveTiming: 'Q3-Q4 2028',
    conference: 'Mountain West',
    coordinates: [-115.1406, 36.1075],
    stage: 'Stage 1: Charter Diligence',
    stageProgress: 40,
    complianceReadiness: 82,
    keyStakeholders: 'Rebel Athletic Directorate, International Gaming Institute',
    projectedAthletes: 85,
    projectedAnnualNil: '$540,000',
    primaryDivision: 'CEX Varsity & Live Arena Production',
    governanceClearances: {
      titleIX: true,
      nilEscrow: false,
      trademarkCharter: false,
      broadcastPermit: false
    },
    notes: 'Evaluating Thomas & Mack Center for flagship western invitational tournament venue.'
  },
  {
    id: 'boisestate',
    name: 'Boise State University',
    shortName: 'Boise State',
    city: 'Boise',
    state: 'ID',
    region: 'Western',
    wave: 'Wave 4',
    waveTiming: 'Q3-Q4 2028',
    conference: 'Mountain West',
    coordinates: [-116.2001, 43.6029],
    stage: 'Stage 1: Charter Diligence',
    stageProgress: 36,
    complianceReadiness: 80,
    keyStakeholders: 'Bronco Athletic Senate, GIMM (Games, Interactive Media, Mobile) Lab',
    projectedAthletes: 55,
    projectedAnnualNil: '$320,000',
    primaryDivision: 'CEX Varsity & CRL Sim Racing',
    governanceClearances: {
      titleIX: true,
      nilEscrow: false,
      trademarkCharter: false,
      broadcastPermit: false
    },
    notes: 'Regional mountain conference charter and broadcast uplink exploration.'
  }
];

// Operational Anchor Hubs that serve as expansion origins for growth vectors
const EXPANSION_ANCHORS = [
  { id: 'boston', name: 'Boston Flagship (Emerson)', coords: [-71.0667, 42.3524] as [number, number] },
  { id: 'columbus', name: 'Midwest Flagship (Ohio State)', coords: [-83.0145, 39.9998] as [number, number] },
  { id: 'austin', name: 'Southern Flagship (UT Austin)', coords: [-97.7431, 30.2849] as [number, number] },
  { id: 'losangeles', name: 'Western Flagship (USC)', coords: [-118.2851, 34.0224] as [number, number] }
];

export const GovernanceGrowthVelocityMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  // Filter States
  const [selectedWave, setSelectedWave] = useState<ExpansionWave>('All');
  const [selectedStage, setSelectedStage] = useState<PipelineStage>('All');
  const [selectedUni, setSelectedUni] = useState<PipelineUniversity | null>(PIPELINE_UNIVERSITIES[0]);
  const [hoveredUni, setHoveredUni] = useState<PipelineUniversity | null>(null);
  const [showVelocityVectors, setShowVelocityVectors] = useState(true);

  // Filtered Universities
  const filteredUniversities = useMemo(() => {
    return PIPELINE_UNIVERSITIES.filter((uni) => {
      const matchWave = selectedWave === 'All' || uni.wave === selectedWave;
      const matchStage = selectedStage === 'All' || uni.stage === selectedStage;
      return matchWave && matchStage;
    });
  }, [selectedWave, selectedStage]);

  // Aggregated Pipeline Metrics
  const pipelineMetrics = useMemo(() => {
    const totalPipeline = filteredUniversities.length;
    const avgReadiness = Math.round(
      filteredUniversities.reduce((acc, u) => acc + u.complianceReadiness, 0) / (totalPipeline || 1)
    );
    const sanctionedCount = filteredUniversities.filter(u => u.stage === 'Stage 3: Sanctioned').length;
    const totalProjectedAthletes = filteredUniversities.reduce((acc, u) => acc + u.projectedAthletes, 0);

    return {
      totalPipeline,
      avgReadiness,
      sanctionedCount,
      totalProjectedAthletes
    };
  }, [filteredUniversities]);

  // Albers Projection for Map
  const projection = useMemo(() => {
    return d3.geoAlbersUsa()
      .scale(1200)
      .translate([480, 290]);
  }, []);

  const pathGenerator = useMemo(() => {
    return d3.geoPath().projection(projection);
  }, [projection]);

  // Extract US States from TopoJSON
  const statesFeatures = useMemo(() => {
    // @ts-ignore
    const states = topojson.feature(usAtlas, usAtlas.objects.states) as any;
    return states ? states.features : [];
  }, []);

  // Growth Velocity Directional Vector Curves from nearest Anchor to Pipeline Nodes
  const velocityVectors = useMemo(() => {
    return filteredUniversities.map((uni) => {
      // Find closest anchor hub by longitude proximity
      const anchor = EXPANSION_ANCHORS.reduce((closest, curr) => {
        const dist = Math.abs(curr.coords[0] - uni.coordinates[0]);
        const closestDist = Math.abs(closest.coords[0] - uni.coordinates[0]);
        return dist < closestDist ? curr : closest;
      }, EXPANSION_ANCHORS[0]);

      const source = projection(anchor.coords);
      const target = projection(uni.coordinates);
      if (!source || !target) return null;

      const dx = target[0] - source[0];
      const dy = target[1] - source[1];
      const cx = source[0] + dx * 0.5 - dy * 0.2;
      const cy = source[1] + dy * 0.5 + dx * 0.2;

      return {
        id: `vec-${uni.id}`,
        d: `M ${source[0]} ${source[1]} Q ${cx} ${cy} ${target[0]} ${target[1]}`,
        uni
      };
    }).filter(Boolean);
  }, [filteredUniversities, projection]);

  // Regional Zoom Coordinates
  const waveZoomCenters: Record<ExpansionWave, { scale: number; x: number; y: number }> = {
    All: { scale: 1, x: 0, y: 0 },
    'Wave 1': { scale: 1.85, x: -390, y: -90 },
    'Wave 2': { scale: 1.9, x: -330, y: -160 },
    'Wave 3': { scale: 1.8, x: -290, y: -290 },
    'Wave 4': { scale: 1.75, x: -90, y: -190 }
  };

  // Setup D3 Zoom on Map
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = 960;
    const height = 580;
    const svg = d3.select(svgRef.current);
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.9, 6])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', (event) => {
        if (gRef.current) {
          d3.select(gRef.current).attr('transform', event.transform.toString());
        }
      });

    svg.call(zoom);

    // Smooth pan/zoom when switching Waves
    const target = waveZoomCenters[selectedWave] || waveZoomCenters.All;
    svg.transition()
      .duration(700)
      .ease(d3.easeCubicOut)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(target.x, target.y).scale(target.scale)
      );
  }, [selectedWave]);

  const handleZoom = (factor: number) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(d3.zoom<SVGSVGElement, unknown>().scaleBy as any, factor);
  };

  const handleResetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    setSelectedWave('All');
    svg.transition().duration(500).call(d3.zoom<SVGSVGElement, unknown>().transform as any, d3.zoomIdentity);
  };

  // Color helper for stage
  const getStageColor = (stage: PipelineUniversity['stage']) => {
    switch (stage) {
      case 'Stage 3: Sanctioned':
        return '#68D391'; // Emerald Green
      case 'Stage 2: Board Review':
        return '#E8C98B'; // Sovereign Champagne Gold
      case 'Stage 1: Charter Diligence':
        return '#38BDF8'; // Cyan
      default:
        return '#C89B3C';
    }
  };

  return (
    <div className="bg-[#101319] border border-white/[0.09] rounded-xl p-6 lg:p-8 space-y-8 shadow-2xl relative overflow-hidden">
      
      {/* Subtle ambient gold glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C89B3C]/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Header bar: Title, Wave timeline badge, Compliance standard */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] animate-pulse"></span>
            <span>Strategic Expansion Architecture · 2026-2028 Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            Governance & Regional Growth Velocity Map
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed font-light">
            Interactive due-diligence map visualizing College Company's scheduled multi-phase university onboarding pipeline. 
            Tracks faculty senate approvals, Title IX equity reviews, state NIL escrow clearing, and conference sanctioning.
          </p>
        </div>

        {/* Aggregate KPI Strip */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="bg-[#141822] px-3.5 py-2 rounded-sm border border-white/10">
            <div className="text-[10px] text-neutral-500 uppercase">Pipeline Target Campuses</div>
            <div className="text-lg font-bold text-white">{pipelineMetrics.totalPipeline} Universities</div>
          </div>
          <div className="bg-[#141822] px-3.5 py-2 rounded-sm border border-white/10">
            <div className="text-[10px] text-neutral-500 uppercase">Avg Regulatory Clearance</div>
            <div className="text-lg font-bold text-[#68D391]">{pipelineMetrics.avgReadiness}% Ready</div>
          </div>
          <div className="bg-[#141822] px-3.5 py-2 rounded-sm border border-white/10">
            <div className="text-[10px] text-neutral-500 uppercase">Sanctioned for Onboarding</div>
            <div className="text-lg font-bold text-[#E8C98B]">{pipelineMetrics.sanctionedCount} Campuses</div>
          </div>
        </div>
      </div>

      {/* Filter Control Bar: Expansion Wave & Stage Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-[#0A0D12] p-4 rounded-lg border border-white/[0.08]">
        
        {/* Expansion Wave Selectors */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-neutral-500 uppercase mr-1 hidden sm:inline">Expansion Wave:</span>
          {(['All', 'Wave 1', 'Wave 2', 'Wave 3', 'Wave 4'] as const).map((wave) => (
            <button
              key={wave}
              onClick={() => setSelectedWave(wave)}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-all ${
                selectedWave === wave
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              {wave === 'All' 
                ? 'All Waves (2026-2028)' 
                : wave === 'Wave 1' 
                  ? 'Wave 1 (Atlantic 2026)' 
                  : wave === 'Wave 2' 
                    ? 'Wave 2 (Heartland 2026)' 
                    : wave === 'Wave 3' 
                      ? 'Wave 3 (Southern 2027)' 
                      : 'Wave 4 (Western 2028)'}
            </button>
          ))}
        </div>

        {/* Pipeline Stage Selectors */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-neutral-500 uppercase mr-1 hidden sm:inline">Stage:</span>
          {[
            { id: 'All', label: 'All Stages' },
            { id: 'Stage 3: Sanctioned', label: 'Stage 3 (Sanctioned)', color: '#68D391' },
            { id: 'Stage 2: Board Review', label: 'Stage 2 (Board Review)', color: '#E8C98B' },
            { id: 'Stage 1: Charter Diligence', label: 'Stage 1 (Diligence)', color: '#38BDF8' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedStage(st.id as PipelineStage)}
              className={`px-2.5 py-1 text-xs font-mono rounded-sm transition-all ${
                selectedStage === st.id
                  ? 'bg-white/15 text-white border border-white/30 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200 border border-transparent'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* View Controls & Velocity Vector Toggles */}
        <div className="flex items-center gap-2 self-end lg:self-auto">
          <button
            onClick={() => setShowVelocityVectors(!showVelocityVectors)}
            className={`px-2.5 py-1.5 text-xs font-mono rounded-sm border transition-colors flex items-center gap-1.5 ${
              showVelocityVectors 
                ? 'border-[#C89B3C]/50 text-[#E8C98B] bg-[#C89B3C]/10' 
                : 'border-white/10 text-neutral-400 hover:text-white'
            }`}
            title="Toggle Growth Velocity Directional Vectors"
          >
            <TrendingUp size={12} />
            <span className="hidden sm:inline">Velocity Vectors</span>
          </button>

          <div className="flex items-center bg-[#121620] border border-white/10 rounded-sm">
            <button
              onClick={() => handleZoom(1.3)}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <div className="w-[1px] h-3.5 bg-white/10"></div>
            <button
              onClick={() => handleZoom(0.77)}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <div className="w-[1px] h-3.5 bg-white/10"></div>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Reset View"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

      </div>

      {/* Main Map + Pipeline University Dossier Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Map Canvas: D3 Cartography */}
        <div 
          ref={containerRef}
          className="lg:col-span-8 bg-[#0A0D12] border border-white/10 rounded-xl overflow-hidden relative shadow-2xl min-h-[490px] sm:min-h-[550px] flex items-center justify-center select-none"
        >
          {/* Floating Stage Legend */}
          <div className="absolute top-4 left-4 z-10 bg-[#090C10]/90 backdrop-blur-md border border-white/10 p-3 rounded text-[11px] font-mono space-y-2 pointer-events-none">
            <div className="text-[10px] uppercase tracking-wider text-[#C89B3C] font-semibold flex items-center gap-1.5">
              <Scale size={11} /> Regulatory Clearance Stages
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#68D391] ring-2 ring-[#68D391]/30"></span>
              <span>Stage 3: Sanctioned & Cleared</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8C98B]"></span>
              <span>Stage 2: Athletic Board Review</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]"></span>
              <span>Stage 1: Charter Diligence</span>
            </div>
            <div className="pt-1 border-t border-white/10 flex items-center gap-2 text-neutral-400 text-[10px]">
              <span className="w-2 h-2 rounded-sm bg-neutral-600"></span>
              <span>Regional Operating Anchors</span>
            </div>
          </div>

          {/* Map Sub-indicator */}
          <div className="absolute bottom-4 left-4 z-10 text-[10px] font-mono text-neutral-500 bg-[#090C10]/85 px-2.5 py-1 rounded border border-white/5 pointer-events-none hidden sm:block">
            Click any university node to review institutional compliance clearance, Title IX status & board stakeholders
          </div>

          {/* SVG Map Canvas */}
          <svg
            ref={svgRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            style={{ minHeight: '530px' }}
          >
            <defs>
              {/* Velocity Vector Gradient */}
              <linearGradient id="velocityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C89B3C" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#E8C98B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#68D391" stopOpacity="0.2" />
              </linearGradient>

              {/* Sanctioned Pulse Gradient */}
              <radialGradient id="sanctionedHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#68D391" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#68D391" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#68D391" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g ref={gRef} className="growth-map-content">
              
              {/* 1. Base US States Contours */}
              <g className="states-basemap">
                {statesFeatures.map((feature: any, idx: number) => {
                  const path = pathGenerator(feature);
                  if (!path) return null;
                  return (
                    <path
                      key={`st-${idx}`}
                      d={path}
                      fill="#121620"
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="0.75"
                      className="transition-colors hover:fill-[#161B28]"
                    />
                  );
                })}
              </g>

              {/* 2. Directional Growth Velocity Vectors */}
              {showVelocityVectors && (
                <g className="velocity-vectors pointer-events-none">
                  {velocityVectors.map((vec: any) => (
                    <path
                      key={vec.id}
                      d={vec.d}
                      fill="none"
                      stroke="url(#velocityGrad)"
                      strokeWidth="1.25"
                      strokeDasharray="4 3"
                      opacity="0.65"
                    />
                  ))}
                </g>
              )}

              {/* 3. Operating Anchor Hubs (Reference Squares) */}
              <g className="anchor-hubs">
                {EXPANSION_ANCHORS.map((anchor) => {
                  const coords = projection(anchor.coords);
                  if (!coords) return null;
                  return (
                    <g key={anchor.id} transform={`translate(${coords[0]}, ${coords[1]})`} className="pointer-events-none">
                      <rect
                        x="-4.5"
                        y="-4.5"
                        width="9"
                        height="9"
                        fill="#2A303C"
                        stroke="#C89B3C"
                        strokeWidth="1"
                        rx="1"
                      />
                    </g>
                  );
                })}
              </g>

              {/* 4. Pipeline Universities Nodes */}
              <g className="pipeline-nodes">
                {filteredUniversities.map((uni) => {
                  const coords = projection(uni.coordinates);
                  if (!coords) return null;

                  const isSelected = selectedUni?.id === uni.id;
                  const isHovered = hoveredUni?.id === uni.id;
                  const nodeColor = getStageColor(uni.stage);

                  return (
                    <g
                      key={uni.id}
                      transform={`translate(${coords[0]}, ${coords[1]})`}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredUni(uni)}
                      onMouseLeave={() => setHoveredUni(null)}
                      onClick={() => setSelectedUni(uni)}
                    >
                      {/* Animated Halo on Stage 3 Sanctioned or Priority Hubs */}
                      {uni.priorityHub && (
                        <circle
                          r="14"
                          fill="url(#sanctionedHalo)"
                          className="animate-ping opacity-60"
                          style={{ animationDuration: '3.5s' }}
                        />
                      )}

                      {/* Outer Selection Ring */}
                      {(isSelected || isHovered) && (
                        <circle
                          r={10}
                          fill="transparent"
                          stroke={isSelected ? '#FFFFFF' : nodeColor}
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                        />
                      )}

                      {/* Main Node Point */}
                      <circle
                        r={uni.priorityHub ? 6 : 5}
                        fill={nodeColor}
                        stroke="#090A0C"
                        strokeWidth="1.75"
                      />

                      {/* University Short Label */}
                      <text
                        y={-9}
                        textAnchor="middle"
                        fill={isSelected ? '#FFFFFF' : '#E8C98B'}
                        fontSize="8.5px"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight={isSelected ? '700' : '600'}
                        className="pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
                      >
                        {uni.shortName}
                      </text>
                    </g>
                  );
                })}
              </g>

            </g>
          </svg>

          {/* Hover Tooltip Overlay */}
          {hoveredUni && (
            <div 
              className="absolute z-20 pointer-events-none bg-[#090C10]/95 border border-[#C89B3C]/40 px-3 py-2 rounded-md shadow-2xl max-w-xs transition-all font-mono text-xs"
              style={{
                top: '16px',
                right: '16px'
              }}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-[#C89B3C] uppercase tracking-wider">
                <MapPin size={10} /> {hoveredUni.city}, {hoveredUni.state} · {hoveredUni.waveTiming}
              </div>
              <div className="font-semibold text-white text-sm font-display mt-0.5">
                {hoveredUni.name}
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-300 mt-1">
                <span>{hoveredUni.conference}</span>
                <span className="font-semibold" style={{ color: getStageColor(hoveredUni.stage) }}>
                  {hoveredUni.stage.split(':')[0]} ({hoveredUni.stageProgress}%)
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Right Dossier Panel: Selected Pipeline University Governance Profile */}
        <div className="lg:col-span-4 bg-[#141822] p-6 lg:p-7 rounded-xl border border-white/10 space-y-6 shadow-xl relative">
          
          {selectedUni ? (
            <div className="space-y-6">
              
              {/* Dossier Header */}
              <div className="border-b border-white/[0.08] pb-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span 
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border font-semibold"
                    style={{
                      backgroundColor: `${getStageColor(selectedUni.stage)}15`,
                      borderColor: `${getStageColor(selectedUni.stage)}40`,
                      color: getStageColor(selectedUni.stage)
                    }}
                  >
                    <ShieldCheck size={11} /> {selectedUni.stage}
                  </span>
                  <span className="text-xs font-mono text-[#E8C98B]">{selectedUni.waveTiming}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                  {selectedUni.name}
                </h3>

                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <MapPin size={13} className="text-[#C89B3C]" />
                  <span>{selectedUni.city}, {selectedUni.state}</span>
                  <span>·</span>
                  <span className="text-white font-medium">{selectedUni.conference}</span>
                </div>
              </div>

              {/* Progress & Compliance Meter */}
              <div className="space-y-3 p-4 bg-[#0D1016] rounded-lg border border-white/[0.06]">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-400">Onboarding Clearance Progress</span>
                  <span className="text-white font-bold">{selectedUni.stageProgress}%</span>
                </div>
                <div className="w-full bg-[#1A1F2B] h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${selectedUni.stageProgress}%`,
                      backgroundColor: getStageColor(selectedUni.stage) 
                    }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-xs font-mono pt-1">
                  <span className="text-neutral-400">NCAA/NAIA Regulatory Alignment</span>
                  <span className="text-[#68D391] font-bold">{selectedUni.complianceReadiness}% Verified</span>
                </div>
              </div>

              {/* 4 Governance Clearances Checklist */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <FileCheck2 size={13} className="text-[#C89B3C]" />
                  <span>Institutional Clearance Audit</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className={`p-2.5 rounded border flex items-center gap-2 ${
                    selectedUni.governanceClearances.titleIX 
                      ? 'bg-[#121A16] border-[#68D391]/30 text-neutral-200' 
                      : 'bg-[#18151A] border-white/10 text-neutral-500'
                  }`}>
                    {selectedUni.governanceClearances.titleIX ? (
                      <CheckCircle2 size={13} className="text-[#68D391] shrink-0" />
                    ) : (
                      <Clock size={13} className="text-neutral-500 shrink-0" />
                    )}
                    <span>Title IX Roster Equity</span>
                  </div>

                  <div className={`p-2.5 rounded border flex items-center gap-2 ${
                    selectedUni.governanceClearances.nilEscrow 
                      ? 'bg-[#121A16] border-[#68D391]/30 text-neutral-200' 
                      : 'bg-[#18151A] border-white/10 text-neutral-500'
                  }`}>
                    {selectedUni.governanceClearances.nilEscrow ? (
                      <CheckCircle2 size={13} className="text-[#68D391] shrink-0" />
                    ) : (
                      <Clock size={13} className="text-neutral-500 shrink-0" />
                    )}
                    <span>NIL State Escrow</span>
                  </div>

                  <div className={`p-2.5 rounded border flex items-center gap-2 ${
                    selectedUni.governanceClearances.trademarkCharter 
                      ? 'bg-[#121A16] border-[#68D391]/30 text-neutral-200' 
                      : 'bg-[#18151A] border-white/10 text-neutral-500'
                  }`}>
                    {selectedUni.governanceClearances.trademarkCharter ? (
                      <CheckCircle2 size={13} className="text-[#68D391] shrink-0" />
                    ) : (
                      <Clock size={13} className="text-neutral-500 shrink-0" />
                    )}
                    <span>Trademark Charter</span>
                  </div>

                  <div className={`p-2.5 rounded border flex items-center gap-2 ${
                    selectedUni.governanceClearances.broadcastPermit 
                      ? 'bg-[#121A16] border-[#68D391]/30 text-neutral-200' 
                      : 'bg-[#18151A] border-white/10 text-neutral-500'
                  }`}>
                    {selectedUni.governanceClearances.broadcastPermit ? (
                      <CheckCircle2 size={13} className="text-[#68D391] shrink-0" />
                    ) : (
                      <Clock size={13} className="text-neutral-500 shrink-0" />
                    )}
                    <span>Broadcast Syndication</span>
                  </div>
                </div>
              </div>

              {/* Projected Scope Grid */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="bg-[#0D1016] p-3 rounded border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Projected Varsity Roster</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {selectedUni.projectedAthletes} Student Competitors
                  </div>
                </div>

                <div className="bg-[#0D1016] p-3 rounded border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Projected Annual NIL</div>
                  <div className="text-base font-bold text-[#E8C98B] mt-0.5">
                    {selectedUni.projectedAnnualNil}
                  </div>
                </div>
              </div>

              {/* Stakeholders & Notes */}
              <div className="space-y-2 text-xs">
                <div className="text-[11px] font-mono text-neutral-400 uppercase">Key University Governance Stakeholders</div>
                <p className="text-neutral-300 font-mono text-[11px] leading-relaxed bg-[#0D1016] p-2.5 rounded border border-white/5">
                  {selectedUni.keyStakeholders}
                </p>

                <div className="text-[11px] font-mono text-neutral-400 uppercase pt-2">Expansion Notes</div>
                <p className="text-neutral-400 text-xs leading-relaxed italic">
                  "{selectedUni.notes}"
                </p>
              </div>

              {/* Quick Focus Button */}
              <button
                onClick={() => {
                  setSelectedWave(selectedUni.wave);
                }}
                className="w-full py-2.5 bg-[#1B212D] hover:bg-[#222938] border border-white/10 text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Filter to {selectedUni.wave} Pipeline Corridor</span>
                <ChevronRight size={13} className="text-[#C89B3C]" />
              </button>

            </div>
          ) : (
            <div className="text-center py-16 text-neutral-500 font-mono text-xs">
              Select a university node on the Growth Velocity Map to inspect its institutional expansion dossier.
            </div>
          )}

        </div>

      </div>

      {/* Governance Map Institutional Footnote */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-neutral-400 font-mono gap-2">
        <div className="flex items-center gap-2">
          <Scale size={13} className="text-[#C89B3C]" />
          <span>Fiduciary Expansion Protocol: Zero non-compliant program activations permitted across collegiate syndicate.</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Charter Review Cycle: <strong>Bi-Weekly</strong></span>
          <span>·</span>
          <span>NIL Escrow Mandate: <strong>100% Pre-Funded</strong></span>
        </div>
      </div>

    </div>
  );
};
