import { createStore } from 'redux';
import { render, screen, userEvent } from 'testUtils';
import { fakeItemsData } from 'testUtils/fakers';

import Twitters from '../Twitters/Twitters';
import { routes } from '~/routes';
import * as actions from '~/store/items/itemsActions';
import rootReducer from '~/store/reducers';
import { stripSlashPrefix } from '~/utils';

const renderTwitters = () =>
  render(<Twitters />, {
    path: routes.twitters,
    pageType: stripSlashPrefix(routes.twitters) as 'twitters',
    store: createStore(rootReducer),
  });

/**
 * @todo try to mock firebase not actions creators
 */
const mocksFetchItems = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return jest.spyOn(actions, 'fetchItems').mockImplementation((itemType) => ({
    type: 'FETCH_SUCCESS',
    payload: {
      data: fakeItemsData[itemType],
      itemType,
    },
  }));
};

/**
 * @todo try to mock firebase not actions creators
 */
const mocksRemoveItems = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return jest.spyOn(actions, 'removeItem').mockImplementation((itemType, id) => ({
    type: 'REMOVE_ITEM_SUCCESS',
    payload: {
      itemType,
      id,
    },
  }));
};

const { twitters } = fakeItemsData;
const getAllByCardHeadings = () => screen.getAllByTestId('card-heading-bar');
const getByFirstTwitterTitle = () => screen.queryByText(twitters[0].title);
const getAllByRemoveButtons = () => screen.getAllByRole('button', { name: /remove/i });

describe('<Twitters />', () => {
  it('display the cards with data from store', () => {
    const mockFetchItems = mocksFetchItems();

    renderTwitters();

    const cardsHeadings = getAllByCardHeadings();

    expect(cardsHeadings).toHaveLength(4);
    expect(mockFetchItems).toHaveBeenCalledTimes(1);

    for (let i = 0; i < twitters.length; i += 1) {
      expect(cardsHeadings[i]).toHaveTextContent(twitters[i].title);
    }
  });

  it('delete the first tab after clicking the first remove button', () => {
    mocksFetchItems();
    mocksRemoveItems();

    renderTwitters();

    expect(getAllByCardHeadings()).toHaveLength(4);
    expect(getByFirstTwitterTitle()).toBeInTheDocument();

    const [firstCardItemRemoveButton] = getAllByRemoveButtons();

    userEvent.click(firstCardItemRemoveButton);

    expect(getAllByCardHeadings()).toHaveLength(3);
    expect(getByFirstTwitterTitle()).not.toBeInTheDocument();
  });
});
