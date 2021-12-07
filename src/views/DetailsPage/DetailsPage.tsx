import pluralize from 'pluralize';
import styled from 'styled-components';

import Heading from '~/components/atoms/Heading/Heading';
import { useCurrentPageVariant, useDetailsItem } from '~/hooks';
import DetailsTemplate from '~/templates/DetailsTemplate/DetailsTemplate';
import SkeletonDetailsTemplate from '~/templates/SkeletonDetailsTemplate/SkeletonDetailsTemplate';
import UserPageTemplate from '~/templates/UserPageTemplate/UserPageTemplate';
import { DocumentTitle } from '~/utils/components';

const StyledEmptyStateWrapper = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
`;

const StyledEmptyStateTitle = styled(Heading)`
  color: ${({ theme }) => theme.grey500};
`;

const DetailsPage = () => {
  const pageVariant = useCurrentPageVariant();
  const { data: detailsItem, isSucceeded, isLoading, isFailed } = useDetailsItem();

  return (
    <>
      <DocumentTitle capitalize>
        {pluralize.singular(pageVariant)}: &quot;
        {isSucceeded() && detailsItem ? detailsItem.title : 'Loading...'}&quot;
      </DocumentTitle>

      {isLoading() && <SkeletonDetailsTemplate />}
      {isFailed() && (
        <UserPageTemplate>
          <StyledEmptyStateWrapper>
            <StyledEmptyStateTitle as="h2">
              No {pluralize.singular(pageVariant)} found.
            </StyledEmptyStateTitle>
          </StyledEmptyStateWrapper>
        </UserPageTemplate>
      )}
      {isSucceeded() && detailsItem && (
        <DetailsTemplate
          id={detailsItem.id}
          title={detailsItem.title}
          created={detailsItem.created}
          content={detailsItem.content}
          articleUrl={detailsItem.articleUrl}
          twitterName={detailsItem.twitterName}
        />
      )}
    </>
  );
};

export default DetailsPage;
