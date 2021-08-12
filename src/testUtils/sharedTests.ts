import { build, fake } from '@jackfranklin/test-data-bot';
import {
  screen,
  render as renderWithProviders,
  waitFor,
  waitForElementToBeRemoved,
  userEvent,
} from 'testUtils';
import { fakeItemsData } from 'testUtils/fakers';

import { TEST_ID } from '~/constants/tests';

import type { ItemVariants } from '~/commonTypes';

type FetchItemsTestSuiteConfigArgs = {
  render(): ReturnType<typeof renderWithProviders>;
  variant: ItemVariants;
};

export const fetchItemsTestSuite = (
  testSuiteName: string,
  { render, variant }: FetchItemsTestSuiteConfigArgs,
) => {
  const itemsData = fakeItemsData[variant];
  const firstItemsTitle = itemsData[0].title;

  const getAllCardHeaders = () => screen.getAllByTestId(TEST_ID.CARD.HEADER);
  const getByFirstItemsTitle = () => screen.queryByText(firstItemsTitle);
  const findAllByRemoveButtons = () => screen.findAllByRole('button', { name: /remove/i });
  const findAllCardHeader = () => screen.findAllByTestId(TEST_ID.CARD.HEADER);
  const findAllCardTitles = () => screen.findAllByTestId(TEST_ID.CARD.TITLE);
  const findByFirstItemsTitle = () => screen.findByText(firstItemsTitle);
  const queryAllSkeletonCard = () => screen.queryAllByTestId(TEST_ID.SKELETON_CARD.WRAPPER);
  const queryCounterParagraph = () => screen.queryByTestId(TEST_ID.COUNTER.PARAGRAPH);
  const queryAllCardTitles = () => screen.queryAllByTestId(TEST_ID.CARD.TITLE);
  const queryCounterSkeleton = () => screen.queryByTestId(TEST_ID.COUNTER.SKELETON);

  const loremBuilder = build<{ word: string }>({
    fields: {
      word: fake((faker) => faker.lorem.word()),
    },
  });

  const filterTitleByText = (titles: string[], searchText: string) =>
    titles.filter((title) => title?.toLowerCase().includes(searchText.toLowerCase()));

  describe(testSuiteName, () => {
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

    it('delete first card after clicking its the "remove" button', async () => {
      render();

      expect(await findAllCardHeader()).toHaveLength(4);
      expect(await findByFirstItemsTitle()).toBeInTheDocument();

      const [firstCardItemRemoveButton] = await findAllByRemoveButtons();

      await waitFor(() => userEvent.click(firstCardItemRemoveButton));

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
  });
};
