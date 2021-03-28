import StoryRouter from 'storybook-react-router';
import Twitters from './Twitters';
import { StoreDecorator } from '../../../.storybook/decorators';

export default {
  title: 'Views/Twitters',
  component: Twitters,
  argTypes: {
    twitters: {
      control: null,
    },
  },
  decorators: [StoryRouter(), StoreDecorator],
  parameters: {
    pageContext: 'twitters',
    controls: { hideNoControlsWarning: true },
  },
};

const Template = (args) => <Twitters {...args} />;

export const Default = Template.bind({});
