import dayjs from 'dayjs';
import { Route, Switch } from 'react-router-dom';
import { render, screen, waitFor, testComponent, userEvent } from 'testUtils';
import { fakeStateWithData, fakeStateWithoutData } from 'testUtils/fakers';

import DetailsPage from '../DetailsPage/DetailsPage';
import { TEST_ID } from '~/constants';
import { routes } from '~/routes';
import * as services from '~/services';
import { capitalize } from '~/utils';

import type { RootState } from '~/store';

jest.mock('~/services');

type ItemType = 'note' | 'article' | 'twitter';

const renderDetailsPage = (
  itemType: ItemType,
  initialState: RootState | null = fakeStateWithData,
  detailsItemId?: string,
) => {
  const pluralItemTypeName = `${itemType}s` as const;
  const [item] = fakeStateWithData.items[pluralItemTypeName];
  const itemPath = routes[itemType].replace(
    ':id',
    detailsItemId === undefined ? item.id : detailsItemId,
  );

  const FakeItemsPage = () => <div data-testid="FakeItemsPage">{itemType}</div>;

  return {
    ...render(
      <Switch>
        <Route path={routes[itemType]} component={DetailsPage} />
        <Route path={routes[pluralItemTypeName]} component={FakeItemsPage} />
      </Switch>,
      {
        initialState,
        path: itemPath,
      },
    ),
    detailsPageData: item,
  };
};

const [noteItem] = fakeStateWithData.items.notes;
const [articleItem] = fakeStateWithData.items.articles;
const [twitterItem] = fakeStateWithData.items.twitters;

const TEST_NAME = {
  TWITTER_AVATAR: 'twitter avatar',
  ARTICLE_LINK: 'article link',
  TWITTER_LINK: 'twitter link',
};

const queryByNoteItemTitleText = () => screen.queryByText(noteItem.title);
const queryByNoteItemContentText = () => screen.queryByText(noteItem.content);

const queryDetailsTemplateArticleLink = () =>
  screen.queryByTestId(TEST_ID.DETAILS_TEMPLATE.ARTICLE_LINK);
const queryDetailsTemplateTwitterLink = () =>
  screen.queryByTestId(TEST_ID.DETAILS_TEMPLATE.TWITTER_LINK);
const queryDetailsTemplateAvatar = () => screen.queryByTestId(TEST_ID.DETAILS_TEMPLATE.AVATAR);
const queryDetailsTemplateDateInfo = () => screen.queryByTestId(TEST_ID.DETAILS_TEMPLATE.DATE_INFO);
const querySkeletonDetailsTemplateWrapper = () =>
  screen.queryByTestId(TEST_ID.SKELETON_DETAILS_TEMPLATE.WRAPPER);
const getByRemoveNoteButtonRole = () => screen.getByRole('button', { name: /remove/i });
const queryByConfirmationModalHeadingRole = () =>
  screen.queryByRole('heading', { name: /are you sure?/i });
const queryFakeItemsPage = () => screen.queryByTestId('FakeItemsPage');
const findHeadingWithNoNoteFoundText = () =>
  screen.findByRole('heading', {
    name: /no note found./i,
  });

const mocksFetchItem = () => jest.spyOn(services, 'fetchItem');

const DETAILS_PAGE_VARIANTS = ['note', 'article', 'twitter'] as const;

