import { Meta, Story } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { routes } from '~/routes';
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
  },
} as Meta;

const Template: Story = (args) => <Twitters {...args} />;

export const Default = Template.bind({});
