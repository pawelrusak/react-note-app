import { render, screen, userEvent, testComponent } from 'testUtils';
import { Route } from 'react-router-dom';
import { routes } from 'routes';
import { cleanup } from '@testing-library/react';
import * as actions from 'actions';
import Card from '../Card/Card';
import * as CardStories from '../Card/Card.stories';

const renderCardByType = (cardType) => {
  const cardData = CardStories[cardType]?.args;
  const itemType = cardType.toLowerCase();
  const pageType = `${itemType}s`;

  return {
    ...render(
      <>
        <Card {...cardData} />
        <Route path={routes[itemType]}>
          {cardType} page with {cardData.id}
        </Route>
      </>,
      {
        path: routes[pageType],
        pageType,
      },
    ),
    cardData,
  };
};

describe('<Card />', () => {
  beforeEach(cleanup);

  it.each(['Note', 'Twitter', 'Article'])(
    'redirect to %s details page after click on the card heading',
    (cardType) => {
      const { container, cardData } = renderCardByType(cardType);
      const text = `${cardType} page with ${cardData.id}`;
      const headingBar = screen.getByTestId('card-heading-bar');

      expect(container).not.toHaveTextContent(text);

      userEvent.click(headingBar);

      expect(container).toHaveTextContent(text);
    },
  );

  it('trigger removeItem action with the data of card  when the remove button was clicked', () => {
    renderCardByType('Note');

    const removeItemButton = screen.getByRole('button');
    const mockRemoveItemReduxAction = jest.spyOn(actions, 'removeItem').mockImplementation(() => ({
      type: 'TEST',
    }));

    userEvent.click(removeItemButton);

    expect(mockRemoveItemReduxAction.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "notes",
        "8885d2d6-b081-4342-8232-e889affa9d93",
      ]
    `);

    mockRemoveItemReduxAction.mockRestore();
  });

  testComponent(() => renderCardByType('Twitter'), { suffixTestNames: 'when is twitter page' })
    .toBeInTheDocument('avatar', () => screen.queryByRole('img'))
    .withAttribute('src', expect.stringContaining(CardStories.Twitter.args.twitterName))
    .not.toBeInTheDocument('article link', () => screen.queryByTestId('card-article-link'))
    .run();

  testComponent(() => renderCardByType('Article'), { suffixTestNames: 'when is article page' })
    .toBeInTheDocument('article link', () => screen.queryByTestId('card-article-link'))
    .withAttribute('href', CardStories.Article.args.articleUrl)
    .not.toBeInTheDocument('avatar', () => screen.queryByRole('img'))
    .run();
});
