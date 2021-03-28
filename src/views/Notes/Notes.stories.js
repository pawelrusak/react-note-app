import StoryRouter from 'storybook-react-router';
import Notes from './Notes';
import { StoreDecorator } from '../../../.storybook/decorators';

export default {
  title: 'Views/Notes',
  component: Notes,
  argTypes: {
    notes: {
      control: null,
    },
  },
  decorators: [StoryRouter(), StoreDecorator],
  parameters: {
    pageContext: 'notes',
    controls: { hideNoControlsWarning: true },
  },
};

const Template = (args) => <Notes {...args} />;

export const Default = Template.bind({});
