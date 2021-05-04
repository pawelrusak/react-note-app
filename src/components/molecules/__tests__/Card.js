import { render, screen, userEvent, testComponent } from 'testUtils';
import { Route, Switch } from 'react-router-dom';
import { routes } from 'routes';
import { cleanup } from '@testing-library/react';
import * as actions from 'actions';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import * as CardStories from '../Card/Card.stories';

const getFakeDetailsPageText = (cardType, cardId) => `${cardType} page with ${cardId}`;

const FakeDetailsPage = ({ cardType, cardId }) => (
  <div data-testid="fake-details-page">{getFakeDetailsPageText(cardType, cardId)}</div>
);

FakeDetailsPage.propTypes = {
  cardId: PropTypes.string.isRequired,
  cardType: PropTypes.oneOf(['Note', 'Twitter', 'Article']).isRequired,
};

const renderCard = (cardType) => {
  const cardData = CardStories[cardType]?.args;
  const itemType = cardType.toLowerCase();
  const pageType = `${itemType}s`;
  const detailsPagePath = routes[itemType].replace(':id', cardData.id);

  const FakeDetailsDataPage = () => <FakeDetailsPage cardType={cardType} cardId={cardData.id} />;

  return {
    ...render(
      <Switch>
        <Route exact path={routes[pageType]} render={() => <Card {...cardData} />} />
        <Route exact path={detailsPagePath} component={FakeDetailsDataPage} />
      </Switch>,
      {
        path: routes[pageType],
        pageType,
      },
    ),
    cardData,
  };
};

const getByButtonRole = () => screen.getByRole('button');
const getByCardHeading = () => screen.getByTestId('card-heading-bar');
const queryByImgRole = () => screen.queryByRole('img');
const queryByCardArticleLink = () => screen.queryByTestId('card-article-link');
const queryByFakeDetailsPage = () => screen.queryByTestId('fake-details-page');

const mockRemoveItemAction = () =>
  jest.spyOn(actions, 'removeItem').mockImplementation(() => ({
    type: 'TEST',
  }));

describe('<Card />', () => {
  beforeEach(cleanup);

  it.each(['Note', 'Twitter', 'Article'])(
    'redirect to %s details page after click on the card heading',
    async (cardType) => {
      const { cardData } = renderCard(cardType);

      expect(queryByFakeDetailsPage()).not.toBeInTheDocument();

      userEvent.click(getByCardHeading());

      expect(queryByFakeDetailsPage()).toBeInTheDocument();
      expect(queryByFakeDetailsPage()).toHaveTextContent(
        getFakeDetailsPageText(cardType, cardData.id),
      );
    },
  );

  /**
   * @deprecated remove this after write the test for <Notes />, <Twitters />, <Articles />, because they are more complex
   */
  it('trigger removeItem action with the data of card  when the remove button was clicked', () => {
    renderCard('Note');

    const removeItemButton = getByButtonRole();
    const mockRemoveItem = mockRemoveItemAction();

    userEvent.click(removeItemButton);

    expect(mockRemoveItem.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "notes",
        "8885d2d6-b081-4342-8232-e889affa9d93",
      ]
    `);

    mockRemoveItem.mockRestore();
  });

  testComponent(() => renderCard('Twitter'), { suffixTestNames: 'when is twitter page' })
    .toBeInTheDocument('avatar', queryByImgRole)
    .withAttribute('src', expect.stringContaining(CardStories.Twitter.args.twitterName))
    .not.toBeInTheDocument('article link', queryByCardArticleLink)
    .run();

  testComponent(() => renderCard('Article'), { suffixTestNames: 'when is article page' })
    .toBeInTheDocument('article link', queryByCardArticleLink)
    .withAttribute('href', CardStories.Article.args.articleUrl)
    .not.toBeInTheDocument('avatar', queryByImgRole)
    .run();
});
