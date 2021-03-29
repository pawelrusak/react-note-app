import StoryRouter from 'storybook-react-router';
import LoginPage from './LoginPage';
import { StoreDecorator } from '../../../.storybook/decorators';

export default {
  title: 'Views/LoginPage',
  component: LoginPage,
  decorators: [StoryRouter(), StoreDecorator],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Template = (args) => <LoginPage {...args} />;

export const Default = Template.bind({});
