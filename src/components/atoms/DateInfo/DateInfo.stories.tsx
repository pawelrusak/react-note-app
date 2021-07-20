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

export const Render = Template.bind({});
Render.args = {
  ...Default.args,
  render: ({ date }) => (
    <>
      <mark>React node text</mark> - {date}
    </>
  ),
};

export const Format = Template.bind({});
Format.args = {
  ...Default.args,
  format: true,
};
