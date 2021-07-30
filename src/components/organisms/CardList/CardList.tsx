import SkeletonCardList from '~/components/organisms/SkeletonCardList/SkeletonCardList';
import { useFetchItems } from '~/hooks';

import type { ItemVariants } from '~/commonTypes';
import type { ItemsState } from '~/store';

type Children<T extends ItemVariants> = ({ data }: { data: ItemsState[T] }) => React.ReactNode;

export type CardListProps<T extends ItemVariants> = {
  readonly variant: T;
  readonly children: Children<T>;
};

const CardList = <T extends ItemVariants>({ variant, children }: CardListProps<T>) => {
  const { data, isLoading } = useFetchItems(variant);

  return <>{isLoading() ? <SkeletonCardList lighten /> : children({ data })}</>;
};

export default CardList;
