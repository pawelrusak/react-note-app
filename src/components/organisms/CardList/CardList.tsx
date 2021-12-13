import styled from 'styled-components';

import SkeletonCardList from '~/components/organisms/SkeletonCardList/SkeletonCardList';
import { useFetchItems } from '~/hooks';

import type { Variants } from '~/commonTypes';
import type { ItemsState } from '~/store';

type Children<T extends Variants> = ({ data }: { data: ItemsState[T] }) => React.ReactNode;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 85px;

  @media (max-width: 1500px) {
    grid-gap: 45px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export type CardListProps<T extends Variants> = {
  readonly variant: T;
  readonly children: Children<T>;
};

const CardList = <T extends Variants>({ variant, children }: CardListProps<T>) => {
  const { data, isLoading } = useFetchItems(variant);

  return <StyledGrid>{isLoading() ? <SkeletonCardList lighten /> : children({ data })}</StyledGrid>;
};

CardList.Grid = StyledGrid;

export default CardList;