describe('<DetailsPage />', () => {
  it.each(DETAILS_PAGE_VARIANTS)('display correct document title ', async (variant) => {
    const { detailsPageData } = renderDetailsPage(variant);

    const detailsPageDocumentTitle = `${capitalize(variant)}: "${detailsPageData.title}"`;

    await waitFor(() => expect(document.title).toBe(detailsPageDocumentTitle));
  });

  it('display <SkeletonDetailsTemplate/> while fetch data', async () => {
    renderDetailsPage('note', fakeStateWithoutData);

    await waitFor(() => expect(querySkeletonDetailsTemplateWrapper()).toBeInTheDocument());
  });

  it('send a request to service if there is no item in store and display him', async () => {
    const mockFetchItem = mocksFetchItem();

    renderDetailsPage('note', null);

    expect(mockFetchItem).toHaveBeenCalledTimes(1);
    expect(mockFetchItem).toHaveBeenCalledWith(noteItem.id);

    await waitFor(() => expect(queryByNoteItemTitleText()).toBeInTheDocument());
    await waitFor(() => expect(queryByNoteItemContentText()).toBeInTheDocument());

    mockFetchItem.mockRestore();
  });

  it('if the item exist in the store, he takes it', () => {
    const mockFetchItem = mocksFetchItem();

    renderDetailsPage('note');

    expect(mockFetchItem).toHaveBeenCalledTimes(0);

    expect(queryByNoteItemTitleText()).toBeInTheDocument();
    expect(queryByNoteItemContentText()).toBeInTheDocument();

    mockFetchItem.mockRestore();
  });

  it('display information about the empty note state when there is no data', async () => {
    renderDetailsPage('note', null, 'fake-id-of-a-non-existing-note');

    expect(await findHeadingWithNoNoteFoundText()).toBeInTheDocument();
  });

  it.each(DETAILS_PAGE_VARIANTS)('has a correctly formatted date', (variant) => {
    const { detailsPageData } = renderDetailsPage(variant);

    const itemCreatedDate = new Date(detailsPageData.created);
    const formattedItemCreatedDate = dayjs(itemCreatedDate).format('DD/MM/YYYY');

    expect(queryDetailsTemplateDateInfo()).toBeInTheDocument();
    expect(queryDetailsTemplateDateInfo()).toHaveTextContent(formattedItemCreatedDate);
  });

  it('open the confirmation modal when the "remove" button was clicked', () => {
    renderDetailsPage('note');

    // shouldn't initially display the confirmation modal
    expect(queryByConfirmationModalHeadingRole()).not.toBeInTheDocument();

    userEvent.click(getByRemoveNoteButtonRole());

    expect(queryByConfirmationModalHeadingRole()).toBeInTheDocument();
  });

  it('close the opened confirmation modal when the "no, wait" button is clicked', () => {
    renderDetailsPage('note');

    // open the confirmation modal
    userEvent.click(getByRemoveNoteButtonRole());

    userEvent.click(screen.getByRole('button', { name: /no, wait/i }));

    expect(queryByConfirmationModalHeadingRole()).not.toBeInTheDocument();
  });

  it('close the opened confirmation modal when the user clicked outside the confirmation modal', () => {
    renderDetailsPage('note');

    // open the confirmation modal
    userEvent.click(getByRemoveNoteButtonRole());

    userEvent.click(document.body);

    expect(queryByConfirmationModalHeadingRole()).not.toBeInTheDocument();
  });

  it.each(DETAILS_PAGE_VARIANTS)(
    'remove detail items (first item) from the store and redirect to the specified page after confirming the removal action',
    async (variant) => {
      const { store, detailsPageData } = renderDetailsPage(variant);

      // open the confirmation modal
      userEvent.click(getByRemoveNoteButtonRole());

      userEvent.click(screen.getByTestId(TEST_ID.CONFIRMATION_MODAL.REMOVE_BUTTON));

      // redirect to the specified items page
      expect(queryFakeItemsPage()).toBeInTheDocument();
      expect(queryFakeItemsPage()).toHaveTextContent(variant);

      // remove specified items from store
      await waitFor(() => {
        expect(store.getState().items[`${variant}s`]).not.toIncludeAnyMembers([detailsPageData]);
      });
    },
  );

  testComponent(() => renderDetailsPage('note'), { suffixTestNames: 'when is note page' })
    .not.toBeInTheDocument(TEST_NAME.ARTICLE_LINK, queryDetailsTemplateArticleLink)
    .not.toBeInTheDocument(TEST_NAME.TWITTER_AVATAR, queryDetailsTemplateAvatar)
    .not.toBeInTheDocument(TEST_NAME.TWITTER_LINK, queryDetailsTemplateTwitterLink)
    .run();

  testComponent(() => renderDetailsPage('article'), { suffixTestNames: 'when is article page' })
    .toBeInTheDocument(TEST_NAME.ARTICLE_LINK, queryDetailsTemplateArticleLink)
    .withAttribute('href', articleItem.articleUrl)
    .not.toBeInTheDocument(TEST_NAME.TWITTER_AVATAR, queryDetailsTemplateAvatar)
    .not.toBeInTheDocument(TEST_NAME.TWITTER_LINK, queryDetailsTemplateTwitterLink)
    .run();

  testComponent(() => renderDetailsPage('twitter'), { suffixTestNames: 'when is twitter page' })
    .toBeInTheDocument(TEST_NAME.TWITTER_AVATAR, queryDetailsTemplateAvatar)
    .withAttribute('src', expect.stringContaining(twitterItem.twitterName as string))
    .toBeInTheDocument(TEST_NAME.TWITTER_LINK, queryDetailsTemplateTwitterLink)
    .withAttribute('href', `https://twitter.com/${twitterItem.twitterName as string}`)
    .not.toBeInTheDocument(TEST_NAME.ARTICLE_LINK, queryDetailsTemplateArticleLink)
    .run();
});
