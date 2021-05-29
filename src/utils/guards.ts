import { Item, ArticleItem, TwitterItem, Modify } from 'commonTypes';
import { ServiceItem } from '../services/servicesTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServiceItemWithAnyTypeCreatedProp = Modify<ServiceItem, { created: any }>;

export const isArticleItem = (
  obj: Item | ServiceItemWithAnyTypeCreatedProp,
): obj is ArticleItem => {
  return typeof obj === 'object' && Boolean(obj.articleUrl) && !obj.twitterName;
};

export const isTwitterItem = (
  obj: Item | ServiceItemWithAnyTypeCreatedProp,
): obj is TwitterItem => {
  return typeof obj === 'object' && !obj.articleUrl && Boolean(obj.twitterName);
};
