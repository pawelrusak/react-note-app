import StoryRouter from 'storybook-react-router';
import Articles from './Articles';
import { StoreDecorator } from '../../../.storybook/decorators';

export default {
  title: 'Views/Articles',
  component: Articles,
  argTypes: {
    articles: {
      control: null,
    },
  },
  decorators: [StoryRouter(), StoreDecorator],
  parameters: {
    pageContext: 'articles',
    controls: { hideNoControlsWarning: true },
  },
};

const Template = (args) => <Articles {...args} />;

export const Default = Template.bind({});
