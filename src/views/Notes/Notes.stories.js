import StoryRouter from 'storybook-react-router';
import { routes } from 'routes';
import Notes from './Notes';
import { StoreDecorator } from '../../../.storybook/decorators';
import { itemsPageLinks } from '../../../.storybook/links';

export default {
  title: 'Views/Notes',
  component: Notes,
  argTypes: {
    notes: {
      control: null,
    },
  },
  decorators: [StoryRouter(itemsPageLinks, { initialEntries: [routes.notes] }), StoreDecorator],
  parameters: {
    pageContext: 'notes',
  },
};

const Template = (args) => <Notes {...args} />;

export const Default = Template.bind({});
