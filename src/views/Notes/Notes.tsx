import Card from '~/components/molecules/Card/Card';
import CardList from '~/components/organisms/CardList/CardList';
import CardListTemplate from '~/templates/CardListTemplate/CardListTemplate';
import { DocumentTitle } from '~/utils/components';

const Notes = () => (
  <>
    <DocumentTitle>Notes</DocumentTitle>

    <CardListTemplate>
      <CardList variant="notes">
        {({ data: notes }) =>
          notes.map(({ id, title, content, created }) => (
            <Card id={id} title={title} content={content} created={created} key={id} />
          ))
        }
      </CardList>
    </CardListTemplate>
  </>
);

export default Notes;
