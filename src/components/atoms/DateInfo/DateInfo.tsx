import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export type DateInfoProps = {
  readonly date: Exclude<dayjs.ConfigType, null | undefined>;
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
const DateInfo = ({ date, format, dateTime, ...props }: DateInfoProps) => {
  const formattedDate = format ? dayjs(date).format('DD/MM/YYYY') : dayjs(date).fromNow(true);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <time dateTime={dateTime || dayjs(date).format()} {...props}>
      {formattedDate}
    </time>
  );
};

export default DateInfo;
