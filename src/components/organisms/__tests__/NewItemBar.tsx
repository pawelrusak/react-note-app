import { build, fake } from '@jackfranklin/test-data-bot';
import { testComponent, render, screen, userEvent, waitFor } from 'testUtils';

import NewItemBar, { NewItemBarProps } from '../NewItemBar/NewItemBar';
import * as NewItemBarStories from '../NewItemBar/NewItemBar.stories';
import { routes, RoutesPaths } from '~/routes';
import { stripSlashPrefix } from '~/utils';

import type { ItemVariants, NewItem } from '~/commonTypes';

const exampleProps = {
  ...NewItemBarStories.Default.args,
} as NewItemBarProps;

const renderNewItemBar = (
  pageTypeOrPath: ItemVariants | RoutesPaths,
  handleCloseProp = exampleProps.handleClose,
) =>
  render(<NewItemBar {...exampleProps} handleClose={handleCloseProp} />, {
    pageType: stripSlashPrefix(pageTypeOrPath) as ItemVariants,
  });

const getByTitlePlaceholderText = () => screen.getByPlaceholderText(/title/i);
const getByDescriptionPlaceholderText = () => screen.getByPlaceholderText(/description/i);
const queryByTwitterPlaceholderText = () => screen.queryByPlaceholderText(/twitter/i);
const queryByLinkPlaceholderText = () => screen.queryByPlaceholderText(/link/i);
const queryAllByButtonRole = () => screen.queryAllByRole('button');
const getAllByHeadingRole = () => screen.getAllByRole('heading');

const twitterUsernameInputTestName = 'twitter username input';
const articleLinkInputTestName = 'twitter username input';

const newItemBuilder = build<NewItem>({
  fields: {
    title: fake((faker) => faker.lorem.words()),
    content: fake((faker) => faker.lorem.sentence()),
  },
});

describe('<NewItemBar />', () => {
  it.each(['notes', 'twitters', 'articles'])(
    'initially, the form should not contain any errors and button should be enable',
    (pageType) => {
      renderNewItemBar(pageType as ItemVariants);

      const [submitButton] = queryAllByButtonRole();

      expect(submitButton).toBeEnabled();
      expect(getByTitlePlaceholderText()).toBeValid();
      expect(getByDescriptionPlaceholderText()).toBeValid();

      if (pageType === 'twitters') {
        expect(queryByTwitterPlaceholderText()).toBeValid();
      }

      if (pageType === 'articles') {
        expect(queryByLinkPlaceholderText()).toBeValid();
      }
    },
  );

  it.todo('disable the submit button for combinations of invalid field values');

  it.each([['notes'], ['twitters'], ['articles']])('display correctly heading', (pageType) => {
    renderNewItemBar(pageType as ItemVariants);

    const newItemBarHeadingContent = pageType;
    const [newBarItemHeading] = getAllByHeadingRole();

    expect(newBarItemHeading).toHaveTextContent(newItemBarHeadingContent);
  });

  it('trigger the handleClose prop after submit the form', async () => {
    const mockHandleClose = jest.fn(() => ({}));
    const fakeNewItem = newItemBuilder();

    renderNewItemBar(routes.notes, mockHandleClose);

    userEvent.type(getByTitlePlaceholderText(), fakeNewItem.title);
    userEvent.type(getByDescriptionPlaceholderText(), fakeNewItem.content);

    const [submitButton] = queryAllByButtonRole();

    await waitFor(() => userEvent.click(submitButton));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  testComponent(() => renderNewItemBar(routes.notes), {
    suffixTestNames: 'when is note page',
  })
    .not.toBeInTheDocument(twitterUsernameInputTestName, queryByTwitterPlaceholderText)
    .not.toBeInTheDocument(articleLinkInputTestName, queryByLinkPlaceholderText)
    .run();

  testComponent(() => renderNewItemBar(routes.twitters), {
    suffixTestNames: 'when is twitter page',
  })
    .toBeInTheDocument(twitterUsernameInputTestName, queryByTwitterPlaceholderText)
    .not.toBeInTheDocument(articleLinkInputTestName, queryByLinkPlaceholderText)
    .run();

  testComponent(() => renderNewItemBar(routes.articles), {
    suffixTestNames: 'when is article page',
  })
    .toBeInTheDocument(articleLinkInputTestName, queryByLinkPlaceholderText)
    .not.toBeInTheDocument(twitterUsernameInputTestName, queryByTwitterPlaceholderText)
    .run();
});
