import { render, screen, waitFor, cleanup, testComponent } from 'testUtils';
import { routes } from 'routes';
import { fakeStateWithData, fakeStateWithoutData } from 'testUtils/fakers';
import { createStore } from 'redux';
import rootReducer from 'reducers';
import { Route } from 'react-router-dom';
import * as services from 'services';
import DetailsPage from '../DetailsPage/DetailsPage';
import type { ItemVariants } from 'commonTypes';

type ItemName = 'note' | 'article' | 'twitter';

const renderDetailsPage = (
  itemType: ItemName,
  store = createStore(rootReducer, fakeStateWithData),
) => {
  const pluralItemTypeName = `${itemType}s`;
  const [item] = fakeStateWithData[pluralItemTypeName as ItemVariants];
  const itemPath = routes[itemType].replace(':id', item.id);

  return render(<Route path={routes[itemType]} component={DetailsPage} />, {
    store,
    path: itemPath,
    pageType: pluralItemTypeName,
  });
};

const [noteItem] = fakeStateWithData.notes;
const [articleItem] = fakeStateWithData.articles;
const [twitterItem] = fakeStateWithData.twitters;

const twitterAvatarTestName = 'twitter avatar';
const articleLinkTestName = 'article link';

const queryByNoteItemTitleText = () => screen.queryByText(noteItem.title);
const queryByNoteItemContentText = () => screen.queryByText(noteItem.content);
const queryByArticleLink = () => screen.queryByTestId('article-link');
const queryByAvatar = () => screen.queryByTestId('avatar');

const noteResolveData = {
  data: noteItem,
};
const mocksFetchItem = () =>
  jest.spyOn(services, 'fetchItem').mockResolvedValueOnce(noteResolveData);

describe('<DetailsPage />', () => {
  afterEach(cleanup);

  it('send a request to service if there is no item in store and display him', async () => {
    const mockFetchItem = mocksFetchItem();

    renderDetailsPage('note', createStore(rootReducer, fakeStateWithoutData));

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
