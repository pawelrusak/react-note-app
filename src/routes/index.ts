export const routes = {
  home: '/',
  notes: '/notes',
  note: '/notes/:id',
  twitters: '/twitters',
  twitter: '/twitters/:id',
  articles: '/articles',
  article: '/articles/:id',
  login: '/login',
  register: '/register',
} as const;

export type RoutesKeys = keyof typeof routes;

export type RoutesPaths = typeof routes[RoutesKeys];
