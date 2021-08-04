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
  testGroupName: string,
  { render, variant }: FetchItemsTestSuiteConfigArgs,
) => {
  const itemsData = fakeItemsData[variant];
  const firstItemsTitle = itemsData[0].title;

  const getAllByCardHeadings = () => screen.getAllByTestId(TEST_ID.CARD.HEADER);
  const getByFirstItemsTitle = () => screen.queryByText(firstItemsTitle);
  const findAllByRemoveButtons = () => screen.findAllByRole('button', { name: /remove/i });
  const findAllByCardHeadings = () => screen.findAllByTestId(TEST_ID.CARD.HEADER);
  const findByFirstItemsTitle = () => screen.findByText(firstItemsTitle);
  const queryAllBySkeletonCard = () => screen.queryAllByTestId('SkeletonCard');
  const queryByGridTemplateCounter = () => screen.queryByTestId('GridTemplate_Counter');
  const queryByGridTemplateSkeletonCounter = () =>
    screen.queryByTestId('GridTemplate_SkeletonCounter');

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
