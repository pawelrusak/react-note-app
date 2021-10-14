import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useItemSelector } from './useItemSelector';
import { useCurrentPageVariant } from '~/context';
import { fetchItem } from '~/services';

import type { URLParams, DetailsItem } from '~/commonTypes';

const emptyItem: DetailsItem = {
  id: '',
  title: '',
  content: '',
  created: '',
  articleUrl: '',
  twitterName: '',
};

export const useActiveItem = () => {
  const [activeItem, setActiveItem] = useState<DetailsItem>(emptyItem);
  const pageVariant = useCurrentPageVariant();
  const { id: itemID } = useParams<URLParams>();
  const storeActiveItem = useItemSelector(pageVariant, itemID);

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
  }, [itemID, storeActiveItem]);

  return activeItem;
};
