import StoryRouter from 'storybook-react-router';
import { routes } from 'routes';
import { Route } from 'react-router-dom';
import DetailsPage from './DetailsPage';
import { StoreDecorator } from '../../../.storybook/decorators';
import { itemsPageLinks } from '../../../.storybook/links';

/**
 * Hard code sample note id from 'store/__mocks__'
 */
const ITEM_ID = '8885d2d6-b081-4342-8232-e889affa9d93';
const detailsPageNotePath = routes.note.replace(':id', ITEM_ID);
const detailsPageTwitterPath = routes.twitter.replace(':id', ITEM_ID);
const detailsPageArticlePath = routes.article.replace(':id', ITEM_ID);

export default {
  title: 'Views/DetailsPage',
  component: DetailsPage,
  decorators: [StoryRouter(), StoreDecorator],
  argTypes: {
    pathname: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = ({ pathname }) => <Route path={pathname} component={DetailsPage} />;

export const Note = Template.bind({});
Note.decorators = [StoryRouter(itemsPageLinks, { initialEntries: [detailsPageNotePath] })];
Note.args = {
  pathname: routes.note,
};
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.decorators = [StoryRouter(itemsPageLinks, { initialEntries: [detailsPageTwitterPath] })];
Twitter.args = {
  pathname: routes.twitter,
};
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.decorators = [StoryRouter(itemsPageLinks, { initialEntries: [detailsPageArticlePath] })];
Article.args = {
  pathname: routes.article,
};
Article.parameters = {
  pageContext: 'articles',
};
