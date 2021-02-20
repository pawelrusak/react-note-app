import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { v4 as getUuid } from 'uuid';

const articles = [
  {
    id: getUuid(),
    title: 'React on my mind',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    articleUrl: 'https://youtube.com/helloroman',
    created: '1 day',
  },
  {
    id: getUuid(),
    title: 'Wish you React',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    articleUrl: 'https://youtube.com/helloroman',
    created: '1 day',
  },
  {
    id: getUuid(),
    title: 'You gave React a bad name',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    articleUrl: 'https://youtube.com/helloroman',
    created: '5 days',
  },
  {
    id: getUuid(),
    title: 'Is it React you looking for?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    articleUrl: 'https://youtube.com/helloroman',
    created: '10 days',
  },
];

const Articles = () => (
  <GridTemplate pageType="articles">
    <>
      {articles.map(({ id, title, content, articleUrl, created }) => (
        <Card
          id={id}
          cardType="articles"
          title={title}
          content={content}
          articleUrl={articleUrl}
          created={created}
          key={id}
        />
      ))}
    </>
  </GridTemplate>
);

export default Articles;
