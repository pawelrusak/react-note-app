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

export const NoteSucceeded = Template.bind({});
NoteSucceeded.decorators = [GridTemplateRouterDecorator(routes.notes)];
NoteSucceeded.parameters = {
  pageContext: 'notes',
  pageVariant: 'notes',
};

export const NoteLoading = Template.bind({});
NoteLoading.decorators = [GridTemplateRouterDecorator(routes.notes)];
NoteLoading.parameters = {
  state: 'loading',
  pageContext: 'notes',
  pageVariant: 'notes',
};

export const TwitterSucceeded = Template.bind({});
TwitterSucceeded.decorators = [GridTemplateRouterDecorator(routes.twitters)];
TwitterSucceeded.parameters = {
  pageContext: 'twitters',
  pageVariant: 'twitters',
};

export const TwitterLoading = Template.bind({});
TwitterLoading.decorators = [GridTemplateRouterDecorator(routes.twitters)];
TwitterLoading.parameters = {
  state: 'loading',
  pageContext: 'twitters',
  pageVariant: 'twitters',
};

export const ArticleSucceeded = Template.bind({});
ArticleSucceeded.decorators = [GridTemplateRouterDecorator(routes.articles)];
ArticleSucceeded.parameters = {
  pageContext: 'articles',
  pageVariant: 'articles',
};

export const ArticleLoading = Template.bind({});
ArticleLoading.decorators = [GridTemplateRouterDecorator(routes.articles)];
ArticleLoading.parameters = {
  state: 'loading',
  pageContext: 'articles',
  pageVariant: 'articles',
};
