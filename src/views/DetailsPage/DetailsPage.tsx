import DetailsTemplate from 'templates/DetailsTemplate/DetailsTemplate';
import { useActiveItem } from 'hooks';

const DetailsPage = () => {
  const activeItem = useActiveItem();

  return (
    <DetailsTemplate
      title={activeItem.title}
      /**
       * @todo simplified this line after change type of "created" property
       */
      created={
        activeItem.created !== null && activeItem.created !== undefined
          ? (activeItem.created as Date)
          : null
      }
      content={activeItem.content}
      articleUrl={activeItem.articleUrl}
      twitterName={activeItem.twitterName}
    />
  );
};

export default DetailsPage;
