import routeTable from './routes.json';

export type TabKey = 'overview' | 'holdings' | 'strategy' | 'financials' | 'governance' | 'editorial';
export type HoldingsSubTab = 'directory' | 'map' | 'topology';
export type GovernanceSubTab = 'overview' | 'compliance-dashboard' | 'repository' | 'risks' | 'memo';
export type IntelligenceSubTab = 'editorial' | 'market_wire' | 'newsletter';
export type FinancialSubTab = 'simulator' | 'nil_analytics' | 'athlete_calculator';

export interface RouteDefinition {
  path: string;
  tab: TabKey;
  holdingsSubTab?: HoldingsSubTab;
  governanceSubTab?: GovernanceSubTab;
  intelligenceSubTab?: IntelligenceSubTab;
  financialSubTab?: FinancialSubTab;
  division?: string;
  scrollTo?: string;
  title: string;
  description: string;
  h1: string;
  summary: string;
  indexable: boolean;
}

export interface RouteState {
  tab: TabKey;
  holdingsSubTab: HoldingsSubTab;
  governanceSubTab: GovernanceSubTab;
  intelligenceSubTab: IntelligenceSubTab;
  financialSubTab: FinancialSubTab;
  selectedDivision: string;
  scrollTo?: string;
}

export const ROUTES: RouteDefinition[] = routeTable as RouteDefinition[];

const DEFAULT_ROUTE = ROUTES[0];

const normalizePath = (pathname: string): string => {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

export const findRoute = (pathname: string): RouteDefinition | undefined =>
  ROUTES.find((route) => route.path === normalizePath(pathname));

// Fills every field so that navigating between routes always resets sub-state.
export const toRouteState = (route: RouteDefinition): RouteState => ({
  tab: route.tab,
  holdingsSubTab: route.holdingsSubTab ?? 'directory',
  governanceSubTab: route.governanceSubTab ?? 'overview',
  intelligenceSubTab: route.intelligenceSubTab ?? 'editorial',
  financialSubTab: route.financialSubTab ?? 'simulator',
  selectedDivision: route.division ?? 'All',
  scrollTo: route.scrollTo,
});

export const resolveRouteState = (pathname: string): RouteState =>
  toRouteState(findRoute(pathname) ?? DEFAULT_ROUTE);

// Returns the canonical path for the state the page is currently showing.
export const pathForState = (state: Omit<RouteState, 'scrollTo'>): string => {
  if (state.tab === 'holdings' && state.holdingsSubTab === 'directory' && state.selectedDivision !== 'All') {
    const match = ROUTES.find((route) => route.division === state.selectedDivision && route.tab === 'holdings');
    if (match) return match.path;
  }
  const match = ROUTES.find((route) => {
    if (route.scrollTo) return false;
    if (route.tab !== state.tab) return false;
    if (route.division) return false;
    switch (state.tab) {
      case 'holdings': return (route.holdingsSubTab ?? 'directory') === state.holdingsSubTab;
      case 'governance': return (route.governanceSubTab ?? 'overview') === state.governanceSubTab;
      case 'editorial': return (route.intelligenceSubTab ?? 'editorial') === state.intelligenceSubTab;
      case 'financials': return (route.financialSubTab ?? 'simulator') === state.financialSubTab;
      default: return true;
    }
  });
  return match ? match.path : DEFAULT_ROUTE.path;
};
