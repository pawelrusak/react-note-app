import StoryRouter from 'storybook-react-router';
import RegisterPage from './RegisterPage';
import { StoreDecorator } from '../../../.storybook/decorators';

export default {
  title: 'Views/RegisterPage',
  component: RegisterPage,
  decorators: [StoryRouter(), StoreDecorator],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Template = (args) => <RegisterPage {...args} />;

export const Default = Template.bind({});
