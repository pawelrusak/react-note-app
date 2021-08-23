import pluralize from 'pluralize';
import { Helmet } from 'react-helmet';

import { useActiveItem, useCurrentPageType } from '~/hooks';
import DetailsTemplate from '~/templates/DetailsTemplate/DetailsTemplate';
import { capitalize } from '~/utils';

const DetailsPage = () => {
  const activeItem = useActiveItem();
  const pageType = useCurrentPageType();

  return (
    <>
      <Helmet>
        <title>{`${pluralize.singular(capitalize(pageType))}: "${activeItem.title}"`}</title>
      </Helmet>

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
