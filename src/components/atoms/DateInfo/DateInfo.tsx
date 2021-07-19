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
  readonly ISOStringDate: string;
  readonly render?: DateInfoRender;
  /**
   * I haven't implemented a dynamic format date to make it easy to use.
   * Without having to remember the available date formats.
   */
  readonly format?: boolean;
  readonly className?: string;
};

/**
 * Lightweight dedicated component for date formatting. Only ~3 KB vs ~80 KB (see link below)
 *
 * @see {@link https://www.npmtrends.com/dayjs-vs-react-moment-vs-moment}
 */
const DateInfo = ({ ISOStringDate, render, format, className }: DateInfoProps) => {
  const date = format
    ? dayjs(ISOStringDate).format('DD/MM/YYYY')
    : dayjs(ISOStringDate).fromNow(true);

  return (
    <StyledDateInfo className={className} dateTime={ISOStringDate}>
      {render ? render({ date }) : date}
    </StyledDateInfo>
  );
};

export default DateInfo;
