import { useEffect, useState } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate/DetailsTemplate';
import { useSelector } from 'react-redux';
import { fetchItem } from 'api';
import { useParams } from 'react-router-dom';
import { usePageTypeContext } from 'hooks';

const DetailsPage = () => {
  const pageType = usePageTypeContext();
  const { id: itemID } = useParams();
  const storeActiveItem = useSelector((store) =>
    store?.[pageType]?.find((item) => item.id === itemID),
  );
  const [activeItem, setActiveItem] = useState({
    title: '',
    content: '',
    created: '',
    articleUrl: '',
    twitterName: '',
  });

  useEffect(() => {
    if (storeActiveItem) {
      setActiveItem({ ...storeActiveItem });
    } else {
      fetchItem(itemID)
        .then(({ data: item }) => {
          setActiveItem({ ...item });
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
