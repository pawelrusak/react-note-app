import styled from 'styled-components';

import Heading from '~/components/atoms/Heading/Heading';
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

const StyledEmptyStateTitle = styled(Heading)`
  color: ${({ theme }) => theme.grey500};
  font-size: 3.2rem;
  margin-top: 0;
`;

const StyledEmptyStateWrapper = styled.div`
  display: grid;
  place-items: center;
  min-height: 100%;
`;

export type CardListProps<T extends Variants> = {
  readonly variant: T;
  readonly children: Children<T>;
};

const CardList = <T extends Variants>({ variant, children }: CardListProps<T>) => {
  const { data, isLoading, isSucceeded } = useFetchItems(variant);

  return (
    <>
      {isLoading() && (
        <StyledGrid>
          <SkeletonCardList lighten />
        </StyledGrid>
      )}
      {isSucceeded() && data.length !== 0 && <StyledGrid>{children({ data })}</StyledGrid>}
      {isSucceeded() && data.length === 0 && (
        <StyledEmptyStateWrapper>
          <StyledEmptyStateTitle as="h2">You have no {variant}</StyledEmptyStateTitle>
        </StyledEmptyStateWrapper>
      )}
    </>
  );
};

CardList.Grid = StyledGrid;

export default CardList;
