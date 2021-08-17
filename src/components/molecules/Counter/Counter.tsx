import pluralize from 'pluralize';
import styled from 'styled-components';

import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import Skeleton from '~/components/atoms/Skeleton/Skeleton';
import { TEST_ID } from '~/constants/tests';
import { useItemsStatus, usePageTypeContext, useCounter } from '~/hooks';

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.grey500};
`;

const StyledSkeleton = styled(Skeleton)`
  height: ${({ theme }) => theme.fontSize.m};
  width: 10rem;
`;

const StyledAdditionalInfo = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.grey300};
  color: white;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  line-height: 1;
  padding: 0.25rem 0.5rem;
  border-radius: 0.4rem;
  vertical-align: middle;
`;

const Counter = () => {
  const pageType = usePageTypeContext();
  const { isLoading } = useItemsStatus();
  const { currentNumber, isSearching, totalNumber } = useCounter(pageType);

  return isLoading() ? (
    <StyledSkeleton data-testid={TEST_ID.COUNTER.SKELETON} />
  ) : (
    <StyledParagraph data-testid={TEST_ID.COUNTER.PARAGRAPH}>
      {pluralize(pageType, currentNumber, true)}{' '}
      {isSearching() && <StyledAdditionalInfo>total {totalNumber}</StyledAdditionalInfo>}
    </StyledParagraph>
  );
};

export default Counter;
