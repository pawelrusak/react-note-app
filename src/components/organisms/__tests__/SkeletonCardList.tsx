import { render, screen, getRandomNaturalNumber } from 'testUtils';

import SkeletonCardList from '../SkeletonCardList/SkeletonCardList';
import { TEST_ID, routes } from '~/constants';

const getAllSkeletonCard = () => screen.getAllByTestId(TEST_ID.SKELETON_CARD.WRAPPER);

const renderSkeletonCardList = (length?: number) =>
  render(<SkeletonCardList length={length} />, { path: routes.notes });

/**
 * I intentionally omit tests for other variants of the skeleton card list because they are
 * temporary and will be deprecated in the future and to avoid testing implement details/
 */
describe('<SkeletonCardList />', () => {
  it('render six cards in the list by default', () => {
    renderSkeletonCardList();

    expect(getAllSkeletonCard()).toHaveLength(6);
  });

  it('render given number of cards in the list', () => {
    const CARDS_NUMBER = getRandomNaturalNumber();

    renderSkeletonCardList(CARDS_NUMBER);

    expect(getAllSkeletonCard()).toHaveLength(CARDS_NUMBER);
  });
});
