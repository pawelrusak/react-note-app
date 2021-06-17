import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useItemSelector } from './useItemSelector';
import { usePageTypeContext } from './usePageTypeContext';
import { fetchItem } from '~/services';

import type { Item, URLParams, Modify } from '~/commonTypes';

type DetailsItem =
  | Item
  | Modify<
      Omit<Item, 'id'>,
      {
        created: Date | null;
      }
    >;

const emptyItem: DetailsItem = {
  title: '',
  content: '',
  created: null,
  articleUrl: '',
  twitterName: '',
};

export const useActiveItem = () => {
  const [activeItem, setActiveItem] = useState<DetailsItem>(emptyItem);
  const pageType = usePageTypeContext();
  const { id: itemID } = useParams<URLParams>();
  const storeActiveItem = useItemSelector(pageType, itemID);

  useEffect(() => {
    const fetchDataItem = async () => {
      try {
        const { data } = await fetchItem(itemID);
        setActiveItem({ ...data });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-floating-promises
    storeActiveItem ? setActiveItem({ ...storeActiveItem }) : fetchDataItem();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeItem;
};
