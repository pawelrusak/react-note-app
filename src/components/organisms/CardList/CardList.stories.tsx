import { Meta, Story } from '@storybook/react';

import CardList, { CardListProps } from './CardList';
import ViewPlaceholder from '~~/.storybook/components/ViewPlaceholder';
import { StoreDecorator, CardListGridDecorator } from '~~/.storybook/decorators';

import type { Variants } from '~/commonTypes';

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
  decorators: [StoreDecorator, CardListGridDecorator],
} as Meta;

const Template: Story<CardListProps<Variants>> = (args) => (
  <CardList {...args}>
    {({ data }) =>
      data.map((_, index) => <ViewPlaceholder label={`${index + 1} <Card /> goes here!`} />)
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
