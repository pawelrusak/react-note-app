import Card from '~/components/molecules/Card/Card';
import CardList from '~/components/organisms/CardList/CardList';
import GridTemplate from '~/templates/GridTemplate/GridTemplate';
import { DocumentTitle } from '~/utils/components';

const Articles = () => (
  <>
    <DocumentTitle>Articles</DocumentTitle>

    <GridTemplate>
      <CardList variant="articles">
        {({ data: articles }) =>
          articles.map(({ id, title, content, articleUrl, created }) => (
            <Card
              id={id}
              title={title}
              content={content}
              articleUrl={articleUrl}
              created={created}
              key={id}
            />
          ))
        }
      </CardList>
    </GridTemplate>
  </>
);

export default Articles;
