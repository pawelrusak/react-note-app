import UserPageTemplate, { UserPageTemplateProps } from './UserPageTemplate';
import { ROUTES_PATHS } from '~/constants';
import ViewPlaceholder from '~~/.storybook/components/ViewPlaceholder';
import { UserPageTemplateRouterDecorator, StoreDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Templates/UserPageTemplate',
  component: UserPageTemplate,
  decorators: [StoreDecorator],
} as Meta;

const Template: Story<UserPageTemplateProps> = () => (
  <UserPageTemplate>
    <ViewPlaceholder />
  </UserPageTemplate>
);

export const Note = Template.bind({});
Note.decorators = [UserPageTemplateRouterDecorator(ROUTES_PATHS.notes)];
Note.parameters = {
  pageVariant: 'notes',
};

export const Twitter = Template.bind({});
Twitter.decorators = [UserPageTemplateRouterDecorator(ROUTES_PATHS.twitters)];
Twitter.parameters = {
  pageVariant: 'twitters',
};

export const Article = Template.bind({});
Article.decorators = [UserPageTemplateRouterDecorator(ROUTES_PATHS.articles)];
Article.parameters = {
  pageVariant: 'articles',
};
