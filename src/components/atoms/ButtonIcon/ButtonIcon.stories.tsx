import ButtonIcon, { ButtonIconProps } from './ButtonIcon';
import bulbIcon from '~/assets/icons/bulb.svg';
import logoutIcon from '~/assets/icons/logout.svg';
import penIcon from '~/assets/icons/pen.svg';
import plusIcon from '~/assets/icons/plus.svg';
import twitterIcon from '~/assets/icons/twitter.svg';

import type { Meta, Story } from '@storybook/react';

const icons = {
  Bulb: bulbIcon,
  Logout: logoutIcon,
  Pen: penIcon,
  Plus: plusIcon,
  Twitter: twitterIcon,
} as const;

export default {
  title: 'Atoms/ButtonIcon',
  component: ButtonIcon,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'Note',
      values: [
        { name: 'Note', value: 'hsl(49, 100%, 58%)' },
        { name: 'Twitter', value: 'hsl(196, 83%, 75%)' },
        { name: 'Article', value: 'hsl(106, 47%, 64%)' },
      ],
    },
  },
  args: {
    active: true,
  },
  argTypes: {
    icon: {
      control: {
        type: 'inline-radio',
        options: Object.keys(icons),
      },
    },
  },
} as Meta;

const Template: Story<ButtonIconProps & { readonly active?: boolean }> = ({
  icon,
  active,
  ...args
}) => {
  type IconVariants = 'Bulb' | 'Logout' | 'Pen' | 'Plus' | 'Twitter';

  const selectedIcon: string = icons[icon as IconVariants];
  return <ButtonIcon className={active ? 'active' : undefined} icon={selectedIcon} {...args} />;
};

export const Bulb = Template.bind({});
Bulb.args = {
  icon: 'Bulb',
};

export const Logout = Template.bind({});
Logout.args = {
  icon: 'Logout',
};

export const Pen = Template.bind({});
Pen.args = {
  icon: 'Pen',
};

export const Plus = Template.bind({});
Plus.args = {
  icon: 'Plus',
};

export const Twitter = Template.bind({});
Twitter.args = {
  icon: 'Twitter',
};
