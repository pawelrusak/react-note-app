import Card from '~/components/molecules/Card/Card';
import { useFetchItems } from '~/hooks';
import GridTemplate from '~/templates/GridTemplate/GridTemplate';

const Twitters = () => {
  const twitters = useFetchItems('twitters');

  return (
    <GridTemplate>
      {twitters.length > 0 &&
        twitters.map(({ id, title, content, twitterName, created }) => (
          <Card
            id={id}
            title={title}
            content={content}
            twitterName={twitterName}
            created={created}
            key={id}
          />
        ))}
    </GridTemplate>
  );
};

export default Twitters;
