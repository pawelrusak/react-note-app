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
  isVisible: true,
};

export const Note = Template.bind({});
Note.args = {
  isVisible: true,
};
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  isVisible: true,
};
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Articles = Template.bind({});
Articles.args = {
  isVisible: true,
};
Articles.parameters = {
  pageContext: 'articles',
};
