import { Meta, Story } from '@storybook/react';

import DateInfo, { DateInfoProps } from './DateInfo';
import { getEarlierDateOfDay } from '~/utils';

export default {
  title: 'Atoms/DateInfo',
  component: DateInfo,
} as Meta;

const Template: Story<DateInfoProps> = (props) => <DateInfo {...props} />;

export const Default = Template.bind({});
Default.args = {
  date: getEarlierDateOfDay(3).toISOString(),
};

export const Format = Template.bind({});
Format.args = {
  ...Default.args,
  format: 'DD/MM/YYYY',
};
