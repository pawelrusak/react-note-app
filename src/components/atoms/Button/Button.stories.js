import Button from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  args: {
    secondary: false,
  },
  argTypes: {
    activecolor: {
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

const Template = (args) => <Button {...args}>Hello, World!</Button>;

export const Note = Template.bind({});
Note.args = {
  activecolor: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  activecolor: 'twitters',
};

export const Article = Template.bind({});
Article.args = {
  activecolor: 'articles',
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
};
