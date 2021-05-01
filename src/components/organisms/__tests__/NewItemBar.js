import { testComponent, render, screen, userEvent, waitFor, cleanup } from 'testUtils';
import { stripSlashPrefix } from 'utils';
import { routes } from 'routes';
import NewItemBar from '../NewItemBar/NewItemBar';
import * as NewItemBarStories from '../NewItemBar/NewItemBar.stories';

const exampleProps = {
  ...NewItemBarStories.Default.args,
};
const getTwitterInput = () => screen.queryByPlaceholderText(/twitter/i);
const getArticleLinkInput = () => screen.queryByPlaceholderText(/link/i);

describe('<NewItemBar />', () => {
  afterEach(cleanup);

  it.each([['notes'], ['twitters'], ['articles']])('display correctly heading', (pageType) => {
    render(<NewItemBar {...exampleProps} />, {
      pageType,
    });

    const newItemBarHeadingContent = pageType;
    const newBarItemHeading = screen.getByRole('heading');

    expect(newBarItemHeading).toHaveTextContent(newItemBarHeadingContent);
  });

  it('trigger the handleClose prop after submit the form', async () => {
    const mockHandleClose = jest.fn(() => ({}));

    render(<NewItemBar {...exampleProps} handleClose={mockHandleClose} />, {
      pageType: stripSlashPrefix(routes.notes),
    });

    const submitButton = screen.queryByRole('button');

    await waitFor(() => userEvent.click(submitButton));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  testComponent(
    () =>
      render(<NewItemBar {...exampleProps} />, {
        pageType: stripSlashPrefix(routes.twitters),
      }),
    {
      suffixTestNames: 'when is twitter page',
    },
  )
    .toBeInTheDocument('twitter name input', () => getTwitterInput())
    .not.toBeInTheDocument('article link input', () => getArticleLinkInput())
    .run();

  /**
   * @todo rename NewItemBarStories.Articles to NewItemBarStories.Article
   */
  testComponent(
    () =>
      render(<NewItemBar {...exampleProps} />, {
        pageType: stripSlashPrefix(routes.articles),
      }),
    {
      suffixTestNames: 'when is article page',
    },
  )
    .toBeInTheDocument('article link input', () => getArticleLinkInput())
    .not.toBeInTheDocument('twitter name input', () => getTwitterInput())
    .run();
});
