import { build, fake } from '@jackfranklin/test-data-bot';
import { render, screen, userEvent, getPairOfPathsAndPageTypes, waitFor } from 'testUtils';
import { fakeStateWithDataAndLoggedInUser } from 'testUtils/fakers';

import CardListTemplate from '../CardListTemplate/CardListTemplate';
import { TEST_ID, routes } from '~/constants';

import type { Item, RoutesVariantRootPaths } from '~/commonTypes';

jest.mock('~/services');

const renderCardListTemplate = (path: RoutesVariantRootPaths = routes.notes) =>
  render(
    <CardListTemplate>
      <></>
    </CardListTemplate>,
    {
      path,
      initialState: fakeStateWithDataAndLoggedInUser,
    },
  );

const getAllByHeadingRole = () => screen.getAllByRole('heading');
const getNewItemBarWrapper = () => screen.getByTestId(TEST_ID.NEW_ITEM_BAR.WRAPPER);
const getByTitlePlaceholderText = () => screen.getByPlaceholderText(/title/i);
const getByDescriptionPlaceholderText = () => screen.getByPlaceholderText(/description/i);
const getByAddNoteNameAndButtonRole = () => screen.getByRole('button', { name: /add note/i });
const getByToggleNewItemBarNameAndButtonRole = () =>
  screen.getByRole('button', { name: /toggle new item bar/i });

const CSS_STYLES = {
  TRANSFORM_TRANSLATE: {
    VISIBLE: 'transform: translate(0)',
    NOT_VISIBLE: 'transform: translate(100%)',
  },
  TRANSFORM_ROTATE: {
    ACTIVE: 'transform: rotate(-45deg)',
    NOT_ACTIVE: 'transform: rotate(0)',
  },
} as const;

const noteItemBuilder = build<Omit<Item<'notes'>, 'id' | 'created'>>({
  fields: {
    title: fake((faker) => faker.lorem.words()),
    content: fake((faker) => faker.lorem.sentence()),
  },
});

describe('<CardListTemplate />', () => {
  it.each(getPairOfPathsAndPageTypes())(
    'for the "%s" url path should display the heading with the "%s" text content',
    (path, pageVariant) => {
      renderCardListTemplate(path);

      const [gridTemplateHeading] = getAllByHeadingRole();

      expect(gridTemplateHeading).toHaveTextContent(pageVariant);
    },
  );

  it.each(getPairOfPathsAndPageTypes())(
    'for the "%s" url path should display paragraph with /[0-9]+ %s/ text content',
    (path, pageVariant) => {
      renderCardListTemplate(path);

      const paragraphContentRegex = /[0-9]+ (notes|twitters|articles)$/;

      expect(screen.getByText(paragraphContentRegex)).toHaveTextContent(pageVariant);
    },
  );

  /**
   * @todo Disable skipping test after fix the bar accessibility. Now the bar is always visible from accessibility perspective
   */
  it.skip('toggles the visibility of the bar after click his button', () => {
    renderCardListTemplate();

    const newItemBar = getNewItemBarWrapper();

    expect(newItemBar).not.toBeVisible();
    expect(getByToggleNewItemBarNameAndButtonRole()).toHaveStyle(
      CSS_STYLES.TRANSFORM_ROTATE.NOT_ACTIVE,
    );

    userEvent.click(getByToggleNewItemBarNameAndButtonRole());

    expect(newItemBar).toBeVisible();
    expect(getByToggleNewItemBarNameAndButtonRole()).toHaveStyle(
      CSS_STYLES.TRANSFORM_ROTATE.ACTIVE,
    );

    userEvent.click(getByToggleNewItemBarNameAndButtonRole());

    expect(newItemBar).not.toBeVisible();
    expect(getByToggleNewItemBarNameAndButtonRole()).toHaveStyle(
      CSS_STYLES.TRANSFORM_ROTATE.NOT_ACTIVE,
    );
  });

  /**
   * @deprecated The test will be removed the test if accessibility fix.
   */
  it('toggles the transform property of the bar after click his button', () => {
    renderCardListTemplate();

    const newItemBar = getNewItemBarWrapper();

    expect(newItemBar).toHaveStyle(CSS_STYLES.TRANSFORM_TRANSLATE.NOT_VISIBLE);
    expect(getByToggleNewItemBarNameAndButtonRole()).toHaveStyle(
      CSS_STYLES.TRANSFORM_ROTATE.NOT_ACTIVE,
    );

    userEvent.click(getByToggleNewItemBarNameAndButtonRole());

    expect(newItemBar).toHaveStyle(CSS_STYLES.TRANSFORM_TRANSLATE.VISIBLE);
    expect(getByToggleNewItemBarNameAndButtonRole()).toHaveStyle(
      CSS_STYLES.TRANSFORM_ROTATE.ACTIVE,
    );

    userEvent.click(getByToggleNewItemBarNameAndButtonRole());

    expect(newItemBar).toHaveStyle(CSS_STYLES.TRANSFORM_TRANSLATE.NOT_VISIBLE);
    expect(getByToggleNewItemBarNameAndButtonRole()).toHaveStyle(
      CSS_STYLES.TRANSFORM_ROTATE.NOT_ACTIVE,
    );
  });

  it('add a new note to the storage that was created by the form at the beginning of the array', async () => {
    const fakeNoteItem = noteItemBuilder();

    const { store } = renderCardListTemplate();

    expect(store.getState().items.notes).toHaveLength(4);

    // open sidebar form
    await waitFor(() => userEvent.click(getByToggleNewItemBarNameAndButtonRole()));

    // input the values of the note
    userEvent.type(getByTitlePlaceholderText(), fakeNoteItem.title);
    userEvent.type(getByDescriptionPlaceholderText(), fakeNoteItem.content);

    // submit the note form
    await waitFor(() => userEvent.click(getByAddNoteNameAndButtonRole()));

    const { notes } = store.getState().items;
    const [firstNote] = notes;

    expect(notes).toHaveLength(5);
    expect(firstNote).toEqual(
      expect.objectContaining({
        id: expect.any(String) as string,
        ...fakeNoteItem,
        created: expect.any(String) as string,
      }),
    );
  });
});
