import { Meta, Story } from '@storybook/react';

import Time, { TimeProps } from './Time';
import { getEarlierDateOfDay } from '~/utils';

export default {
  title: 'Atoms/Time',
  component: Time,
} as Meta;

const Template: Story<TimeProps> = (props) => <Time {...props} />;

export const Default = Template.bind({});
Default.args = {
  date: getEarlierDateOfDay(3).toISOString(),
};

export const Format = Template.bind({});
Format.args = {
  ...Default.args,
  format: 'DD/MM/YYYY',
};
