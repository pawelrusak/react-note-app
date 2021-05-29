import { Item, ArticleItem, TwitterItem } from 'commonTypes';
import { DocumentItem } from '../services/servicesTypes';

export const isArticleItem = (obj: Item | DocumentItem): obj is ArticleItem => {
  return typeof obj === 'object' && Boolean(obj.articleUrl) && !obj.twitterName;
};

export const isTwitterItem = (obj: Item | DocumentItem): obj is TwitterItem => {
  return typeof obj === 'object' && !obj.articleUrl && Boolean(obj.twitterName);
};
