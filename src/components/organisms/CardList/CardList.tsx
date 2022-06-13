import styled from 'styled-components';

import Heading from '~/components/atoms/Heading/Heading';
import SkeletonCardList from '~/components/organisms/SkeletonCardList/SkeletonCardList';
import { useFetchItems } from '~/hooks';
import { media, cardListBreakpointsInEm } from '~/theme/mixins';
import { VisuallyHidden } from '~/utils';

import type { Variants } from '~/commonTypes';
import type { ItemsState } from '~/store';

type Children<T extends Variants> = ({ data }: { data: ItemsState[T] }) => React.ReactNode;

const StyledGrid = styled.div`
  & > * {
    margin-bottom: 2rem;
  }

  ${media.greaterThan('sm')`
    
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45.4rem, 1fr));
    grid-auto-rows: min-content;
    gap: 7rem;

    & > * {
      margin-bottom: 0;
    }
  `}

  @media (min-width: ${cardListBreakpointsInEm.smd}) and (max-width: ${cardListBreakpointsInEm.lmd}) {
    gap: 5rem;
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.greaterThan('xl')`
    gap: 8.6rem;
  `}
`;

const StyledEmptyStateTitle = styled(Heading)`
  color: ${({ theme }) => theme.grey500};
  font-size: 3.2rem;
  margin-top: 0;
`;

const StyledEmptyStateWrapper = styled.section`
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
      {isSucceeded() && data.length !== 0 && (
        <StyledGrid as="section">
          <VisuallyHidden as="h2">List of yours notes</VisuallyHidden>
          {children({ data })}
        </StyledGrid>
      )}
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
