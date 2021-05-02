import { render, screen, userEvent } from 'testUtils';
import { routes } from 'routes';
import { stripSlashPrefix } from 'utils';
import * as actions from 'actions';
import { fakeItemsData } from 'testUtils/fakers';
import { createStore } from 'redux';
import rootReducer from 'reducers';
import Twitters from '../Twitters/Twitters';

const renderTwitters = () =>
  render(<Twitters />, {
    path: routes.twitters,
    pageType: stripSlashPrefix(routes.twitters),
    store: createStore(rootReducer),
  });

const MocksFetchItems = () =>
  jest.spyOn(actions, 'fetchItems').mockImplementation((itemType) => ({
    type: 'FETCH_SUCCESS',
    payload: {
      data: fakeItemsData[itemType],
      itemType,
    },
  }));

const MocksRemoveItems = () =>
  jest.spyOn(actions, 'removeItem').mockImplementation((itemType, id) => ({
    type: 'REMOVE_ITEM_SUCCESS',
    payload: {
      itemType,
      id,
    },
  }));

const { twitters } = fakeItemsData;
const getAllByCardHeadings = () => screen.getAllByTestId('card-heading-bar');
const getByFirstTwitterTitle = () => screen.queryByText(twitters[0].title);
const getAllByRemoveButtons = () => screen.getAllByRole('button', { name: /remove/i });

describe('<Twitters />', () => {
  it('display the cards with data from store', () => {
    const mockFetchItems = MocksFetchItems();

    renderTwitters();

    const cardsHeadings = getAllByCardHeadings();

    expect(cardsHeadings).toHaveLength(4);
    expect(mockFetchItems).toHaveBeenCalledTimes(1);

    for (let i = 0; i < twitters.length; i += 1) {
      expect(cardsHeadings[i]).toHaveTextContent(twitters[i].title);
    }
  });

  it('delete the first tab after clicking the first remove button', () => {
    MocksFetchItems();
    MocksRemoveItems();

    renderTwitters();

    expect(getAllByCardHeadings()).toHaveLength(4);
    expect(getByFirstTwitterTitle()).toBeInTheDocument();

    const [firstCardItemRemoveButton] = getAllByRemoveButtons();

    userEvent.click(firstCardItemRemoveButton);

    expect(getAllByCardHeadings()).toHaveLength(3);
    expect(getByFirstTwitterTitle()).not.toBeInTheDocument();
  });
});
