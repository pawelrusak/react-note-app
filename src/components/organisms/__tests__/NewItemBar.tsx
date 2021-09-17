import { build, fake } from '@jackfranklin/test-data-bot';
import {
  testComponent,
  render,
  screen,
  userEvent,
  waitFor,
  getPairOfPathsAndPageTypes,
} from 'testUtils';

import NewItemBar, { NewItemBarProps } from '../NewItemBar/NewItemBar';
import * as NewItemBarStories from '../NewItemBar/NewItemBar.stories';
import { routes } from '~/routes';

import type { NewItem, RoutesVariantRootPaths } from '~/commonTypes';

const exampleProps = {
  ...NewItemBarStories.Note.args,
} as NewItemBarProps;

const renderNewItemBar = (
  path: RoutesVariantRootPaths,
  handleCloseProp = exampleProps.handleClose,
) =>
  render(<NewItemBar {...exampleProps} handleClose={handleCloseProp} />, {
    path,
  });

const getByTitlePlaceholderText = () => screen.getByPlaceholderText(/title/i);
const getByDescriptionPlaceholderText = () => screen.getByPlaceholderText(/description/i);
const queryByTwitterPlaceholderText = () => screen.queryByPlaceholderText(/twitter/i);
const queryByLinkPlaceholderText = () => screen.queryByPlaceholderText(/link/i);
const queryAllByButtonRole = () => screen.queryAllByRole('button');
const getAllByHeadingRole = () => screen.getAllByRole('heading');
const getByAddNoteButtonRole = () => screen.getByRole('button', { name: /add note/i });

const twitterUsernameInputTestName = 'twitter username input';
const articleLinkInputTestName = 'twitter username input';

const newItemBuilder = build<NewItem>({
  fields: {
    title: fake((faker) => faker.lorem.words()),
    content: fake((faker) => faker.lorem.sentence()),
  },
});

describe('<NewItemBar />', () => {
  it.each([routes.notes, routes.twitters, routes.articles])(
    'initially, the form should not contain any errors and button should be enable',
    (path) => {
      renderNewItemBar(path);

      const [submitButton] = queryAllByButtonRole();

      expect(submitButton).toBeEnabled();
      expect(getByTitlePlaceholderText()).toBeValid();
      expect(getByDescriptionPlaceholderText()).toBeValid();

      if (path === routes.twitters) {
        expect(queryByTwitterPlaceholderText()).toBeValid();
      }

      if (path === routes.articles) {
        expect(queryByLinkPlaceholderText()).toBeValid();
      }
    },
  );

  it.todo('disable the submit button for combinations of invalid field values');

  it.each(getPairOfPathsAndPageTypes())('display correctly heading', (path, variant) => {
    renderNewItemBar(path);

    const [newBarItemHeading] = getAllByHeadingRole();

    expect(newBarItemHeading).toHaveTextContent(variant);
  });

  it('trigger the handleClose prop and prepare form after submit the form', async () => {
    const mockHandleClose = jest.fn(() => ({}));
    const fakeNewItem = newItemBuilder();

    renderNewItemBar(routes.notes, mockHandleClose);

    userEvent.type(getByTitlePlaceholderText(), fakeNewItem.title);
    userEvent.type(getByDescriptionPlaceholderText(), fakeNewItem.content);

    await waitFor(() => userEvent.click(getByAddNoteButtonRole()));

    // prepare form:
    // 1. Enable the submit button
    expect(getByAddNoteButtonRole()).toBeEnabled();
    // 2. Reset form fields
    expect(getByDescriptionPlaceholderText()).toHaveValue('');
    expect(getByDescriptionPlaceholderText()).toHaveValue('');

    // trigger the handleClose prop
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
