import Card from '~/components/molecules/Card/Card';
import CardList from '~/components/organisms/CardList/CardList';
import GridTemplate from '~/templates/GridTemplate/GridTemplate';

const Notes = () => (
  <GridTemplate>
    <CardList variant="notes">
      {({ data: notes }) =>
        notes.map(({ id, title, content, created }) => (
          <Card id={id} title={title} content={content} created={created} key={id} />
        ))
      }
    </CardList>
  </GridTemplate>
);

export default Notes;
