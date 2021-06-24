import { render, screen, userEvent, waitFor } from 'testUtils';
import { fakeItemsData } from 'testUtils/fakers';

import Twitters from '../Twitters/Twitters';
import { routes } from '~/routes';
import { stripSlashPrefix } from '~/utils';

jest.mock('~/services');

const renderTwitters = () =>
  render(<Twitters />, {
    path: routes.twitters,
    pageType: stripSlashPrefix(routes.twitters) as 'twitters',
  });

const { twitters } = fakeItemsData;

const firstTwitterTitle = twitters[0].title;
const cardHeadingBarId = 'card-heading-bar';

const getAllByCardHeadings = () => screen.getAllByTestId(cardHeadingBarId);
const getByFirstTwitterTitle = () => screen.queryByText(firstTwitterTitle);
const findAllByRemoveButtons = () => screen.findAllByRole('button', { name: /remove/i });
const findAllByCardHeadings = () => screen.findAllByTestId(cardHeadingBarId);
const findByFirstTwitterTitle = () => screen.findByText(firstTwitterTitle);

describe('<Twitters />', () => {
  it('display the cards with data from store', async () => {
    renderTwitters();

    const cardsHeadings = await findAllByCardHeadings();

    expect(cardsHeadings).toHaveLength(4);

    for (let i = 0; i < twitters.length; i += 1) {
      expect(cardsHeadings[i]).toHaveTextContent(twitters[i].title);
    }
  });

  it('delete first card after clicking its the "remove" button', async () => {
    renderTwitters();

    expect(await findAllByCardHeadings()).toHaveLength(4);
    expect(await findByFirstTwitterTitle()).toBeInTheDocument();

    const [firstCardItemRemoveButton] = await findAllByRemoveButtons();

    await waitFor(() => userEvent.click(firstCardItemRemoveButton));

    expect(getAllByCardHeadings()).toHaveLength(3);
    expect(getByFirstTwitterTitle()).not.toBeInTheDocument();
  });
});
