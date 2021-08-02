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

export const SucceededNote = Template.bind({});
SucceededNote.decorators = [GridTemplateRouterDecorator(routes.notes)];
SucceededNote.parameters = {
  pageContext: 'notes',
};

export const NoteLoading = Template.bind({});
NoteLoading.decorators = [GridTemplateRouterDecorator(routes.notes)];
NoteLoading.parameters = {
  state: 'loading',
  pageContext: 'notes',
};

export const SucceededTwitter = Template.bind({});
SucceededTwitter.decorators = [GridTemplateRouterDecorator(routes.twitters)];
SucceededTwitter.parameters = {
  pageContext: 'twitters',
};

export const TwitterLoading = Template.bind({});
TwitterLoading.parameters = {
  state: 'loading',
  pageContext: 'twitters',
};

export const SucceededArticle = Template.bind({});
SucceededArticle.decorators = [GridTemplateRouterDecorator(routes.articles)];
SucceededArticle.parameters = {
  pageContext: 'articles',
};

export const ArticleLoading = Template.bind({});
ArticleLoading.parameters = {
  state: 'loading',
  pageContext: 'articles',
};
