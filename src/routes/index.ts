import type { routes } from '~/constants';

export type RoutesKeys = keyof typeof routes;

export type RoutesPaths = typeof routes[RoutesKeys];
