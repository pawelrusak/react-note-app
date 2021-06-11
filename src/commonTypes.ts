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

/*
 *
 * VARIANTS
 *
 */
export type ItemVariants = 'notes' | 'twitters' | 'articles';

/*
 *
 * ITEMS
 *
 */
export type NoteItem = {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  /**
   * @todo maybe rename from 'created' to 'createdAt'
   */
  readonly created: Date;
  readonly twitterName?: never;
  readonly articleUrl?: never;
};

export type TwitterItem = Modify<NoteItem, { readonly twitterName: string | null }>;

export type ArticleItem = Modify<NoteItem, { readonly articleUrl: string | null }>;

export type Item = NoteItem | TwitterItem | ArticleItem;

export type NewItem = Omit<Item, 'id' | 'created'>;

/*
 *
 * Other
 *
 */
export type URLParams = {
  id: string;
};
