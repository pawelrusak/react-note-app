import { ROUTES_PATHS } from '~/constants';
/*
 *
 * GENERICS
 *
 */
export type Modify<T, R> = Omit<T, keyof R> & R;

/**
 * {@link https://stackoverflow.com/a/43001581 code source}
 */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

/**
 * {@link https://stackoverflow.com/a/61108377 code source}
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Never<T> = Record<keyof T, never>;

export type RequiredOnlyWithNever<T, K extends keyof T> = Pick<Required<T>, K> &
  Record<Exclude<keyof T, K>, never>;

/*
 *
 * VARIANTS
 *
 */
export type Variants = 'notes' | 'twitters' | 'articles';

/*
 *
 * ITEMS
 *
 */
type NoteItem = {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  /**
   * @todo maybe rename from 'created' to 'createdAt'
   */
  readonly created: string;
  readonly twitterName?: never;
  readonly articleUrl?: never;
};

type TwitterNameProp = {
  readonly twitterName: string | null;
};

type ArticleUrlProp = {
  readonly articleUrl: string | null;
};

type TwitterItem = Modify<NoteItem, TwitterNameProp>;

type ArticleItem = Modify<NoteItem, ArticleUrlProp>;

export type Item<V extends Variants = Variants> = {
  notes: NoteItem;
  twitters: TwitterItem;
  articles: ArticleItem;
}[V];

export type NewItem<V extends Variants = Variants> = Omit<Item<V>, 'id' | 'created'>;

export type DetailsItem = Modify<NoteItem, Partial<TwitterNameProp & ArticleUrlProp>>;

/*
 *
 * OTHER
 *
 */
export type AuthCredentials = {
  email: string;
  password: string;
};

export type URLParams = {
  id: string;
};

export type CSSSizeUnitVariants =
  | '%'
  | 'cm'
  | 'mm'
  | 'Q'
  | 'in'
  | 'pc'
  | 'pt'
  | 'px'
  | 'em'
  | 'ex'
  | 'ch'
  | 'rem'
  | 'lh'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax';

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}
/*
 *
 * Routes
 *
 */
type Routes = typeof ROUTES_PATHS;

export type RoutesVariantRootPaths = Routes['notes'] | Routes['twitters'] | Routes['articles'];

export type RoutesKeys = keyof typeof ROUTES_PATHS;

export type RoutesPaths = Routes[RoutesKeys];
