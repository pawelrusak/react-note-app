import GridTemplate from 'templates/GridTemplate/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { connect } from 'react-redux';
import { ArticleItem } from 'commonTypes';
import { RootState } from 'reducers';

export type ArticlesProps = {
  readonly articles: ArticleItem[];
};

const Articles = ({ articles }: ArticlesProps) => (
  <GridTemplate>
    {articles.map(({ id, title, content, articleUrl, created }) => (
      <Card
        id={id}
        title={title}
        content={content}
        articleUrl={articleUrl}
        created={created}
        key={id}
      />
    ))}
  </GridTemplate>
);

const mapStateToProps = ({ articles }: RootState) => ({ articles });

export default connect(mapStateToProps)(Articles);
