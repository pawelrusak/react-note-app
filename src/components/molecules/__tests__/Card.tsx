import { Route, Switch } from 'react-router-dom';
import { render, screen, userEvent, testComponent } from 'testUtils';

import Card from '../Card/Card';
import * as CardStories from '../Card/Card.stories';
import { TEST_ID } from '~/constants/tests';
import { routes } from '~/routes';

import type { Item } from '~/commonTypes';

jest.mock('~/services');

type CardType = 'Note' | 'Twitter' | 'Article';

const renderCard = (cardType: CardType = 'Note') => {
  const cardData = CardStories[cardType]?.args as Item;
  const itemType = cardType.toLowerCase() as Lowercase<CardType>;
  const path = routes[`${itemType}s` as const];
  const pathToDetailsPageWithGivenId = routes[itemType].replace(':id', cardData.id);

  const FakeDetailsPage = () => (
    <div data-testid="FakeDetailsPage">{`${cardType}:${cardData.id}`}</div>
  );

  return {
    ...render(
      <Switch>
        <Route exact path={path} render={() => <Card {...cardData} />} />
        <Route exact path={pathToDetailsPageWithGivenId} component={FakeDetailsPage} />
      </Switch>,
      { path },
    ),
    cardData,
  };
};

const getCardHeader = () => screen.getByTestId(TEST_ID.CARD.HEADER);
const getByRemoveButtonRole = () => screen.getByRole('button', { name: /remove/i });
const queryByHeadingOfConfirmationModal = () =>
  screen.queryByRole('heading', { name: /are you sure?/i });
const queryByImgRole = () => screen.queryByRole('img');
const queryCardArticleLink = () => screen.queryByTestId(TEST_ID.CARD.ARTICLE_LINK);
const queryFakeDetailsPage = () => screen.queryByTestId('FakeDetailsPage');
const queryCardDateInfo = () => screen.queryByTestId(TEST_ID.CARD.DATE_INFO);

const TEST_NAME = {
  TWITTER_AVATAR: 'twitter avatar',
  ARTICLE_LINK: 'article link',
};
const CART_TYPES = ['Note', 'Twitter', 'Article'] as const;

describe('<Card />', () => {
  it.each(CART_TYPES)('redirect to %s details page after click on the card heading', (cardType) => {
    const { cardData } = renderCard(cardType);

    expect(queryFakeDetailsPage()).not.toBeInTheDocument();

    userEvent.click(getCardHeader());

    expect(queryFakeDetailsPage()).toBeInTheDocument();
    expect(queryFakeDetailsPage()).toHaveTextContent(`${cardType}:${cardData.id}`);
  });

  it.each(CART_TYPES)('has a correctly formatted date', (cardType) => {
    renderCard(cardType);

    expect(queryCardDateInfo()).toBeInTheDocument();
    expect(queryCardDateInfo()).toHaveTextContent(/3 days/i);
  });

  it('open the confirmation modal when the "remove" button was clicked', () => {
    renderCard();

    // shouldn't initially display the confirmation modal
    expect(queryByHeadingOfConfirmationModal()).not.toBeInTheDocument();

    userEvent.click(getByRemoveButtonRole());

    expect(queryByHeadingOfConfirmationModal()).toBeInTheDocument();
  });

  it('close the opened confirmation modal when the "no, wait" button is clicked', () => {
    renderCard();

    // open the confirmation modal
    userEvent.click(getByRemoveButtonRole());

    userEvent.click(screen.getByRole('button', { name: /no, wait/i }));

    expect(queryByHeadingOfConfirmationModal()).not.toBeInTheDocument();
  });

  it('close the opened confirmation modal when the user clicked outside the confirmation modal', () => {
    renderCard();

    // open the confirmation modal
    userEvent.click(getByRemoveButtonRole());

    userEvent.click(document.body);

    expect(queryByHeadingOfConfirmationModal()).not.toBeInTheDocument();
  });

  testComponent(() => renderCard('Note'), { suffixTestNames: 'when is note page' })
    .not.toBeInTheDocument(TEST_NAME.TWITTER_AVATAR, queryByImgRole)
    .not.toBeInTheDocument(TEST_NAME.ARTICLE_LINK, queryCardArticleLink)
    .run();

  testComponent(() => renderCard('Twitter'), { suffixTestNames: 'when is twitter page' })
    .toBeInTheDocument(TEST_NAME.TWITTER_AVATAR, queryByImgRole)
    .withAttribute('src', expect.stringContaining(CardStories.Twitter.args?.twitterName as string))
    .not.toBeInTheDocument(TEST_NAME.ARTICLE_LINK, queryCardArticleLink)
    .run();

  testComponent(() => renderCard('Article'), { suffixTestNames: 'when is article page' })
    .toBeInTheDocument(TEST_NAME.ARTICLE_LINK, queryCardArticleLink)
    .withAttribute('href', CardStories.Article.args?.articleUrl)
    .not.toBeInTheDocument(TEST_NAME.TWITTER_AVATAR, queryByImgRole)
    .run();
});
