import { useEffect } from 'react';
import GridTemplate from 'templates/GridTemplate/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from 'actions';

const Twitters = () => {
  const twitters = useSelector((state) => state.twitters ?? []);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTwitters = async () => {
      await dispatch(fetchItems('twitters'));
    };

    fetchTwitters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
