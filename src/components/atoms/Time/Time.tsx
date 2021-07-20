import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export type TimeProps = {
  readonly date: Exclude<dayjs.ConfigType, null | undefined>;
  /**
   * The available date format can be found in the link below:
   * @see https://day.js.org/docs/en/display/format#docsNav
   */
  readonly format?: string;
} & React.ComponentPropsWithoutRef<'time'>;

/**
 * Lightweight dedicated component for date formatting. Only ~3 KB vs ~80 KB (see link below)
 *
 * @see {@link https://www.npmtrends.com/dayjs-vs-react-moment-vs-moment}
 */
const Time = ({ date, format, dateTime, ...props }: TimeProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <time {...props} dateTime={dateTime || dayjs(date).format()}>
    {format ? dayjs(date).format(format) : dayjs(date).fromNow(true)}
  </time>
);

export default Time;
