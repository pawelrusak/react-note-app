import { connect } from 'react-redux';

import Card from '~/components/molecules/Card/Card';
import GridTemplate from '~/templates/GridTemplate/GridTemplate';

import type { ArticleItem } from '~/commonTypes';
import type { RootState } from '~/store';

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

const mapStateToProps = ({ items }: RootState) => ({ articles: items.articles });

export default connect(mapStateToProps)(Articles);
