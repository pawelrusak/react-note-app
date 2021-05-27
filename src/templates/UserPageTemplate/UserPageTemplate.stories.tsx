import { Meta, Story } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { routes } from 'routes';
import UserPageTemplate, { UserPageTemplateProps } from './UserPageTemplate';
import ViewPlaceholder from '../../../.storybook/components/ViewPlaceholder';
import { UserPageTemplateRouterDecorator } from '../../../.storybook/decorators';

export default {
  title: 'Templates/UserPageTemplate',
  component: UserPageTemplate,
  decorators: [StoryRouter()],
} as Meta;

const Template: Story<UserPageTemplateProps> = () => (
  <UserPageTemplate>
    <ViewPlaceholder />
  </UserPageTemplate>
);

export const Default = Template.bind({});
Default.decorators = [StoryRouter()];

export const Note = Template.bind({});
Note.decorators = [UserPageTemplateRouterDecorator(routes.notes)];
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.decorators = [UserPageTemplateRouterDecorator(routes.twitters)];
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.decorators = [UserPageTemplateRouterDecorator(routes.articles)];
Article.parameters = {
  pageContext: 'articles',
};