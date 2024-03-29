import { build, fake } from '@jackfranklin/test-data-bot';
import pluralize from 'pluralize';
import {
  screen,
  render as renderWithProviders,
  waitFor,
  waitForElementToBeRemoved,
  userEvent,
} from 'testUtils';
import { fakeItemsData } from 'testUtils/fakers';

import { TEST_ID } from '~/constants';
import * as services from '~/services';
import { capitalize } from '~/utils';

import type { Variant } from '~/commonTypes';

type FetchItemsTestSuiteConfigArgs = {
  render(): ReturnType<typeof renderWithProviders>;
  variant: Variant;
};

export const fetchItemsTestSuite = (
  testSuiteName: string,
  { render, variant }: FetchItemsTestSuiteConfigArgs,
) => {
  const itemsData = fakeItemsData[variant];
  const firstItemsTitle = itemsData[0].title;

  const getAllCardHeaders = () => screen.getAllByTestId(TEST_ID.CARD.HEADER);
  const getConfirmationModalRemoveButton = () =>
    screen.getByTestId(TEST_ID.CONFIRMATION_MODAL.REMOVE_BUTTON);
  const getByFirstItemsTitle = () => screen.queryByText(firstItemsTitle);
  const findAllByRemoveButtons = () => screen.findAllByRole('button', { name: /remove/i });
  const findAllCardHeader = () => screen.findAllByTestId(TEST_ID.CARD.HEADER);
  const findAllCardTitles = () => screen.findAllByTestId(TEST_ID.CARD.TITLE);
  const findCounterParagraph = () => screen.findByTestId(TEST_ID.COUNTER.PARAGRAPH);
  const findByFirstItemsTitle = () => screen.findByText(firstItemsTitle);
  const queryAllSkeletonCard = () => screen.queryAllByTestId(TEST_ID.SKELETON_CARD.WRAPPER);
  const queryCounterParagraph = () => screen.queryByTestId(TEST_ID.COUNTER.PARAGRAPH);
  const queryAllCardTitles = () => screen.queryAllByTestId(TEST_ID.CARD.TITLE);
  const queryCounterSkeleton = () => screen.queryByTestId(TEST_ID.COUNTER.SKELETON);
  const findHeadingWithYouHaveNoNoteTypeText = () =>
    screen.findByRole('heading', {
      name: /you have no (notes|twitters|articles)/i,
    });

  const loremBuilder = build<{ word: string }>({
    fields: {
      word: fake((faker) => faker.lorem.word()),
    },
  });

  const filterTitleByText = (titles: string[], searchText: string) =>
    titles.filter((title) => title?.toLowerCase().includes(searchText.toLowerCase()));

  describe(testSuiteName, () => {
    it('display correct document title ', async () => {
      render();

      const capitalizedTitle = capitalize(variant);

      await waitFor(() => expect(document.title).toContain(capitalizedTitle));
    });

    it('display <CardListSkeleton /> until fetch data', async () => {
      render();

      expect(queryAllSkeletonCard()).toHaveLength(6);

      await waitForElementToBeRemoved(() => queryAllSkeletonCard());

      expect(queryAllSkeletonCard()).toHaveLength(0);
    });

    it('display counter skeleton until fetch data', async () => {
      render();

      expect(queryCounterSkeleton()).toBeInTheDocument();

      await waitForElementToBeRemoved(() => queryCounterSkeleton());

      expect(queryCounterSkeleton()).not.toBeInTheDocument();
      expect(queryCounterParagraph()).toBeInTheDocument();
    });

    it('display the cards with data from store', async () => {
      render();

      const cardsHeadings = await findAllCardHeader();

      expect(cardsHeadings).toHaveLength(4);

      for (let i = 0; i < itemsData.length; i += 1) {
        expect(cardsHeadings[i]).toHaveTextContent(itemsData[i].title);
      }
    });

    it('delete first card after clicking its the "remove" button in the  confirmation modal of card', async () => {
      render();

      expect(await findAllCardHeader()).toHaveLength(4);
      expect(await findByFirstItemsTitle()).toBeInTheDocument();

      const [firstCardItemRemoveButton] = await findAllByRemoveButtons();

      // open the confirmation modal
      await waitFor(() => userEvent.click(firstCardItemRemoveButton));

      // confirm the delete item action
      await waitFor(() => userEvent.click(getConfirmationModalRemoveButton()));

      // the confirmation modal should be closed
      expect(screen.queryByRole('heading', { name: /Are you sure?/i })).not.toBeInTheDocument();

      expect(getAllCardHeaders()).toHaveLength(3);
      expect(getByFirstItemsTitle()).not.toBeInTheDocument();
    });

    it('filter card list by search word in cards title', async () => {
      const lorem = loremBuilder();
      // add the letter "e" because it is the most common in english language
      const searchWordArray = `e${lorem.word}`.split('');
      let searchText = '';

      render();

      const allCardTitles = (await findAllCardTitles()).map(
        (title) => title.textContent,
      ) as string[];

      for (let i = 0; i < searchWordArray.length; i += 1) {
        searchText += searchWordArray[i];

        // eslint-disable-next-line no-loop-func, no-await-in-loop
        await waitFor(() => userEvent.type(screen.getByPlaceholderText(/search/i), searchText));

        const filteredCardTitles = filterTitleByText(allCardTitles, searchText);

        const currentCardTitles = queryAllCardTitles().map((title) => title.textContent);

        expect(currentCardTitles).toEqual(filteredCardTitles);

        // if the card title list is empty then omit unnecessary iterations for performance reason
        if (currentCardTitles.length === 0 && filteredCardTitles.length === 0) break;
      }
    });

    it('display the correct number of current variant of items', async () => {
      render();

      const itemsNumber = (await findAllCardTitles()).length;
      const counterText = `${itemsNumber.toString()} ${variant}`;

      expect(queryCounterParagraph()).toHaveTextContent(counterText);
    });

    it('display the correct number of current variant of items when searching', async () => {
      const lorem = loremBuilder();
      // add the letter "e" because it is the most common in english language
      const searchWordArray = `e${lorem.word}`.split('');
      let searchText = '';

      render();

      const allCardTitles = (await findAllCardTitles()).map(
        (title) => title.textContent,
      ) as string[];

      for (let i = 0; i < searchWordArray.length; i += 1) {
        searchText += searchWordArray[i];

        // eslint-disable-next-line no-loop-func, no-await-in-loop
        await waitFor(() => userEvent.type(screen.getByPlaceholderText(/search/i), searchText));

        const numberOfFilteredCardTitles = filterTitleByText(allCardTitles, searchText).length;
        const counterText = pluralize(variant, numberOfFilteredCardTitles, true);

        expect(queryCounterParagraph()).toHaveTextContent(counterText);

        // if the card title list is empty then omit unnecessary iterations for performance reason
        if (numberOfFilteredCardTitles === 0) break;
      }
    });

    it('do not display the total number of items when they are not searching', async () => {
      render();

      expect(await findCounterParagraph()).not.toHaveTextContent(/total [0-9]/i);
    });

    it('display the correct total number of items when searching', async () => {
      render();

      const numberOfTotalItems = fakeItemsData[variant].length;

      expect(await findCounterParagraph()).not.toHaveTextContent(`total ${numberOfTotalItems}`);
    });

    it('display information about the empty state when there is no data', async () => {
      const fetchItems = jest
        .spyOn(services, 'fetchItems')
        .mockImplementation(() => Promise.resolve({ data: [] }));

      render();

      expect(await findHeadingWithYouHaveNoNoteTypeText()).toBeInTheDocument();
      expect(await findHeadingWithYouHaveNoNoteTypeText()).toHaveTextContent(variant);

      fetchItems.mockRestore();
    });
  });
};
