import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styled from 'styled-components';

dayjs.extend(relativeTime);

const StyledDateInfo = styled.time`
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

type DateInfoRender = (props: { date: string }) => React.ReactNode;

export type DateInfoProps = {
  readonly date: string;
  readonly render?: DateInfoRender;
  /**
   * I haven't implemented a dynamic format date to make it easy to use.
   * Without having to remember the available date formats.
   */
  readonly format?: boolean;
} & React.ComponentPropsWithoutRef<'time'>;

/**
 * Lightweight dedicated component for date formatting. Only ~3 KB vs ~80 KB (see link below)
 *
 * @see {@link https://www.npmtrends.com/dayjs-vs-react-moment-vs-moment}
 */
const DateInfo = ({ date, render, format, dateTime, ...props }: DateInfoProps) => {
  const formattedDate = format ? dayjs(date).format('DD/MM/YYYY') : dayjs(date).fromNow(true);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledDateInfo dateTime={dateTime || date} {...props}>
      {render ? render({ date: formattedDate }) : formattedDate}
    </StyledDateInfo>
  );
};

export default DateInfo;
