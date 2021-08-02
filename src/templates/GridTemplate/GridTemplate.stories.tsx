import StoryRouter from 'storybook-react-router';

import GridTemplate, { GridTemplateProps } from './GridTemplate';
import { routes } from '~/routes';
import ViewPlaceholder from '~~/.storybook/components/ViewPlaceholder';
import { StoreDecorator, GridTemplateRouterDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Templates/GridTemplate',
  component: GridTemplate,
  decorators: [StoreDecorator],
} as Meta;

const Template: Story<GridTemplateProps> = () => (
  <GridTemplate>
    <ViewPlaceholder />
  </GridTemplate>
);

export const Default = Template.bind({});
Default.decorators = [StoryRouter()];

export const Note = Template.bind({});
Note.decorators = [GridTemplateRouterDecorator(routes.notes)];
Note.parameters = {
  pageContext: 'notes',
};

export const NoteLoading = Template.bind({});
NoteLoading.decorators = [GridTemplateRouterDecorator(routes.notes)];
NoteLoading.parameters = {
  state: 'loading',
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.decorators = [GridTemplateRouterDecorator(routes.twitters)];
Twitter.parameters = {
  pageContext: 'twitters',
};

export const TwitterLoading = Template.bind({});
TwitterLoading.parameters = {
  state: 'loading',
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.decorators = [GridTemplateRouterDecorator(routes.articles)];
Article.parameters = {
  pageContext: 'articles',
};

export const ArticleLoading = Template.bind({});
ArticleLoading.parameters = {
  state: 'loading',
  pageContext: 'articles',
};
