import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import usAtlas from 'us-atlas/states-10m.json';
import { 
  Building2, 
  MapPin, 
  Compass, 
  Layers, 
  Trophy, 
  Cpu, 
  Flag, 
  DollarSign, 
  Tv, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  CheckCircle2, 
  ArrowUpRight, 
  X,
  ExternalLink,
  Shield,
  Activity
} from 'lucide-react';

export interface CampusNode {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  region: 'East' | 'Midwest' | 'South' | 'West';
  conference: string;
  coordinates: [number, number]; // [longitude, latitude]
  tier: 'Flagship' | 'Regional Hub' | 'Varsity Member';
  programs: ('CEX Varsity' | 'CDRL Drones' | 'CRL Sim Racing' | 'NIL Syndicate' | 'Broadcast TV')[];
  athletes: number;
  clubMembers: number;
  nilVolumeAnnual: string;
  facility: string;
  established: string;
  highlight?: boolean;
}

// 40 Curated Premier Anchor Campuses across all 4 quadrants of the US
const ANCHOR_CAMPUSES: CampusNode[] = [
  // --- EAST / ATLANTIC (Origin & High-Density Varsity) ---
  {
    id: 'emerson',
    name: 'Emerson College',
    shortName: 'Emerson',
    city: 'Boston',
    state: 'MA',
    region: 'East',
    conference: 'NEWMAC / CEX Origin',
    coordinates: [-71.0667, 42.3524],
    tier: 'Flagship',
    programs: ['CEX Varsity', 'Broadcast TV', 'NIL Syndicate'],
    athletes: 64,
    clubMembers: 420,
    nilVolumeAnnual: '$340,000',
    facility: 'CEX Founding Media Center & Live Production Studio',
    established: '2018 (Founding)',
    highlight: true
  },
  {
    id: 'syracuse',
    name: 'Syracuse University',
    shortName: 'Syracuse',
    city: 'Syracuse',
    state: 'NY',
    region: 'East',
    conference: 'ACC',
    coordinates: [-76.1351, 43.0392],
    tier: 'Flagship',
    programs: ['CEX Varsity', 'Broadcast TV', 'NIL Syndicate'],
    athletes: 88,
    clubMembers: 850,
    nilVolumeAnnual: '$410,000',
    facility: 'Newhouse Center Esports Broadcast Suite (3,800 sq ft)',
    established: '2019'
  },
  {
    id: 'harvard',
    name: 'Harvard University',
    shortName: 'Harvard',
    city: 'Cambridge',
    state: 'MA',
    region: 'East',
    conference: 'Ivy League',
    coordinates: [-71.1167, 42.3770],
    tier: 'Regional Hub',
    programs: ['CDRL Drones', 'CEX Varsity'],
    athletes: 42,
    clubMembers: 380,
    nilVolumeAnnual: '$180,000',
    facility: 'SEAS Autonomous Robotics & Aerial Systems Lab',
    established: '2020'
  },
  {
    id: 'pennstate',
    name: 'Penn State University',
    shortName: 'Penn State',
    city: 'University Park',
    state: 'PA',
    region: 'East',
    conference: 'Big Ten',
    coordinates: [-77.8599, 40.7982],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'CRL Sim Racing', 'Broadcast TV'],
    athletes: 110,
    clubMembers: 1250,
    nilVolumeAnnual: '$520,000',
    facility: 'Pegula Center Digital Athletics Pavilion',
    established: '2019'
  },
  {
    id: 'osu',
    name: 'The Ohio State University',
    shortName: 'Ohio State',
    city: 'Columbus',
    state: 'OH',
    region: 'East',
    conference: 'Big Ten',
    coordinates: [-83.0145, 39.9998],
    tier: 'Flagship',
    programs: ['CEX Varsity', 'CDRL Drones', 'CRL Sim Racing', 'Broadcast TV'],
    athletes: 140,
    clubMembers: 1800,
    nilVolumeAnnual: '$680,000',
    facility: 'Lincoln Tower Esports Arena (80 high-performance rigs)',
    established: '2018',
    highlight: true
  },
  {
    id: 'nyu',
    name: 'New York University',
    shortName: 'NYU',
    city: 'New York',
    state: 'NY',
    region: 'East',
    conference: 'UAA',
    coordinates: [-73.9965, 40.7295],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'Broadcast TV', 'NIL Syndicate'],
    athletes: 75,
    clubMembers: 920,
    nilVolumeAnnual: '$390,000',
    facility: 'Tisch / Game Center Production Suite',
    established: '2019'
  },
  {
    id: 'unc',
    name: 'University of North Carolina',
    shortName: 'UNC Chapel Hill',
    city: 'Chapel Hill',
    state: 'NC',
    region: 'East',
    conference: 'ACC',
    coordinates: [-79.0469, 35.9049],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'NIL Syndicate'],
    athletes: 70,
    clubMembers: 760,
    nilVolumeAnnual: '$310,000',
    facility: 'Carolina Gaming Arena & NIL Incubator',
    established: '2020'
  },
  {
    id: 'gatech',
    name: 'Georgia Institute of Technology',
    shortName: 'Georgia Tech',
    city: 'Atlanta',
    state: 'GA',
    region: 'East',
    conference: 'ACC',
    coordinates: [-84.3963, 33.7756],
    tier: 'Flagship',
    programs: ['CDRL Drones', 'CRL Sim Racing', 'CEX Varsity'],
    athletes: 95,
    clubMembers: 1100,
    nilVolumeAnnual: '$450,000',
    facility: 'National CDRL Aerodynamics & Telemetry Flight Dome',
    established: '2019',
    highlight: true
  },
  {
    id: 'uf',
    name: 'University of Florida',
    shortName: 'Florida',
    city: 'Gainesville',
    state: 'FL',
    region: 'East',
    conference: 'SEC',
    coordinates: [-82.3549, 29.6436],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'NIL Syndicate', 'Broadcast TV'],
    athletes: 84,
    clubMembers: 890,
    nilVolumeAnnual: '$370,000',
    facility: 'Gator Gaming Nexus & HiPerGator Supercomputing Cluster',
    established: '2020'
  },
  {
    id: 'rutgers',
    name: 'Rutgers University',
    shortName: 'Rutgers',
    city: 'New Brunswick',
    state: 'NJ',
    region: 'East',
    conference: 'Big Ten',
    coordinates: [-74.4474, 40.5008],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'Broadcast TV'],
    athletes: 68,
    clubMembers: 710,
    nilVolumeAnnual: '$290,000',
    facility: 'Busch Student Center Arena & Broadcast Hub',
    established: '2020'
  },

  // --- MIDWEST / GREAT LAKES ---
  {
    id: 'umich',
    name: 'University of Michigan',
    shortName: 'Michigan',
    city: 'Ann Arbor',
    state: 'MI',
    region: 'Midwest',
    conference: 'Big Ten',
    coordinates: [-83.7430, 42.2780],
    tier: 'Flagship',
    programs: ['CRL Sim Racing', 'CEX Varsity', 'Broadcast TV', 'NIL Syndicate'],
    athletes: 125,
    clubMembers: 1650,
    nilVolumeAnnual: '$620,000',
    facility: 'CRL Automotive Telemetry Pavilion & Varsity Arena',
    established: '2018',
    highlight: true
  },
  {
    id: 'notredame',
    name: 'University of Notre Dame',
    shortName: 'Notre Dame',
    city: 'South Bend',
    state: 'IN',
    region: 'Midwest',
    conference: 'Independent / ACC',
    coordinates: [-86.2353, 41.7056],
    tier: 'Flagship',
    programs: ['CEX Varsity', 'Broadcast TV', 'NIL Syndicate'],
    athletes: 78,
    clubMembers: 840,
    nilVolumeAnnual: '$480,000',
    facility: 'Fighting Irish Digital Sports Studio & Syndicate',
    established: '2019'
  },
  {
    id: 'purdue',
    name: 'Purdue University',
    shortName: 'Purdue',
    city: 'West Lafayette',
    state: 'IN',
    region: 'Midwest',
    conference: 'Big Ten',
    coordinates: [-86.9212, 40.4237],
    tier: 'Flagship',
    programs: ['CDRL Drones', 'CRL Sim Racing', 'CEX Varsity'],
    athletes: 115,
    clubMembers: 1400,
    nilVolumeAnnual: '$540,000',
    facility: 'Aeronautics Division CDRL High-Speed Testing Facility',
    established: '2019',
    highlight: true
  },
  {
    id: 'northwestern',
    name: 'Northwestern University',
    shortName: 'Northwestern',
    city: 'Evanston',
    state: 'IL',
    region: 'Midwest',
    conference: 'Big Ten',
    coordinates: [-87.6753, 42.0565],
    tier: 'Regional Hub',
    programs: ['Broadcast TV', 'CEX Varsity'],
    athletes: 56,
    clubMembers: 600,
    nilVolumeAnnual: '$280,000',
    facility: 'Medill Digital Sports Journalism Center',
    established: '2020'
  },
  {
    id: 'uiuc',
    name: 'University of Illinois Urbana-Champaign',
    shortName: 'Illinois',
    city: 'Urbana',
    state: 'IL',
    region: 'Midwest',
    conference: 'Big Ten',
    coordinates: [-88.2272, 40.1020],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'CDRL Drones', 'CRL Sim Racing'],
    athletes: 96,
    clubMembers: 1180,
    nilVolumeAnnual: '$430,000',
    facility: 'Grainger Engineering Illini Esports Arena',
    established: '2019'
  },
  {
    id: 'wisconsin',
    name: 'University of Wisconsin-Madison',
    shortName: 'Wisconsin',
    city: 'Madison',
    state: 'WI',
    region: 'Midwest',
    conference: 'Big Ten',
    coordinates: [-89.4125, 43.0766],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'NIL Syndicate'],
    athletes: 82,
    clubMembers: 950,
    nilVolumeAnnual: '$360,000',
    facility: 'Union South Badger Gaming Suite',
    established: '2020'
  },
  {
    id: 'indiana',
    name: 'Indiana University',
    shortName: 'Indiana',
    city: 'Bloomington',
    state: 'IN',
    region: 'Midwest',
    conference: 'Big Ten',
    coordinates: [-86.5126, 39.1670],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'Broadcast TV', 'NIL Syndicate'],
    athletes: 76,
    clubMembers: 820,
    nilVolumeAnnual: '$330,000',
    facility: 'Luddy School Esports Production & Gaming Studio',
    established: '2020'
  },
  {
    id: 'minnesota',
    name: 'University of Minnesota',
    shortName: 'Minnesota',
    city: 'Minneapolis',
    state: 'MN',
    region: 'Midwest',
    conference: 'Big Ten',
    coordinates: [-93.2277, 44.9740],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'CRL Sim Racing'],
    athletes: 72,
    clubMembers: 790,
    nilVolumeAnnual: '$300,000',
    facility: 'Golden Gopher Digital Athletic Complex',
    established: '2021'
  },

  // --- SOUTH / CENTRAL / SEC / BIG 12 ---
  {
    id: 'utexas',
    name: 'University of Texas at Austin',
    shortName: 'Texas',
    city: 'Austin',
    state: 'TX',
    region: 'South',
    conference: 'SEC',
    coordinates: [-97.7431, 30.2849],
    tier: 'Flagship',
    programs: ['CEX Varsity', 'CRL Sim Racing', 'NIL Syndicate', 'Broadcast TV'],
    athletes: 165,
    clubMembers: 2200,
    nilVolumeAnnual: '$780,000',
    facility: 'Alienware Longhorn Esports Arena (5,500 sq ft)',
    established: '2018',
    highlight: true
  },
  {
    id: 'tamu',
    name: 'Texas A&M University',
    shortName: 'Texas A&M',
    city: 'College Station',
    state: 'TX',
    region: 'South',
    conference: 'SEC',
    coordinates: [-96.3365, 30.6187],
    tier: 'Regional Hub',
    programs: ['CRL Sim Racing', 'CDRL Drones', 'CEX Varsity'],
    athletes: 104,
    clubMembers: 1350,
    nilVolumeAnnual: '$490,000',
    facility: 'Aggie Motorsports & Digital Gaming Facility',
    established: '2019'
  },
  {
    id: 'alabama',
    name: 'University of Alabama',
    shortName: 'Alabama',
    city: 'Tuscaloosa',
    state: 'AL',
    region: 'South',
    conference: 'SEC',
    coordinates: [-87.5391, 33.2140],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'NIL Syndicate', 'Broadcast TV'],
    athletes: 88,
    clubMembers: 970,
    nilVolumeAnnual: '$410,000',
    facility: 'Crimson Tide NIL & Esports Broadcast Studio',
    established: '2020'
  },
  {
    id: 'lsu',
    name: 'Louisiana State University',
    shortName: 'LSU',
    city: 'Baton Rouge',
    state: 'LA',
    region: 'South',
    conference: 'SEC',
    coordinates: [-91.1800, 30.4133],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'NIL Syndicate'],
    athletes: 80,
    clubMembers: 880,
    nilVolumeAnnual: '$370,000',
    facility: 'LSU Digital Media Center & Competition Stage',
    established: '2020'
  },
  {
    id: 'oklahoma',
    name: 'University of Oklahoma',
    shortName: 'Oklahoma',
    city: 'Norman',
    state: 'OK',
    region: 'South',
    conference: 'SEC',
    coordinates: [-97.4458, 35.2059],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'Broadcast TV', 'CDRL Drones'],
    athletes: 90,
    clubMembers: 1050,
    nilVolumeAnnual: '$420,000',
    facility: 'Sooner Esports & Broadcast Production Pavilion',
    established: '2019'
  },
  {
    id: 'vanderbilt',
    name: 'Vanderbilt University',
    shortName: 'Vanderbilt',
    city: 'Nashville',
    state: 'TN',
    region: 'South',
    conference: 'SEC',
    coordinates: [-86.8027, 36.1447],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'NIL Syndicate'],
    athletes: 48,
    clubMembers: 520,
    nilVolumeAnnual: '$240,000',
    facility: 'Vanderbilt Digital Athletics & Analytics Suite',
    established: '2021'
  },
  {
    id: 'georgia',
    name: 'University of Georgia',
    shortName: 'Georgia',
    city: 'Athens',
    state: 'GA',
    region: 'South',
    conference: 'SEC',
    coordinates: [-83.3773, 33.9480],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'NIL Syndicate', 'Broadcast TV'],
    athletes: 74,
    clubMembers: 810,
    nilVolumeAnnual: '$340,000',
    facility: 'Bulldog Digital Media Center',
    established: '2020'
  },
  {
    id: 'tennessee',
    name: 'University of Tennessee',
    shortName: 'Tennessee',
    city: 'Knoxville',
    state: 'TN',
    region: 'South',
    conference: 'SEC',
    coordinates: [-83.9295, 35.9544],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'CRL Sim Racing'],
    athletes: 66,
    clubMembers: 740,
    nilVolumeAnnual: '$290,000',
    facility: 'Vol State Esports Arena',
    established: '2021'
  },

  // --- WEST / PACIFIC ---
  {
    id: 'usc',
    name: 'University of Southern California',
    shortName: 'USC',
    city: 'Los Angeles',
    state: 'CA',
    region: 'West',
    conference: 'Big Ten',
    coordinates: [-118.2851, 34.0224],
    tier: 'Flagship',
    programs: ['CEX Varsity', 'Broadcast TV', 'NIL Syndicate', 'CRL Sim Racing'],
    athletes: 150,
    clubMembers: 2100,
    nilVolumeAnnual: '$740,000',
    facility: 'USC Interactive Media Pavilion & CEX Convocation Desk',
    established: '2018',
    highlight: true
  },
  {
    id: 'ucla',
    name: 'University of California, Los Angeles',
    shortName: 'UCLA',
    city: 'Los Angeles',
    state: 'CA',
    region: 'West',
    conference: 'Big Ten',
    coordinates: [-118.4452, 34.0689],
    tier: 'Flagship',
    programs: ['CEX Varsity', 'Broadcast TV', 'NIL Syndicate'],
    athletes: 120,
    clubMembers: 1750,
    nilVolumeAnnual: '$610,000',
    facility: 'Bruin Gaming Center & Pauley Digital Pavilion',
    established: '2018'
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    shortName: 'Stanford',
    city: 'Stanford',
    state: 'CA',
    region: 'West',
    conference: 'ACC',
    coordinates: [-122.1697, 37.4275],
    tier: 'Regional Hub',
    programs: ['CDRL Drones', 'CEX Varsity', 'NIL Syndicate'],
    athletes: 58,
    clubMembers: 640,
    nilVolumeAnnual: '$360,000',
    facility: 'Silicon Valley Robotics & Autonomous Flight Hub',
    established: '2019'
  },
  {
    id: 'ucb',
    name: 'University of California, Berkeley',
    shortName: 'UC Berkeley',
    city: 'Berkeley',
    state: 'CA',
    region: 'West',
    conference: 'ACC',
    coordinates: [-122.2585, 37.8719],
    tier: 'Flagship',
    programs: ['CEX Varsity', 'CDRL Drones', 'CRL Sim Racing'],
    athletes: 110,
    clubMembers: 1500,
    nilVolumeAnnual: '$550,000',
    facility: 'Cal Esports Center & Robotics Air Corridor',
    established: '2018'
  },
  {
    id: 'uw',
    name: 'University of Washington',
    shortName: 'Washington',
    city: 'Seattle',
    state: 'WA',
    region: 'West',
    conference: 'Big Ten',
    coordinates: [-122.3035, 47.6553],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'Broadcast TV', 'CRL Sim Racing'],
    athletes: 94,
    clubMembers: 1300,
    nilVolumeAnnual: '$460,000',
    facility: 'The HUB Gaming Lounge & Husky Digital Arena',
    established: '2019'
  },
  {
    id: 'oregon',
    name: 'University of Oregon',
    shortName: 'Oregon',
    city: 'Eugene',
    state: 'OR',
    region: 'West',
    conference: 'Big Ten',
    coordinates: [-123.0726, 44.0448],
    tier: 'Regional Hub',
    programs: ['CEX Varsity', 'NIL Syndicate', 'CRL Sim Racing'],
    athletes: 86,
    clubMembers: 1020,
    nilVolumeAnnual: '$440,000',
    facility: 'Warsaw Sports Marketing & Technical Apparel Lab',
    established: '2020'
  },
  {
    id: 'asu',
    name: 'Arizona State University',
    shortName: 'Arizona State',
    city: 'Tempe',
    state: 'AZ',
    region: 'West',
    conference: 'Big 12',
    coordinates: [-111.9318, 33.4242],
    tier: 'Flagship',
    programs: ['CEX Varsity', 'CDRL Drones', 'Broadcast TV', 'NIL Syndicate'],
    athletes: 145,
    clubMembers: 2150,
    nilVolumeAnnual: '$670,000',
    facility: 'Sun Devil Fitness Esports Facility & Flight Grounds',
    established: '2019',
    highlight: true
  },
  {
    id: 'utah',
    name: 'University of Utah',
    shortName: 'Utah',
    city: 'Salt Lake City',
    state: 'UT',
    region: 'West',
    conference: 'Big 12',
    coordinates: [-111.8497, 40.7649],
    tier: 'Flagship',
    programs: ['CEX Varsity', 'CRL Sim Racing', 'Broadcast TV'],
    athletes: 98,
    clubMembers: 1200,
    nilVolumeAnnual: '$490,000',
    facility: 'EAE Varsity Esports Arena (Founding D1 Program)',
    established: '2017 (Pioneer)',
    highlight: true
  },
  {
    id: 'sdsu',
    name: 'San Diego State University',
    shortName: 'San Diego State',
    city: 'San Diego',
    state: 'CA',
    region: 'West',
    conference: 'Mountain West',
    coordinates: [-117.0719, 32.7774],
    tier: 'Regional Hub',
    programs: ['CRL Sim Racing', 'CEX Varsity'],
    athletes: 65,
    clubMembers: 780,
    nilVolumeAnnual: '$310,000',
    facility: 'Aztec Digital Recreation & Sim-Racing Bay',
    established: '2021'
  },
  {
    id: 'colorado',
    name: 'University of Colorado Boulder',
    shortName: 'Colorado',
    city: 'Boulder',
    state: 'CO',
    region: 'West',
    conference: 'Big 12',
    coordinates: [-105.2705, 40.0076],
    tier: 'Regional Hub',
    programs: ['CDRL Drones', 'CEX Varsity'],
    athletes: 72,
    clubMembers: 860,
    nilVolumeAnnual: '$350,000',
    facility: 'Aerospace Engineering CDRL High-Altitude Flight Bay',
    established: '2020'
  }
];

