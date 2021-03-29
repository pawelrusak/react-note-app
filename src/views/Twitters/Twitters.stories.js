import StoryRouter from 'storybook-react-router';
import { routes } from 'routes';
import Twitters from './Twitters';
import { StoreDecorator } from '../../../.storybook/decorators';
import { itemsPageLinks } from '../../../.storybook/links';

export default {
  title: 'Views/Twitters',
  component: Twitters,
  argTypes: {
    twitters: {
      control: null,
    },
  },
  decorators: [StoryRouter(itemsPageLinks, { initialEntries: [routes.twitters] }), StoreDecorator],
  parameters: {
    pageContext: 'twitters',
    controls: { hideNoControlsWarning: true },
  },
};

const Template = (args) => <Twitters {...args} />;

export const Default = Template.bind({});
