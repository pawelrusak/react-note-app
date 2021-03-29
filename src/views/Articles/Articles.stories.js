import StoryRouter from 'storybook-react-router';
import { routes } from 'routes';
import Articles from './Articles';
import { StoreDecorator } from '../../../.storybook/decorators';
import { itemsPageLinks } from '../../../.storybook/links';

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
    controls: { hideNoControlsWarning: true },
  },
};

const Template = (args) => <Articles {...args} />;

export const Default = Template.bind({});
