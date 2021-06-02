/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from 'actions';
import { ItemVariants } from 'commonTypes';
import { RootState } from 'reducers';

export const useFetchItems = <T extends ItemVariants>(itemType: T): RootState[T] => {
  // eslint-disable-next-line
  const items = useSelector((state: RootState) => state[itemType]);
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
