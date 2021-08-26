// the internal constant
const BASE_NEW_ITEM_KEYS = ['title', 'content'] as const;

export const NEW_ITEM_VARIANTS_KEYS = {
  notes: BASE_NEW_ITEM_KEYS,
  articles: [...BASE_NEW_ITEM_KEYS, 'articleUrl'],
  twitters: [...BASE_NEW_ITEM_KEYS, 'twitterName'],
} as const;
