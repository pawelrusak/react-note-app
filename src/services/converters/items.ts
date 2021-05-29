import { Item, Modify } from 'commonTypes';
import { isArticleItem, isTwitterItem } from 'utils/guards';
import { QueryDocumentSnapshot, Timestamp, QuerySnapshot, ServiceItem } from '../servicesTypes';

type RestItemData =
  | { articleUrl: string; twitterName: never }
  | { articleUrl: never; twitterName: string }
  | { articleUrl: never; twitterName: never };

export const convertQuerySnapshotItem = (item: QueryDocumentSnapshot): Item => {
  const data = item.data() as Modify<ServiceItem, { created: Timestamp }>;

  const dataItem: RestItemData = {} as RestItemData;

  if (isArticleItem(data)) {
    dataItem.articleUrl = data.articleUrl as string;
  } else if (isTwitterItem(data)) {
    dataItem.twitterName = data.twitterName as string;
  }

  return {
    id: item.id,
    title: data.title,
    content: data.content,
    created: data.created.toDate(),
    ...dataItem,
  };
};

export const convertQuerySnapshot = (querySnapshot: QuerySnapshot): Item[] =>
  querySnapshot.docs.map(convertQuerySnapshotItem);
