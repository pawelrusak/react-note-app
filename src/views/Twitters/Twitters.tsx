import Card from '~/components/molecules/Card/Card';
import CardList from '~/components/organisms/CardList/CardList';
import GridTemplate from '~/templates/GridTemplate/GridTemplate';
import { DocumentTitle } from '~/utils/components';

const Twitters = () => (
  <>
    <DocumentTitle>Twitters</DocumentTitle>

    <GridTemplate>
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
    </GridTemplate>
  </>
);

export default Twitters;
