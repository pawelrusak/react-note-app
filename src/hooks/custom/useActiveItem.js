import { useEffect, useState } from 'react';
import { fetchItem } from 'services';
import { useParams } from 'react-router-dom';
import { usePageTypeContext } from './usePageTypeContext';
import { useItemSelector } from './useItemSelector';

const emptyItem = {
  title: '',
  content: '',
  created: '',
  articleUrl: '',
  twitterName: '',
};

export const useActiveItem = () => {
  const [activeItem, setActiveItem] = useState(emptyItem);
  const pageType = usePageTypeContext();
  const { id: itemID } = useParams();
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

    // eslint-disable-next-line no-unused-expressions
    storeActiveItem ? setActiveItem({ ...storeActiveItem }) : fetchDataItem();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeItem;
};
