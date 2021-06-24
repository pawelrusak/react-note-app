import { Route } from 'react-router-dom';
import { render, screen, waitFor, cleanup, testComponent } from 'testUtils';
import { fakeStateWithData } from 'testUtils/fakers';

import DetailsPage from '../DetailsPage/DetailsPage';
import { routes } from '~/routes';
import * as services from '~/services';

import type { RootState } from '~/store';

jest.mock('~/services');

type ItemType = 'note' | 'article' | 'twitter';

const renderDetailsPage = (
  itemType: ItemType,
  initialState: RootState | null = fakeStateWithData,
) => {
  const pluralItemTypeName = `${itemType}s` as const;
  const [item] = fakeStateWithData.items[pluralItemTypeName];
  const itemPath = routes[itemType].replace(':id', item.id);

  return render(<Route path={routes[itemType]} component={DetailsPage} />, {
    initialState,
    path: itemPath,
    pageType: pluralItemTypeName,
  });
};

const [noteItem] = fakeStateWithData.items.notes;
const [articleItem] = fakeStateWithData.items.articles;
const [twitterItem] = fakeStateWithData.items.twitters;

const twitterAvatarTestName = 'twitter avatar';
const articleLinkTestName = 'article link';

const queryByNoteItemTitleText = () => screen.queryByText(noteItem.title);
const queryByNoteItemContentText = () => screen.queryByText(noteItem.content);
const queryByArticleLink = () => screen.queryByTestId('article-link');
const queryByAvatar = () => screen.queryByTestId('avatar');

const mocksFetchItem = () => jest.spyOn(services, 'fetchItem');

describe('<DetailsPage />', () => {
  afterEach(cleanup);

  it('send a request to service if there is no item in store and display him', async () => {
    const mockFetchItem = mocksFetchItem();

    renderDetailsPage('note', null);

    expect(mockFetchItem).toHaveBeenCalledTimes(1);
    expect(mockFetchItem).toHaveBeenCalledWith(noteItem.id);

    await waitFor(() => expect(queryByNoteItemTitleText()).toBeInTheDocument());
    await waitFor(() => expect(queryByNoteItemContentText()).toBeInTheDocument());
  });

  it('if the item exist in the store, he takes it', () => {
    const mockFetchItem = mocksFetchItem();

    renderDetailsPage('note');

    expect(mockFetchItem).toHaveBeenCalledTimes(0);

    expect(queryByNoteItemTitleText()).toBeInTheDocument();
    expect(queryByNoteItemContentText()).toBeInTheDocument();
  });

  testComponent(() => renderDetailsPage('note'), { suffixTestNames: 'when is note page' })
    .not.toBeInTheDocument(articleLinkTestName, queryByArticleLink)
    .not.toBeInTheDocument(twitterAvatarTestName, queryByAvatar)
    .run();

  testComponent(() => renderDetailsPage('article'), { suffixTestNames: 'when is article page' })
    .toBeInTheDocument(articleLinkTestName, queryByArticleLink)
    .withAttribute('href', articleItem.articleUrl)
    .not.toBeInTheDocument(twitterAvatarTestName, queryByAvatar)
    .run();

  testComponent(() => renderDetailsPage('twitter'), { suffixTestNames: 'when is twitter page' })
    .toBeInTheDocument(twitterAvatarTestName, queryByAvatar)
    .withAttribute('src', expect.stringContaining(twitterItem.twitterName as string))
    .not.toBeInTheDocument(articleLinkTestName, queryByArticleLink)
    .run();
});
