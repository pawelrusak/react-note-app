import UserPageTemplate, { UserPageTemplateProps } from './UserPageTemplate';
import { routes } from '~/constants';
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
Note.decorators = [UserPageTemplateRouterDecorator(routes.notes)];
Note.parameters = {
  pageVariant: 'notes',
};

export const Twitter = Template.bind({});
Twitter.decorators = [UserPageTemplateRouterDecorator(routes.twitters)];
Twitter.parameters = {
  pageVariant: 'twitters',
};

export const Article = Template.bind({});
Article.decorators = [UserPageTemplateRouterDecorator(routes.articles)];
Article.parameters = {
  pageVariant: 'articles',
};