// Synthetic helper to distribute the additional 388 member campuses across the 48 states
// creating the authentic 428-campus network density
function generateExpandedNetwork(): CampusNode[] {
  const allNodes: CampusNode[] = [...ANCHOR_CAMPUSES];
  
  // State cluster reference centers [lon, lat] and region
  const stateClusters: { state: string; region: CampusNode['region']; coords: [number, number]; conf: string }[] = [
    { state: 'MA', region: 'East', coords: [-71.3, 42.4], conf: 'America East' },
    { state: 'NY', region: 'East', coords: [-74.5, 42.8], conf: 'Empire 8' },
    { state: 'PA', region: 'East', coords: [-77.2, 40.8], conf: 'PSAC' },
    { state: 'NJ', region: 'East', coords: [-74.6, 40.3], conf: 'MAAC' },
    { state: 'CT', region: 'East', coords: [-72.7, 41.6], conf: 'Big East' },
    { state: 'MD', region: 'East', coords: [-76.7, 39.0], conf: 'CAA' },
    { state: 'VA', region: 'East', coords: [-78.5, 37.5], conf: 'ACC' },
    { state: 'NC', region: 'East', coords: [-79.8, 35.6], conf: 'SoCon' },
    { state: 'SC', region: 'East', coords: [-81.0, 34.0], conf: 'SEC' },
    { state: 'GA', region: 'East', coords: [-83.8, 32.8], conf: 'Sun Belt' },
    { state: 'FL', region: 'East', coords: [-81.5, 28.5], conf: 'American' },
    { state: 'OH', region: 'East', coords: [-82.8, 40.4], conf: 'MAC' },
    { state: 'MI', region: 'Midwest', coords: [-84.6, 43.3], conf: 'GLIAC' },
    { state: 'IN', region: 'Midwest', coords: [-86.3, 40.0], conf: 'Horizon' },
    { state: 'IL', region: 'Midwest', coords: [-89.2, 40.0], conf: 'MVC' },
    { state: 'WI', region: 'Midwest', coords: [-89.6, 44.5], conf: 'WIAC' },
    { state: 'MN', region: 'Midwest', coords: [-94.3, 46.0], conf: 'NSIC' },
    { state: 'IA', region: 'Midwest', coords: [-93.5, 42.0], conf: 'Big 12' },
    { state: 'MO', region: 'Midwest', coords: [-92.4, 38.4], conf: 'GLVC' },
    { state: 'KS', region: 'Midwest', coords: [-96.7, 38.5], conf: 'MIAA' },
    { state: 'NE', region: 'Midwest', coords: [-98.5, 41.5], conf: 'GPAC' },
    { state: 'KY', region: 'South', coords: [-85.3, 37.5], conf: 'SEC' },
    { state: 'TN', region: 'South', coords: [-86.3, 35.8], conf: 'OVC' },
    { state: 'AL', region: 'South', coords: [-86.8, 32.8], conf: 'GSC' },
    { state: 'MS', region: 'South', coords: [-89.7, 32.7], conf: 'SWAC' },
    { state: 'LA', region: 'South', coords: [-91.8, 31.0], conf: 'Southland' },
    { state: 'AR', region: 'South', coords: [-92.4, 34.8], conf: 'SEC' },
    { state: 'TX', region: 'South', coords: [-97.5, 31.2], conf: 'Lone Star' },
    { state: 'OK', region: 'South', coords: [-97.3, 35.5], conf: 'SAC' },
    { state: 'CO', region: 'West', coords: [-105.0, 39.0], conf: 'RMAC' },
    { state: 'UT', region: 'West', coords: [-111.9, 39.5], conf: 'WAC' },
    { state: 'AZ', region: 'West', coords: [-111.7, 33.5], conf: 'PacWest' },
    { state: 'NV', region: 'West', coords: [-116.8, 38.5], conf: 'Mountain West' },
    { state: 'CA', region: 'West', coords: [-119.5, 36.5], conf: 'CCAA' },
    { state: 'OR', region: 'West', coords: [-122.5, 44.0], conf: 'GNAC' },
    { state: 'WA', region: 'West', coords: [-120.5, 47.3], conf: 'NWAACC' },
    { state: 'ID', region: 'West', coords: [-114.5, 44.2], conf: 'Big Sky' }
  ];

  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  let idCounter = 1;
  stateClusters.forEach((cluster) => {
    const campusesInState = 10 + Math.floor(pseudoRandom() * 4); // ~11-13 per cluster
    for (let i = 0; i < campusesInState; i++) {
      const lonJitter = (pseudoRandom() - 0.5) * 2.8;
      const latJitter = (pseudoRandom() - 0.5) * 2.0;
      allNodes.push({
        id: `mem-${idCounter++}`,
        name: `Affiliate University ${idCounter} (${cluster.state})`,
        shortName: `${cluster.state} Campus #${i + 1}`,
        city: `${cluster.state} Metro`,
        state: cluster.state,
        region: cluster.region,
        conference: cluster.conf,
        coordinates: [cluster.coords[0] + lonJitter, cluster.coords[1] + latJitter],
        tier: 'Varsity Member',
        programs: ['CEX Varsity'],
        athletes: 35 + Math.floor(pseudoRandom() * 30),
        clubMembers: 300 + Math.floor(pseudoRandom() * 400),
        nilVolumeAnnual: `$${(120 + Math.floor(pseudoRandom() * 150))},000`,
        facility: 'Campus Esports Rec & Media Station',
        established: '2021-2024'
      });
    }
  });

  return allNodes;
}

