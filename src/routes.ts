import routeTable from './routes.json';
import { DoorKey } from './data/programs';

export type PublicViewKey =
  | 'home'
  | 'door'
  | 'program'
  | 'institutions'
  | 'investors'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'intelligence'
  | 'login';

export type IntelligenceSubTab = 'editorial' | 'market_wire' | 'newsletter';

export interface RouteDefinition {
  path: string;
  view: PublicViewKey;
  door?: DoorKey;
  programId?: string;
  intelligenceSubTab?: IntelligenceSubTab;
  title: string;
  description: string;
  h1: string;
  summary: string;
  indexable: boolean;
}

export const ROUTES: RouteDefinition[] = routeTable as RouteDefinition[];

const DEFAULT_ROUTE = ROUTES[0];

export const normalizePath = (pathname: string): string => {
  const clean = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
};

export const findRoute = (pathname: string): RouteDefinition => {
  const normalized = normalizePath(pathname);
  return ROUTES.find((route) => route.path === normalized) ?? DEFAULT_ROUTE;
};

export const isKnownRoute = (pathname: string): boolean => {
  const normalized = normalizePath(pathname);
  return ROUTES.some((route) => route.path === normalized);
};
