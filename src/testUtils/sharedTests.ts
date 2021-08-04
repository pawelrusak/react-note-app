import {
  screen,
  render as renderWithProviders,
  waitFor,
  waitForElementToBeRemoved,
  userEvent,
} from 'testUtils';
import { fakeItemsData } from 'testUtils/fakers';

import type { ItemVariants } from '~/commonTypes';

type FetchItemsTestSuiteConfigArgs = {
  render(): ReturnType<typeof renderWithProviders>;
  variant: ItemVariants;
};

export const fetchItemsTestSuite = (
  testGroupName: string,
  { render, variant }: FetchItemsTestSuiteConfigArgs,
) => {
  const itemsData = fakeItemsData[variant];
  const firstItemsTitle = itemsData[0].title;

  const CARD_HEADER_TEST_ID = 'Card_Header';
  const getAllByCardHeadings = () => screen.getAllByTestId(CARD_HEADER_TEST_ID);
  const getByFirstItemsTitle = () => screen.queryByText(firstItemsTitle);
  const findAllByRemoveButtons = () => screen.findAllByRole('button', { name: /remove/i });
  const findAllByCardHeadings = () => screen.findAllByTestId(CARD_HEADER_TEST_ID);
  const findByFirstItemsTitle = () => screen.findByText(firstItemsTitle);
  const queryAllBySkeletonCard = () => screen.queryAllByTestId('SkeletonCard');
  const queryByGridTemplateCounter = () => screen.queryByTestId('grid-template-counter');
  const queryByGridTemplateSkeletonCounter = () =>
    screen.queryByTestId('grid-template-skeleton-counter');

  describe(testGroupName, () => {
    it('display <CardListSkeleton /> until fetch data', async () => {
      render();

      expect(queryAllBySkeletonCard()).toHaveLength(6);

      await waitForElementToBeRemoved(() => queryAllBySkeletonCard());

      expect(queryAllBySkeletonCard()).toHaveLength(0);
    });

    it('display counter skeleton until fetch data', async () => {
      render();

      expect(queryByGridTemplateSkeletonCounter()).toBeInTheDocument();

      await waitForElementToBeRemoved(() => queryByGridTemplateSkeletonCounter());

      expect(queryByGridTemplateSkeletonCounter()).not.toBeInTheDocument();
      expect(queryByGridTemplateCounter()).toBeInTheDocument();
    });

    it('display the cards with data from store', async () => {
      render();

      const cardsHeadings = await findAllByCardHeadings();

      expect(cardsHeadings).toHaveLength(4);

      for (let i = 0; i < itemsData.length; i += 1) {
        expect(cardsHeadings[i]).toHaveTextContent(itemsData[i].title);
      }
    });

    it('delete first card after clicking its the "remove" button', async () => {
      render();

      expect(await findAllByCardHeadings()).toHaveLength(4);
      expect(await findByFirstItemsTitle()).toBeInTheDocument();

      const [firstCardItemRemoveButton] = await findAllByRemoveButtons();

      await waitFor(() => userEvent.click(firstCardItemRemoveButton));

      expect(getAllByCardHeadings()).toHaveLength(3);
      expect(getByFirstItemsTitle()).not.toBeInTheDocument();
    });
  });
};
