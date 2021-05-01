import NewItemBar from './NewItemBar';
import { StoreDecorator } from '../../../../.storybook/decorators';

export default {
  title: 'Organisms/NewItemBar',
  component: NewItemBar,
  decorators: [StoreDecorator],
};

const Template = (args) => <NewItemBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  handleClose: () => ({}),
  isVisible: true,
};

export const Note = Template.bind({});
Note.args = {
  ...Default.args,
};
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  ...Default.args,
};
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Articles = Template.bind({});
Articles.args = {
  ...Default.args,
};
Articles.parameters = {
  pageContext: 'articles',
};
