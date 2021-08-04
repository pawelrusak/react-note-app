import { cleanup, waitFor } from '@testing-library/react';
import { Route, Switch } from 'react-router-dom';
import { render, screen, userEvent, testComponent } from 'testUtils';

import Card, { CardProps } from '../Card/Card';
import * as CardStories from '../Card/Card.stories';
import { routes } from '~/routes';
import * as actions from '~/store/items/itemsSlice';

import type { Item } from '~/commonTypes';

jest.mock('~/services');

type CardType = 'Note' | 'Twitter' | 'Article';

const getFakeDetailsPageText = (cardType: CardType, cardId: string) =>
  `${cardType} page with ${cardId}`;

type FakeDetailsPageProps = {
  readonly cardId: string;
  readonly cardType: CardType;
};

const FakeDetailsPage = ({ cardType, cardId }: FakeDetailsPageProps) => (
  <div data-testid="FakeDetailsPage">{getFakeDetailsPageText(cardType, cardId)}</div>
);

const { twitterName: twitterNameCardArgs } = CardStories.Twitter.args as CardProps;
const { articleUrl: articleUrlCardArgs } = CardStories.Article.args as CardProps;

const renderCard = (cardType: CardType) => {
  const cardData = CardStories[cardType]?.args as Item;
  const itemType = cardType.toLowerCase() as 'note' | 'twitter' | 'article';
  const pageType = `${itemType}s` as const;
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
const queryByImgRole = () => screen.queryByRole('img');
const getByCardHeading = () => screen.getByTestId('Card_Header');
const queryByCardArticleLink = () => screen.queryByTestId('Card_ArticleLink');
const queryByFakeDetailsPage = () => screen.queryByTestId('FakeDetailsPage');
const queryByCardDate = () => screen.queryByTestId('Card_DateInfo');

/**
 * @todo use CONSTANT_CASE names
 */
const twitterAvatarTestName = 'twitter avatar';
const articleLinkTestName = 'article link';
const CART_TYPES = ['Note', 'Twitter', 'Article'] as const;

describe('<Card />', () => {
  beforeEach(cleanup);

  it.each(CART_TYPES)('redirect to %s details page after click on the card heading', (cardType) => {
    const { cardData } = renderCard(cardType);

    expect(queryByFakeDetailsPage()).not.toBeInTheDocument();

    userEvent.click(getByCardHeading());

    expect(queryByFakeDetailsPage()).toBeInTheDocument();
    expect(queryByFakeDetailsPage()).toHaveTextContent(
      getFakeDetailsPageText(cardType, cardData.id),
    );
  });

  it.each(CART_TYPES)('has a correctly formatted date', (cardType) => {
    renderCard(cardType);

    expect(queryByCardDate()).toBeInTheDocument();
    expect(queryByCardDate()).toHaveTextContent(/3 days/i);
  });

  /**
   * @deprecated remove this after write the test for <Notes />, <Twitters />, <Articles />, because they are more complex
   */
  it('trigger removeItem action with the data of card  when the remove button was clicked', async () => {
    const mockRemoveItemAction = jest.spyOn(actions, 'removeItem');

    renderCard('Note');
    const removeItemButton = getByButtonRole();

    await waitFor(() => userEvent.click(removeItemButton));

    expect(mockRemoveItemAction).toHaveBeenCalledTimes(1);
    expect(mockRemoveItemAction.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "8885d2d6-b081-4342-8232-e889affa9d93",
          "itemVariant": "notes",
        },
      ]
    `);

    mockRemoveItemAction.mockRestore();
  });

  testComponent(() => renderCard('Note'), { suffixTestNames: 'when is note page' })
    .not.toBeInTheDocument(twitterAvatarTestName, queryByImgRole)
    .not.toBeInTheDocument(articleLinkTestName, queryByCardArticleLink)
    .run();

  testComponent(() => renderCard('Twitter'), { suffixTestNames: 'when is twitter page' })
    .toBeInTheDocument(twitterAvatarTestName, queryByImgRole)
    .withAttribute('src', expect.stringContaining(twitterNameCardArgs as string))
    .not.toBeInTheDocument(articleLinkTestName, queryByCardArticleLink)
    .run();

  testComponent(() => renderCard('Article'), { suffixTestNames: 'when is article page' })
    .toBeInTheDocument(articleLinkTestName, queryByCardArticleLink)
    .withAttribute('href', articleUrlCardArgs)
    .not.toBeInTheDocument(twitterAvatarTestName, queryByImgRole)
    .run();
});
