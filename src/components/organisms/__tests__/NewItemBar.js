import { testComponent, render, screen, userEvent, waitFor, cleanup } from 'testUtils';
import { stripSlashPrefix } from 'utils';
import { routes } from 'routes';
import NewItemBar from '../NewItemBar/NewItemBar';
import * as NewItemBarStories from '../NewItemBar/NewItemBar.stories';

const exampleProps = {
  ...NewItemBarStories.Default.args,
};

const renderNewItemBar = (pageTypeOrPath, handleCloseProp = exampleProps.handleClose) =>
  render(<NewItemBar {...exampleProps} handleClose={handleCloseProp} />, {
    pageType: stripSlashPrefix(pageTypeOrPath),
  });

const queryByTwitterPlaceholderText = () => screen.queryByPlaceholderText(/twitter/i);
const queryByLinkPlaceholderText = () => screen.queryByPlaceholderText(/link/i);
const queryAllByButtonRole = () => screen.queryAllByRole('button');
const getAllByHeadingRole = () => screen.getAllByRole('heading');

describe('<NewItemBar />', () => {
  afterEach(cleanup);

  it.each([['notes'], ['twitters'], ['articles']])('display correctly heading', (pageType) => {
    renderNewItemBar(pageType);

    const newItemBarHeadingContent = pageType;
    const [newBarItemHeading] = getAllByHeadingRole();

    expect(newBarItemHeading).toHaveTextContent(newItemBarHeadingContent);
  });

  it('trigger the handleClose prop after submit the form', async () => {
    const mockHandleClose = jest.fn(() => ({}));

    renderNewItemBar(routes.notes, mockHandleClose);

    const [submitButton] = queryAllByButtonRole();

    await waitFor(() => userEvent.click(submitButton));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  testComponent(() => renderNewItemBar(routes.twitters), {
    suffixTestNames: 'when is twitter page',
  })
    .toBeInTheDocument('twitter name input', queryByTwitterPlaceholderText)
    .not.toBeInTheDocument('article link input', queryByLinkPlaceholderText)
    .run();

  /**
   * @todo rename NewItemBarStories.Articles to NewItemBarStories.Article
   */
  testComponent(() => renderNewItemBar(routes.articles), {
    suffixTestNames: 'when is article page',
  })
    .toBeInTheDocument('article link input', queryByLinkPlaceholderText)
    .not.toBeInTheDocument('twitter name input', queryByTwitterPlaceholderText)
    .run();
});
