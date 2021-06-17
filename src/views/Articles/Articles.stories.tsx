import { Meta, Story } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import { StoreDecorator } from '../../../.storybook/decorators';
import { itemsPageLinks } from '../../../.storybook/links';
import Articles, { ArticlesProps } from './Articles';
import { routes } from '~/routes';

export default {
  title: 'Views/Articles',
  component: Articles,
  argTypes: {
    articles: {
      control: null,
    },
  },
  decorators: [StoryRouter(itemsPageLinks, { initialEntries: [routes.articles] }), StoreDecorator],
  parameters: {
    pageContext: 'articles',
  },
} as Meta;

const Template: Story<ArticlesProps> = (args) => <Articles {...args} />;

export const Default = Template.bind({});
