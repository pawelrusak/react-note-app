import { Route } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';

import DetailsPage from './DetailsPage';
import { ROUTES_PATHS } from '~/constants';
import { StoreDecorator, DetailsPageRouterDecorator } from '~~/.storybook/decorators';

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

type DetailsPagePaths =
  | typeof ROUTES_PATHS.note
  | typeof ROUTES_PATHS.twitter
  | typeof ROUTES_PATHS.article;

const Template: Story = ({ pathname }) => (
  <Route path={pathname as DetailsPagePaths} component={DetailsPage} />
);

export const Note = Template.bind({});
Note.decorators = [DetailsPageRouterDecorator(ROUTES_PATHS.note)];
Note.args = {
  pathname: ROUTES_PATHS.note,
};
Note.parameters = {
  pageVariant: 'notes',
};

export const Twitter = Template.bind({});
Twitter.decorators = [DetailsPageRouterDecorator(ROUTES_PATHS.twitter)];
Twitter.args = {
  pathname: ROUTES_PATHS.twitter,
};
Twitter.parameters = {
  pageVariant: 'twitters',
};

export const Article = Template.bind({});
Article.decorators = [DetailsPageRouterDecorator(ROUTES_PATHS.article)];
Article.args = {
  pathname: ROUTES_PATHS.article,
};
Article.parameters = {
  pageVariant: 'articles',
};
