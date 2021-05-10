import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from 'actions';

export const useFetchItems = (itemType) => {
  const items = useSelector((state) => state[itemType]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTwitters = async () => {
      await dispatch(fetchItems(itemType));
    };

    fetchTwitters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return items ?? [];
};
