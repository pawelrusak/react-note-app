import { render, screen, getRandomNaturalNumber } from 'testUtils';

import SkeletonCardList from '../SkeletonCardList/SkeletonCardList';

const getAllSkeletonCard = () => screen.getAllByTestId('SkeletonCard');

const renderSkeletonCardList = (length: number | undefined = undefined) =>
  render(<SkeletonCardList length={length} />);

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
