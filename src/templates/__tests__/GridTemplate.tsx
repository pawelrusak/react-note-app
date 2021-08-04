import { render, screen, userEvent, getPairOfPathsAndPageTypes, waitFor } from 'testUtils';
import { fakeStateWithDataAndLoggedInUser } from 'testUtils/fakers';

import GridTemplate from '../GridTemplate/GridTemplate';
import { ItemVariants } from '~/commonTypes';
import { TEST_FAKE_NEW_NOTE_DATA_ID, TEST_ID } from '~/constants/tests';

import type { RoutesPaths } from '~/routes';

jest.mock('~/services');

const renderGridTemplate = (path?: RoutesPaths, pageType?: ItemVariants) =>
  render(
    <GridTemplate>
      <></>
    </GridTemplate>,
    {
      path,
      pageType,
      initialState: fakeStateWithDataAndLoggedInUser,
    },
  );

const getAllByHeadingRole = () => screen.getAllByRole('heading');
const getNewItemBarWrapper = () => screen.getByTestId(TEST_ID.NEW_ITEM_BAR.WRAPPER);
const getByTitlePlaceholderText = () => screen.getByPlaceholderText(/title/i);
const getNewItemBarTextarea = () => screen.getByTestId(TEST_ID.NEW_ITEM_BAR.TEXTAREA);
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

const fakeNoteItemInputs = {
  title: 'test note title',
  content: 'test note content',
};

describe('<GridTemplate />', () => {
  it.each(getPairOfPathsAndPageTypes())(
    'for the "%s" url path should display the heading with the "%s" text content',
    (path, pageType) => {
      renderGridTemplate(path, pageType);

      const [gridTemplateHeading] = getAllByHeadingRole();

      expect(gridTemplateHeading).toHaveTextContent(pageType);
    },
  );

  it.each(getPairOfPathsAndPageTypes())(
    'for the "%s" url path should display paragraph with /[0-9]+ %s/ text content',
    (path, pageTypeText) => {
      renderGridTemplate(path, pageTypeText);

      const paragraphContentRegex = /[0-9]+ (notes|twitters|articles)$/;

      expect(screen.getByText(paragraphContentRegex)).toHaveTextContent(pageTypeText);
    },
  );

  /**
   * @todo Disable skipping test after fix the bar accessibility. Now the bar is always visible from accessibility perspective
   */
  it.skip('toggles the visibility of the bar after click his button', () => {
    renderGridTemplate();

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
    renderGridTemplate();

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

  it('add a new note to store that has been created by the form', async () => {
    const { store } = renderGridTemplate();

    expect(store.getState().items.notes).toHaveLength(4);

    // open sidebar form
    await waitFor(() => userEvent.click(getByToggleNewItemBarNameAndButtonRole()));

    // input the values of the note
    userEvent.type(getByTitlePlaceholderText(), fakeNoteItemInputs.title);
    userEvent.type(getNewItemBarTextarea(), fakeNoteItemInputs.content);

    // submit the note form
    await waitFor(() => userEvent.click(getByAddNoteNameAndButtonRole()));

    expect(store.getState().items.notes).toHaveLength(5);
    expect(store.getState().items.notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: TEST_FAKE_NEW_NOTE_DATA_ID,
          ...fakeNoteItemInputs,
          articleUrl: expect.any(String) as string,
          created: expect.any(String) as string,
          twitterName: expect.any(String) as string,
        }),
      ]),
    );
  });

  it.todo('displays the correct number of items');
});
