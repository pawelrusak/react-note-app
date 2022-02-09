import CardListTemplate, { CardListTemplateProps } from './CardListTemplate';
import { routes } from '~/constants';
import ViewPlaceholder from '~~/.storybook/components/ViewPlaceholder';
import { StoreDecorator, CardListTemplateRouterDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Templates/CardListTemplate',
  component: CardListTemplate,
  decorators: [StoreDecorator],
} as Meta;

const Template: Story<CardListTemplateProps> = () => (
  <CardListTemplate>
    <ViewPlaceholder />
  </CardListTemplate>
);

export const NoteSucceeded = Template.bind({});
NoteSucceeded.decorators = [CardListTemplateRouterDecorator(routes.notes)];
NoteSucceeded.parameters = {
  pageVariant: 'notes',
};

export const NoteLoading = Template.bind({});
NoteLoading.decorators = [CardListTemplateRouterDecorator(routes.notes)];
NoteLoading.parameters = {
  state: 'loading',
  pageVariant: 'notes',
};

export const TwitterSucceeded = Template.bind({});
TwitterSucceeded.decorators = [CardListTemplateRouterDecorator(routes.twitters)];
TwitterSucceeded.parameters = {
  pageVariant: 'twitters',
};

export const TwitterLoading = Template.bind({});
TwitterLoading.decorators = [CardListTemplateRouterDecorator(routes.twitters)];
TwitterLoading.parameters = {
  state: 'loading',
  pageVariant: 'twitters',
};

export const ArticleSucceeded = Template.bind({});
ArticleSucceeded.decorators = [CardListTemplateRouterDecorator(routes.articles)];
ArticleSucceeded.parameters = {
  pageVariant: 'articles',
};

export const ArticleLoading = Template.bind({});
ArticleLoading.decorators = [CardListTemplateRouterDecorator(routes.articles)];
ArticleLoading.parameters = {
  state: 'loading',
  pageVariant: 'articles',
};
