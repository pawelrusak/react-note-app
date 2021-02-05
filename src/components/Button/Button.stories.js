import Button from './Button';

export default {
  title: 'Button',
  component: Button,
};

// eslint-disable-next-line
const Template = (args) => <Button {...args}>Hello World</Button>;

export const Primary = Template.bind({});
Primary.args = {
  secondary: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
};
