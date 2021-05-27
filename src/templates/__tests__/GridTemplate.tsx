import { render, screen, userEvent, getPairOfPathsAndPageTypes, waitFor } from 'testUtils';
import { createStore } from 'redux';
import rootReducer from 'reducers';
import { fakeItemsData } from 'testUtils/fakers';
import * as actions from 'actions';
import { ItemVariants, Item } from 'commonTypes';
import { RoutesPaths } from 'routes';
import GridTemplate from '../GridTemplate/GridTemplate';

const fakeStore = createStore(rootReducer, {
  userID: 'fake-id',
  isLoading: false,
  ...fakeItemsData,
});

const renderGridTemplate = (path?: RoutesPaths, pageType?: ItemVariants) =>
  render(
    <GridTemplate>
      <></>
    </GridTemplate>,
    {
      path,
      pageType,
      store: fakeStore,
    },
  );

const getAllByHeadingRole = () => screen.getAllByRole('heading');
const getByNewItemBar = () => screen.getByTestId('new-item-bar');
const getAllByButtonRole = () => screen.getAllByRole('button');
const getByTitlePlaceholderText = () => screen.getByPlaceholderText(/title/i);
const getByNewItemBarContentTextarea = () => screen.getByTestId('new-item-bar-content-textarea');
const getByAddNoteTextButton = () => screen.getByRole('button', { name: /add note/i });

const fakeNewNoteData = { id: 'fake-note-id' };

const mockAddItemAction = () =>
  jest
    .spyOn(actions, 'addItem')
    // eslint-disable-next-line
    // @ts-ignore
    .mockImplementation((itemType: ItemVariants, itemContent: Item) => ({
      type: 'ADD_ITEM_SUCCESS',
      payload: {
        itemType,
        data: { ...fakeNewNoteData, ...itemContent },
      },
    }));

const transformTranslateHundredPercent = 'transform: translate(100%)';
const transformTranslateZero = 'transform: translate(0)';

const fakeNoteItemInputs = {
  title: 'test note title',
  content: 'test note content',
};

type Store = {
  getState: () => Partial<typeof fakeItemsData>;
};

const getState = (store: Store, itemType: ItemVariants) => () => store.getState()[itemType];

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

    const newItemBar = getByNewItemBar();
    const [toggleNewItemBarButton] = getAllByButtonRole();

    expect(newItemBar).not.toBeVisible();

    userEvent.click(toggleNewItemBarButton);

    expect(newItemBar).toBeVisible();

    userEvent.click(toggleNewItemBarButton);

    expect(newItemBar).not.toBeVisible();
  });

  /**
   * @deprecated The test will be removed the test if accessibility fix.
   */
  it('toggles the transform property of the bar after click his button', () => {
    renderGridTemplate();

    const newItemBar = getByNewItemBar();
    const [toggleNewItemBarButton] = getAllByButtonRole();

    expect(newItemBar).toHaveStyle(transformTranslateHundredPercent);

    userEvent.click(toggleNewItemBarButton);

    expect(newItemBar).toHaveStyle(transformTranslateZero);

    userEvent.click(toggleNewItemBarButton);

    expect(newItemBar).toHaveStyle(transformTranslateHundredPercent);
  });

  it('add a new note to store that has been created by the form', async () => {
    mockAddItemAction();

    const { store } = renderGridTemplate();

    /**
     * @todo remove this comments after add types to the Store
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(store.getState().notes!).toHaveLength(4);

    // open sidebar form
    const [toggleNewItemBarButton] = getAllByButtonRole();
    await waitFor(() => userEvent.click(toggleNewItemBarButton));

    // input the values of the note
    userEvent.type(getByTitlePlaceholderText(), fakeNoteItemInputs.title);
    userEvent.type(getByNewItemBarContentTextarea(), fakeNoteItemInputs.content);

    // submit the note form
    await waitFor(() => userEvent.click(getByAddNoteTextButton()));

    /**
     * @todo remove this comments after add types to the Store
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const getStateNotes = getState(store, 'notes');

    expect(getStateNotes()).toHaveLength(5);
    expect(getStateNotes()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...fakeNewNoteData,
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