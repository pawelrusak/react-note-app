import Button from './Button';

export default {
  title: 'Atoms/Button',
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

export const Primary = Template.bind({});
Primary.args = {
  activeColor: 'notes',
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
};
