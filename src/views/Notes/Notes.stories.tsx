import StoryRouter from 'storybook-react-router';

import { StoreDecorator } from '../../../.storybook/decorators';
import { itemsPageLinks } from '../../../.storybook/links';
import Notes, { NotesProps } from './Notes';
import { routes } from '~/routes';

import type { Meta, Story } from '@storybook/react';

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
} as Meta;

const Template: Story<NotesProps> = (args) => <Notes {...args} />;

export const Default = Template.bind({});
