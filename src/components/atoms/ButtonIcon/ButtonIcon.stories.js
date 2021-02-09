import bulbIcon from 'assets/icons/bulb.svg';
import logoutIcon from 'assets/icons/logout.svg';
import penIcon from 'assets/icons/pen.svg';
import plusIcon from 'assets/icons/plus.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import ButtonIcon from './ButtonIcon';

const icons = { bulbIcon, logoutIcon, penIcon, plusIcon, twitterIcon };

export default {
  title: 'Atoms/ButtonIcon',
  component: ButtonIcon,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'Primary',
      values: [
        { name: 'Primary', value: 'hsl(49, 100%, 58%)' },
        { name: 'Secondary', value: 'hsl(196, 83%, 75%)' },
        { name: 'Tertiary', value: 'hsl(106, 47%, 64%)' },
      ],
    },
  },
  args: {
    active: true,
  },
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: Object.keys(icons),
      },
    },
  },
};

const Template = ({ icon, ...args }) => {
  const selectedIcon = icons[icon];
  return <ButtonIcon icon={selectedIcon} {...args} />;
};

export const Bulb = Template.bind({});
Bulb.args = {
  icon: 'bulbIcon',
};

export const Logout = Template.bind({});
Logout.args = {
  icon: 'logoutIcon',
};

export const Pen = Template.bind({});
Pen.args = {
  icon: 'penIcon',
};

export const Plus = Template.bind({});
Plus.args = {
  icon: 'plusIcon',
};

export const Twitter = Template.bind({});
Twitter.args = {
  icon: 'twitterIcon',
};
