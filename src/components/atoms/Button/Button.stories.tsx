import Button, { ButtonProps } from './Button';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Atoms/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Hello, World!</Button>;

export const Note = Template.bind({});
Note.args = {
  activecolor: 'notes',
};
Note.argTypes = {
  activecolor: {
    control: {
      type: 'inline-radio',
      options: ['notes', 'twitters', 'articles'],
    },
  },
  secondary: {
    table: {
      disable: true,
    },
  },
};

export const Twitter = Template.bind({});
Twitter.args = {
  activecolor: 'twitters',
};
Twitter.argTypes = {
  ...Note.argTypes,
};

export const Article = Template.bind({});
Article.args = {
  activecolor: 'articles',
};
Article.argTypes = {
  ...Note.argTypes,
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
};
Secondary.argTypes = {
  secondary: {
    control: {
      type: 'boolean',
    },
  },
  activecolor: {
    table: {
      disable: true,
    },
  },
};
