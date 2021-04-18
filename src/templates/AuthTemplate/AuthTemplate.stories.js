import StoryRouter from 'storybook-react-router';
import AuthTemplate from './AuthTemplate';
import ViewPlaceholder from '../../../.storybook/components/ViewPlaceholder';

export default {
  title: 'Templates/AuthTemplate',
  component: AuthTemplate,
  decorators: [StoryRouter()],
};

const Template = () => (
  <AuthTemplate>
    <ViewPlaceholder />
  </AuthTemplate>
);

export const Default = Template.bind({});
