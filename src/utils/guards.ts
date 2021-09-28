import type { Item } from '~/commonTypes';
import type { DocumentItem } from '~/services/servicesTypes';

export const isArticleItem = (obj: Item | DocumentItem): obj is Item<'articles'> => {
  return typeof obj === 'object' && Boolean(obj.articleUrl) && !obj.twitterName;
};

export const isTwitterItem = (obj: Item | DocumentItem): obj is Item<'twitters'> => {
  return typeof obj === 'object' && !obj.articleUrl && Boolean(obj.twitterName);
};

export const isNumber = (value: unknown): value is number => typeof value === 'number';