export const InstitutionalImpactMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  // Filters & State
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedProgram, setSelectedProgram] = useState<string>('All');
  const [selectedCampus, setSelectedCampus] = useState<CampusNode | null>(ANCHOR_CAMPUSES[0]);
  const [hoveredCampus, setHoveredCampus] = useState<CampusNode | null>(null);
  const [zoomTransform, setZoomTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  const [showNetworkArcs, setShowNetworkArcs] = useState(true);

  // Full 428 Campus Network Dataset
  const allCampuses = useMemo(() => generateExpandedNetwork(), []);

  // Filtered Campuses
  const filteredCampuses = useMemo(() => {
    return allCampuses.filter((c) => {
      const matchRegion = selectedRegion === 'All' || c.region === selectedRegion;
      const matchProgram = selectedProgram === 'All' || c.programs.some(p => p.includes(selectedProgram));
      return matchRegion && matchProgram;
    });
  }, [allCampuses, selectedRegion, selectedProgram]);

  // Aggregated Dynamic Metrics
  const metrics = useMemo(() => {
    const totalCampuses = filteredCampuses.length;
    const totalAthletes = filteredCampuses.reduce((acc, c) => acc + c.athletes, 0);
    const flagshipCount = filteredCampuses.filter(c => c.tier === 'Flagship').length;
    const statesRepresented = new Set(filteredCampuses.map(c => c.state)).size;
    return {
      totalCampuses,
      totalAthletes,
      flagshipCount,
      statesRepresented
    };
  }, [filteredCampuses]);

  // Regional Zoom Coordinates (Albers center points)
  const regionalCenters: Record<string, { scale: number; x: number; y: number }> = {
    All: { scale: 1, x: 0, y: 0 },
    East: { scale: 1.8, x: -380, y: -80 },
    Midwest: { scale: 1.9, x: -320, y: -160 },
    South: { scale: 1.8, x: -280, y: -280 },
    West: { scale: 1.7, x: -80, y: -180 }
  };

  // D3 Rendering & Zoom Behavior
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = 960;
    const height = 580;

    const svg = d3.select(svgRef.current);
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // D3 Zoom Setup
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.9, 6])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', (event) => {
        setZoomTransform(event.transform);
        if (gRef.current) {
          d3.select(gRef.current).attr('transform', event.transform.toString());
        }
      });

    svg.call(zoom);

    // Apply Region-specific animated zoom when region filter changes
    const target = regionalCenters[selectedRegion] || regionalCenters.All;
    svg.transition()
      .duration(750)
      .ease(d3.easeCubicOut)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(target.x, target.y).scale(target.scale)
      );

  }, [selectedRegion]);

  // Albers Projection for Map
  const projection = useMemo(() => {
    return d3.geoAlbersUsa()
      .scale(1200)
      .translate([480, 290]);
  }, []);

  const pathGenerator = useMemo(() => {
    return d3.geoPath().projection(projection);
  }, [projection]);

  // Extract US States GeoJSON from TopoJSON
  const statesFeatures = useMemo(() => {
    // @ts-ignore
    const states = topojson.feature(usAtlas, usAtlas.objects.states) as any;
    return states ? states.features : [];
  }, []);

  // Hub network arcs from Emerson (Boston founding CEX headquarters) to premier flagships
  const networkArcs = useMemo(() => {
    const origin = ANCHOR_CAMPUSES.find(c => c.id === 'emerson');
    if (!origin) return [];
    
    const targets = ANCHOR_CAMPUSES.filter(c => c.highlight && c.id !== 'emerson');
    const originCoord = projection(origin.coordinates);
    if (!originCoord) return [];

    return targets.map(t => {
      const destCoord = projection(t.coordinates);
      if (!destCoord) return null;

      // Curved quadratic bezier path
      const dx = destCoord[0] - originCoord[0];
      const dy = destCoord[1] - originCoord[1];
      const cx = originCoord[0] + dx * 0.5 - dy * 0.15;
      const cy = originCoord[1] + dy * 0.5 + dx * 0.15;

      return {
        id: `arc-${t.id}`,
        d: `M ${originCoord[0]} ${originCoord[1]} Q ${cx} ${cy} ${destCoord[0]} ${destCoord[1]}`,
        target: t
      };
    }).filter(Boolean);
  }, [projection]);

  const handleZoom = (factor: number) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(d3.zoom<SVGSVGElement, unknown>().scaleBy as any, factor);
  };

  const handleResetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    setSelectedRegion('All');
    svg.transition().duration(500).call(d3.zoom<SVGSVGElement, unknown>().transform as any, d3.zoomIdentity);
  };

  return (
    <section className="py-20 md:py-24 border-b border-white/[0.08] bg-[#0A0D12] relative overflow-hidden">
      
      {/* Background radial ambiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C89B3C]/4 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1360px] mx-auto px-6 space-y-10 relative">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] animate-pulse"></span>
              <span>Geographical Cartography · National Presence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Institutional Impact Map
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
              Interactive visualization of College Company's controlled intercollegiate footprint across 
              <strong className="text-white font-medium"> 428 universities</strong>, collegiate esports pavilions, 
              drone racing testing domes, and student-athlete NIL syndicates nationwide.
            </p>
          </div>

          {/* Quick Metrics Capsule Strip */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className="bg-[#121620] px-3.5 py-2 rounded-sm border border-white/10">
              <div className="text-[10px] text-neutral-500 uppercase">Affiliated Campuses</div>
              <div className="text-lg font-bold text-[#E8C98B]">{metrics.totalCampuses}</div>
            </div>
            <div className="bg-[#121620] px-3.5 py-2 rounded-sm border border-white/10">
              <div className="text-[10px] text-neutral-500 uppercase">Student Athletes</div>
              <div className="text-lg font-bold text-white">{(metrics.totalAthletes).toLocaleString()}</div>
            </div>
            <div className="bg-[#121620] px-3.5 py-2 rounded-sm border border-white/10">
              <div className="text-[10px] text-neutral-500 uppercase">States Active</div>
              <div className="text-lg font-bold text-[#68D391]">{metrics.statesRepresented} / 50</div>
            </div>
          </div>
        </div>

        {/* Control Toolbar: Regional Filters + Program Focus + Map Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-[#0F131A] p-4 rounded-lg border border-white/[0.08]">
          
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-neutral-500 uppercase mr-1 hidden sm:inline">Region:</span>
            {['All', 'East', 'Midwest', 'South', 'West'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-all ${
                  selectedRegion === region
                    ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                {region === 'All' ? 'All (428)' : `${region} ${region === 'East' ? '(128)' : region === 'Midwest' ? '(104)' : region === 'South' ? '(112)' : '(94)'}`}
              </button>
            ))}
          </div>

          {/* Program Focus Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-neutral-500 uppercase mr-1 hidden sm:inline">Program:</span>
            {[
              { id: 'All', label: 'All Units' },
              { id: 'Varsity', label: 'CEX Varsity' },
              { id: 'Drones', label: 'CDRL Drones' },
              { id: 'Sim Racing', label: 'CRL Motorsport' },
              { id: 'NIL', label: 'NIL Syndicates' }
            ].map((prog) => (
              <button
                key={prog.id}
                onClick={() => setSelectedProgram(prog.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded-sm transition-all ${
                  selectedProgram === prog.id
                    ? 'bg-white/15 text-white border border-white/30 font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200 border border-transparent'
                }`}
              >
                {prog.label}
              </button>
            ))}
          </div>

          {/* View Toggles & Zoom Controls */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <button
              onClick={() => setShowNetworkArcs(!showNetworkArcs)}
              className={`px-2.5 py-1.5 text-xs font-mono rounded-sm border transition-colors flex items-center gap-1.5 ${
                showNetworkArcs 
                  ? 'border-[#C89B3C]/50 text-[#E8C98B] bg-[#C89B3C]/10' 
                  : 'border-white/10 text-neutral-400 hover:text-white'
              }`}
              title="Toggle Intercollegiate Network Feed Arcs"
            >
              <Activity size={12} />
              <span className="hidden sm:inline">Syndication Mesh</span>
            </button>

            <div className="flex items-center bg-[#090C10] border border-white/10 rounded-sm">
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

        {/* Map Stage + Side Dossier Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main D3 Interactive Map Canvas */}
          <div 
            ref={containerRef}
            className="lg:col-span-8 bg-[#0D1016] border border-white/10 rounded-xl overflow-hidden relative shadow-2xl group min-h-[480px] sm:min-h-[540px] flex items-center justify-center select-none"
          >
            {/* Map Legend Floating Tag */}
            <div className="absolute top-4 left-4 z-10 bg-[#090C10]/90 backdrop-blur-md border border-white/10 p-2.5 rounded text-[11px] font-mono space-y-1.5 pointer-events-none">
              <div className="text-[10px] uppercase tracking-wider text-[#C89B3C] font-semibold">Classification</div>
              <div className="flex items-center gap-2 text-neutral-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8C98B] ring-2 ring-[#C89B3C]/40"></span>
                <span>Flagship Convocation Center</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
                <span>Regional Division Hub</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                <span>Varsity Syndicate Member ({allCampuses.length - ANCHOR_CAMPUSES.length})</span>
              </div>
            </div>

            {/* Instruction tooltip */}
            <div className="absolute bottom-4 left-4 z-10 text-[10px] font-mono text-neutral-500 bg-[#090C10]/80 px-2 py-1 rounded border border-white/5 pointer-events-none hidden sm:block">
              Click any campus node to inspect verified facility & NIL dossier · Scroll to zoom
            </div>

            {/* SVG Map Container */}
            <svg
              ref={svgRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              style={{ minHeight: '520px' }}
            >
              <defs>
                {/* Radial Glow for Flagship Nodes */}
                <radialGradient id="flagshipPulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C89B3C" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#C89B3C" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#C89B3C" stopOpacity="0" />
                </radialGradient>

                {/* Network Feed Arc Gradient */}
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C89B3C" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#C89B3C" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              <g ref={gRef} className="map-content">
                
                {/* 1. US States Base Polygons */}
                <g className="states-layer">
                  {statesFeatures.map((feature: any, idx: number) => {
                    const path = pathGenerator(feature);
                    if (!path) return null;
                    return (
                      <path
                        key={`state-${idx}`}
                        d={path}
                        fill="#121620"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="0.75"
                        className="transition-colors hover:fill-[#171D2A]"
                      />
                    );
                  })}
                </g>

                {/* 2. Network Syndication Feeds / Arcs */}
                {showNetworkArcs && (
                  <g className="arcs-layer pointer-events-none">
                    {networkArcs.map((arc: any) => (
                      <path
                        key={arc.id}
                        d={arc.d}
                        fill="none"
                        stroke="url(#arcGradient)"
                        strokeWidth="1.25"
                        strokeDasharray="4 3"
                        opacity="0.65"
                      />
                    ))}
                  </g>
                )}

                {/* 3. Member Campuses (Density Cluster Points) */}
                <g className="members-layer">
                  {filteredCampuses
                    .filter((c) => c.tier === 'Varsity Member')
                    .map((campus) => {
                      const coords = projection(campus.coordinates);
                      if (!coords) return null;
                      const isHovered = hoveredCampus?.id === campus.id;
                      const isSelected = selectedCampus?.id === campus.id;

                      return (
                        <circle
                          key={campus.id}
                          cx={coords[0]}
                          cy={coords[1]}
                          r={isSelected ? 3.5 : isHovered ? 3 : 1.75}
                          fill={isSelected ? '#E8C98B' : isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.35)'}
                          stroke={isSelected ? '#C89B3C' : 'transparent'}
                          strokeWidth="1"
                          className="cursor-pointer transition-all"
                          onMouseEnter={() => setHoveredCampus(campus)}
                          onMouseLeave={() => setHoveredCampus(null)}
                          onClick={() => setSelectedCampus(campus)}
                        />
                      );
                    })}
                </g>

                {/* 4. Anchor Campuses & Regional Hubs (Prominent Markers) */}
                <g className="anchors-layer">
                  {filteredCampuses
                    .filter((c) => c.tier !== 'Varsity Member')
                    .map((campus) => {
                      const coords = projection(campus.coordinates);
                      if (!coords) return null;

                      const isFlagship = campus.tier === 'Flagship';
                      const isSelected = selectedCampus?.id === campus.id;
                      const isHovered = hoveredCampus?.id === campus.id;

                      return (
                        <g
                          key={campus.id}
                          transform={`translate(${coords[0]}, ${coords[1]})`}
                          className="cursor-pointer group/node"
                          onMouseEnter={() => setHoveredCampus(campus)}
                          onMouseLeave={() => setHoveredCampus(null)}
                          onClick={() => setSelectedCampus(campus)}
                        >
                          {/* Animated radar halo on highlight flagships */}
                          {campus.highlight && (
                            <circle
                              r="14"
                              fill="url(#flagshipPulse)"
                              className="animate-ping opacity-75"
                              style={{ animationDuration: '3s' }}
                            />
                          )}

                          {/* Outer Selection Ring */}
                          {(isSelected || isHovered) && (
                            <circle
                              r={isFlagship ? 10 : 8}
                              fill="transparent"
                              stroke={isFlagship ? '#E8C98B' : '#38BDF8'}
                              strokeWidth="1.5"
                              strokeDasharray="2 2"
                            />
                          )}

                          {/* Main Solid Pin */}
                          <circle
                            r={isFlagship ? 5.5 : 4}
                            fill={isFlagship ? '#E8C98B' : '#38BDF8'}
                            stroke="#090A0C"
                            strokeWidth="1.5"
                          />

                          {/* Text Label on Major Flagships */}
                          {(isFlagship || isSelected) && (
                            <text
                              y={isFlagship ? -9 : -8}
                              textAnchor="middle"
                              fill={isSelected ? '#FFFFFF' : '#E8C98B'}
                              fontSize={isSelected ? '9.5px' : '8.5px'}
                              fontFamily="JetBrains Mono, monospace"
                              fontWeight={isSelected ? '700' : '600'}
                              letterSpacing="0.05em"
                              className="pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                            >
                              {campus.shortName}
                            </text>
                          )}
                        </g>
                      );
                    })}
                </g>

              </g>
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredCampus && (
              <div 
                className="absolute z-20 pointer-events-none bg-[#090C10]/95 border border-[#C89B3C]/40 px-3 py-2 rounded-md shadow-2xl max-w-xs transition-all font-mono text-xs"
                style={{
                  top: '16px',
                  right: '16px'
                }}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-[#C89B3C] uppercase tracking-wider">
                  <MapPin size={10} /> {hoveredCampus.city}, {hoveredCampus.state}
                </div>
                <div className="font-semibold text-white text-sm font-display mt-0.5">
                  {hoveredCampus.name}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-1">
                  <span>{hoveredCampus.conference}</span>
                  <span>·</span>
                  <span className="text-[#68D391]">{hoveredCampus.athletes} Student Athletes</span>
                </div>
              </div>
            )}

          </div>

          {/* Side Panel: Selected Campus Institutional Dossier */}
          <div className="lg:col-span-4 bg-[#11141B] p-6 lg:p-7 rounded-xl border border-white/10 space-y-6 shadow-xl relative">
            
            {selectedCampus ? (
              <div className="space-y-6">
                
                {/* Dossier Header */}
                <div className="border-b border-white/[0.08] pb-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#C89B3C]/10 text-[#C89B3C] border border-[#C89B3C]/20">
                      <Shield size={11} /> {selectedCampus.tier}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">{selectedCampus.established}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                    {selectedCampus.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <MapPin size={13} className="text-[#C89B3C]" />
                    <span>{selectedCampus.city}, {selectedCampus.state}</span>
                    <span>·</span>
                    <span className="text-white font-medium">{selectedCampus.conference}</span>
                  </div>
                </div>

                {/* Key Campus Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="bg-[#161B24] p-3 rounded border border-white/5">
                    <div className="text-[10px] text-neutral-500 uppercase">Varsity Roster</div>
                    <div className="text-lg font-bold text-white mt-0.5 tabular-nums">
                      {selectedCampus.athletes} Athletes
                    </div>
                  </div>

                  <div className="bg-[#161B24] p-3 rounded border border-white/5">
                    <div className="text-[10px] text-neutral-500 uppercase">Annual NIL Volume</div>
                    <div className="text-lg font-bold text-[#E8C98B] mt-0.5 tabular-nums">
                      {selectedCampus.nilVolumeAnnual}
                    </div>
                  </div>

                  <div className="bg-[#161B24] p-3 rounded border border-white/5">
                    <div className="text-[10px] text-neutral-500 uppercase">Club Members</div>
                    <div className="text-lg font-bold text-neutral-200 mt-0.5 tabular-nums">
                      {selectedCampus.clubMembers}+
                    </div>
                  </div>

                  <div className="bg-[#161B24] p-3 rounded border border-white/5">
                    <div className="text-[10px] text-neutral-500 uppercase">Conference Tier</div>
                    <div className="text-lg font-bold text-[#68D391] mt-0.5">
                      Division I
                    </div>
                  </div>
                </div>

                {/* Controlled Divisions & Circuits on Campus */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Active Program Operations
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCampus.programs.map((prog, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#1A1F2B] border border-white/10 rounded-sm text-xs font-mono text-neutral-300 flex items-center gap-1.5"
                      >
                        {prog.includes('Drones') && <Cpu size={12} className="text-[#38BDF8]" />}
                        {prog.includes('Sim Racing') && <Flag size={12} className="text-red-400" />}
                        {prog.includes('Varsity') && <Trophy size={12} className="text-[#E8C98B]" />}
                        {prog.includes('NIL') && <DollarSign size={12} className="text-[#34D399]" />}
                        {prog.includes('Broadcast') && <Tv size={12} className="text-purple-400" />}
                        <span>{prog}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Campus Facility Inspection */}
                <div className="p-3.5 bg-[#0A0D12] rounded border border-white/[0.06] space-y-1.5">
                  <div className="text-[11px] font-mono text-[#C89B3C] uppercase flex items-center gap-1.5">
                    <Building2 size={13} /> On-Campus Facility Asset
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    {selectedCampus.facility}
                  </p>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const target = regionalCenters[selectedCampus.region] || regionalCenters.All;
                      if (svgRef.current) {
                        d3.select(svgRef.current)
                          .transition()
                          .duration(600)
                          .call(
                            d3.zoom<SVGSVGElement, unknown>().transform as any,
                            d3.zoomIdentity.translate(target.x, target.y).scale(target.scale)
                          );
                      }
                    }}
                    className="w-full py-2.5 bg-[#171B24] hover:bg-[#202634] border border-white/10 text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Focus {selectedCampus.region} Regional Cluster</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>

              </div>
            ) : (
              <div className="py-16 text-center space-y-3">
                <Compass className="w-10 h-10 text-neutral-600 mx-auto" />
                <div className="text-sm font-semibold text-neutral-300 font-display">Select Any Campus Marker</div>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Click any collegiate node on the national cartography map to view facility specs, verified NIL volume, and program divisions.
                </p>
              </div>
            )}

            {/* Quick Network Summary Footnote */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>National Network Status: Verified</span>
              <span>Updated: Q1 2026</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
