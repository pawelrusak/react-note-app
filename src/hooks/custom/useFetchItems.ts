import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '~/actions';
import { ItemVariants } from '~/commonTypes';
import { RootState } from '~/reducers';

export const useFetchItems = <T extends ItemVariants>(itemType: T): RootState[T] => {
  const items = useSelector((state: RootState) => state[itemType]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems(itemType));
  }, [dispatch, itemType]);

  return items;
};
