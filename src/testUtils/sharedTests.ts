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
  const findByFirstItemsTitle = () => screen.findByText(firstItemsTitle);
  const queryAllSkeletonCard = () => screen.queryAllByTestId(TEST_ID.SKELETON_CARD.WRAPPER);
  const queryGridTemplateCounter = () => screen.queryByTestId(TEST_ID.GRID_TEMPLATE.COUNTER);
  const queryGridTemplateSkeletonCounter = () =>
    screen.queryByTestId(TEST_ID.GRID_TEMPLATE.SKELETON_COUNTER);

  describe(testSuiteName, () => {
    it('display <CardListSkeleton /> until fetch data', async () => {
      render();

      expect(queryAllSkeletonCard()).toHaveLength(6);

      await waitForElementToBeRemoved(() => queryAllSkeletonCard());

      expect(queryAllSkeletonCard()).toHaveLength(0);
    });

    it('display counter skeleton until fetch data', async () => {
      render();

      expect(queryGridTemplateSkeletonCounter()).toBeInTheDocument();

      await waitForElementToBeRemoved(() => queryGridTemplateSkeletonCounter());

      expect(queryGridTemplateSkeletonCounter()).not.toBeInTheDocument();
      expect(queryGridTemplateCounter()).toBeInTheDocument();
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
  });
};
