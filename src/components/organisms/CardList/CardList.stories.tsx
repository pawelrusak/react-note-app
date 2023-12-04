import { Meta, Story } from '@storybook/react';

import CardList, { CardListProps } from './CardList';
import ViewPlaceholder from '~~/.storybook/components/ViewPlaceholder';
import { StoreDecorator } from '~~/.storybook/decorators';

import type { Variant } from '~/commonTypes';

export default {
  title: 'Organisms/CardList',
  component: CardList,
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [StoreDecorator],
} as Meta;

const Template: Story<CardListProps<Variant>> = (args) => (
  <CardList {...args}>
    {({ data }) =>
      data.map(({ id }, index) => (
        <ViewPlaceholder key={id} label={`${index + 1} <Card /> goes here!`} />
      ))
    }
  </CardList>
);

export const LoadingNote = Template.bind({});
LoadingNote.args = {
  variant: 'notes',
};
LoadingNote.parameters = {
  pageVariant: 'notes',
  state: 'loading',
};

export const SucceededNote = Template.bind({});
SucceededNote.args = {
  ...LoadingNote.args,
};
SucceededNote.parameters = {
  pageVariant: 'notes',
};

export const NoNote = Template.bind({});
NoNote.args = {
  ...LoadingNote.args,
};
NoNote.parameters = {
  pageVariant: 'notes',
  state: 'empty',
};

export const LoadingTwitter = Template.bind({});
LoadingTwitter.args = {
  variant: 'twitters',
};
LoadingTwitter.parameters = {
  pageVariant: 'twitters',
  state: 'loading',
};

export const SucceededTwitter = Template.bind({});
SucceededTwitter.args = {
  ...LoadingTwitter.args,
};
SucceededTwitter.parameters = {
  pageVariant: 'twitters',
};

export const NoTwitter = Template.bind({});
NoTwitter.args = {
  ...LoadingNote.args,
};
NoTwitter.parameters = {
  pageVariant: 'twitters',
  state: 'empty',
};

export const LoadingArticle = Template.bind({});
LoadingArticle.args = {
  variant: 'articles',
};
LoadingArticle.parameters = {
  pageVariant: 'articles',
  state: 'loading',
};

export const SucceededArticle = Template.bind({});
SucceededArticle.args = {
  ...LoadingArticle.args,
};
SucceededArticle.parameters = {
  pageVariant: 'articles',
};

export const NoArticle = Template.bind({});
NoArticle.args = {
  ...LoadingNote.args,
};
NoArticle.parameters = {
  pageVariant: 'articles',
  state: 'empty',
};
