/*
 *
 * GENERICS
 *
 */
export type Modify<T, R> = Omit<T, keyof R> & R;

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
   * @todo leave only 'Date' type after implement required changes
   * @todo maybe rename from 'created' to 'createdAt'
   */
  readonly created: string | number | Date;
  readonly twitterName?: never;
  readonly articleUrl?: never;
};

export type TwitterItem = Modify<NoteItem, { readonly twitterName: string | null }>;

export type ArticleItem = Modify<NoteItem, { readonly articleUrl: string | null }>;

export type Item = NoteItem | TwitterItem | ArticleItem;
