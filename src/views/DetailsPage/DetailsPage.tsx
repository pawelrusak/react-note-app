import { useActiveItem } from '~/hooks';
import DetailsTemplate from '~/templates/DetailsTemplate/DetailsTemplate';

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
