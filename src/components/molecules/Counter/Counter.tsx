import styled from 'styled-components';

import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import Skeleton from '~/components/atoms/Skeleton/Skeleton';
import { TEST_ID } from '~/constants/tests';
import { useItemsStatus, usePageTypeContext } from '~/hooks';

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

const Counter = () => {
  const pageType = usePageTypeContext();
  const { isLoading } = useItemsStatus();

  return isLoading() ? (
    <StyledSkeleton data-testid={TEST_ID.COUNTER.SKELETON} />
  ) : (
    <StyledParagraph data-testid={TEST_ID.COUNTER.PARAGRAPH}>6 {pageType}</StyledParagraph>
  );
};

export default Counter;
