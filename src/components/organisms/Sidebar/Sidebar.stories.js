import StoryRouter from 'storybook-react-router';
import Sidebar from './Sidebar';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  decorators: [StoryRouter()],
};

const Template = (args) => <Sidebar {...args} />;

export const Normal = Template.bind({});
