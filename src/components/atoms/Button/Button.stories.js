import Button from './Button';

export default {
  title: 'Atoms/XButton',
  component: Button,
  args: {
    secondary: false,
  },
  argTypes: {
    activeColor: {
      control: {
        type: 'inline-radio',
        options: ['notes', 'twitters', 'articles'],
      },
    },
    secondary: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => <Button {...args}>Hello World</Button>;

export const Note = Template.bind({});
Note.args = {
  activeColor: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  activeColor: 'twitters',
};

export const Article = Template.bind({});
Article.args = {
  activeColor: 'articles',
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
};
