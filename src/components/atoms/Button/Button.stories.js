import Button from './Button';

const colors = {
  Primary: 'hsl(49, 100%, 58%)',
  Secondary: 'hsl(196, 83%, 75%)',
  Tertiary: 'hsl(106, 47%, 64%)',
};

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: Object.keys(colors),
      },
    },
    secondary: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = ({ color, ...args }) => {
  const selectedColor = colors[color];
  return (
    <Button color={selectedColor} {...args}>
      Hello World
    </Button>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  secondary: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
};
Secondary.argTypes = {
  color: {
    table: {
      disable: true,
    },
  },
};
