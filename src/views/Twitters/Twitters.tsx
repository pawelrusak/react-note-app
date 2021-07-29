import Card from '~/components/molecules/Card/Card';
import SkeletonCardList from '~/components/organisms/SkeletonCardList/SkeletonCardList';
import { useFetchItems } from '~/hooks';
import GridTemplate from '~/templates/GridTemplate/GridTemplate';

const Twitters = () => {
  const { data: twitters, loading } = useFetchItems('twitters');

  return (
    <GridTemplate>
      {loading ? (
        <SkeletonCardList lighten />
      ) : (
        twitters.map(({ id, title, content, twitterName, created }) => (
          <Card
            id={id}
            title={title}
            content={content}
            twitterName={twitterName}
            created={created}
            key={id}
          />
        ))
      )}
    </GridTemplate>
  );
};

export default Twitters;
