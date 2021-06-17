import { Route } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';

import { StoreDecorator, DetailsPageRouterDecorator } from '../../../.storybook/decorators';
import DetailsPage from './DetailsPage';
import { routes } from '~/routes';

import type { Meta, Story } from '@storybook/react';

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
} as Meta;

type DetailsPagePaths = typeof routes.note | typeof routes.twitter | typeof routes.article;

const Template: Story = ({ pathname }) => (
  <Route path={pathname as DetailsPagePaths} component={DetailsPage} />
);

export const Note = Template.bind({});
Note.decorators = [DetailsPageRouterDecorator(routes.note)];
Note.args = {
  pathname: routes.note,
};
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.decorators = [DetailsPageRouterDecorator(routes.twitter)];
Twitter.args = {
  pathname: routes.twitter,
};
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.decorators = [DetailsPageRouterDecorator(routes.article)];
Article.args = {
  pathname: routes.article,
};
Article.parameters = {
  pageContext: 'articles',
};
