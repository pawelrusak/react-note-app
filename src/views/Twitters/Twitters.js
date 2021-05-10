import GridTemplate from 'templates/GridTemplate/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { useFetchItems } from 'hooks';

const Twitters = () => {
  const twitters = useFetchItems('twitters');

  return (
    <GridTemplate>
      {twitters.map(({ id, title, content, twitterName, created }) => (
        <Card
          id={id}
          cardType="twitters"
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
