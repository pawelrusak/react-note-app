import pluralize from 'pluralize';

import { useActiveItem, useCurrentPageVariant } from '~/hooks';
import DetailsTemplate from '~/templates/DetailsTemplate/DetailsTemplate';
import { DocumentTitle } from '~/utils/components';

const DetailsPage = () => {
  const activeItem = useActiveItem();
  const pageVariant = useCurrentPageVariant();

  return (
    <>
      <DocumentTitle capitalize>
        {pluralize.singular(pageVariant)}: &quot;{activeItem.title}&quot;
      </DocumentTitle>

      <DetailsTemplate
        title={activeItem.title}
        created={activeItem.created}
        content={activeItem.content}
        articleUrl={activeItem.articleUrl}
        twitterName={activeItem.twitterName}
      />
    </>
  );
};

export default DetailsPage;
