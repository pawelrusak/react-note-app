import DetailsTemplate from '~/templates/DetailsTemplate/DetailsTemplate';
import { useActiveItem } from '~/hooks';

const DetailsPage = () => {
  const activeItem = useActiveItem();

  return (
    <DetailsTemplate
      title={activeItem.title}
      created={activeItem.created}
      content={activeItem.content}
      articleUrl={activeItem.articleUrl}
      twitterName={activeItem.twitterName}
    />
  );
};

export default DetailsPage;
