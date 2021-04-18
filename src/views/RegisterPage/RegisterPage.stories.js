import StoryRouter from 'storybook-react-router';
import RegisterPage from './RegisterPage';
import { StoreDecorator } from '../../../.storybook/decorators';
import { authPageLinks } from '../../../.storybook/links';

export default {
  title: 'Views/RegisterPage',
  component: RegisterPage,
  decorators: [StoryRouter(authPageLinks), StoreDecorator],
};

const Template = (args) => <RegisterPage {...args} />;

export const Default = Template.bind({});
