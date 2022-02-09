import Search from './Search';
import { StoreDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Molecules/Search',
  component: Search,
  decorators: [StoreDecorator],
} as Meta;

export const Default: Story = () => <Search />;
Default.parameters = {
  pageVariant: 'notes',
};
