import Card from '~/components/molecules/Card/Card';
import CardList from '~/components/organisms/CardList/CardList';
import CardListTemplate from '~/templates/CardListTemplate/CardListTemplate';
import { DocumentTitle } from '~/utils/components';

const Twitters = () => (
  <>
    <DocumentTitle>Twitters</DocumentTitle>

    <CardListTemplate>
      <CardList variant="twitters">
        {({ data: twitters }) =>
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
        }
      </CardList>
    </CardListTemplate>
  </>
);

export default Twitters;
