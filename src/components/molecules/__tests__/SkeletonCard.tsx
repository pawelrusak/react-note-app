import { render, screen, testComponent } from 'testUtils';

import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { TEST_ID, routes } from '~/constants';

import type { RoutesVariantRootPaths } from '~/commonTypes';

const renderSkeletonCard = (path: RoutesVariantRootPaths) => render(<SkeletonCard />, { path });

const querySkeletonCardAvatarSkeleton = () =>
  screen.queryByTestId(TEST_ID.SKELETON_CARD.AVATAR_SKELETON);
const querySkeletonCardArticleLinkSkeleton = () =>
  screen.queryByTestId(TEST_ID.SKELETON_CARD.ARTICLE_LINK_SKELETON);

const TEST_NAME = {
  TWITTER_AVATAR_SKELETON: 'twitter avatar skeleton',
  ARTICLE_LINK_SKELETON: 'article link skeleton',
};

describe('<SkeletonCard />', () => {
  testComponent(() => renderSkeletonCard(routes.notes), { suffixTestNames: 'when is note page' })
    .not.toBeInTheDocument(TEST_NAME.TWITTER_AVATAR_SKELETON, querySkeletonCardAvatarSkeleton)
    .not.toBeInTheDocument(TEST_NAME.ARTICLE_LINK_SKELETON, querySkeletonCardArticleLinkSkeleton)
    .run();

  testComponent(() => renderSkeletonCard(routes.twitters), {
    suffixTestNames: 'when is twitter page',
  })
    .toBeInTheDocument(TEST_NAME.TWITTER_AVATAR_SKELETON, querySkeletonCardAvatarSkeleton)
    .not.toBeInTheDocument(TEST_NAME.ARTICLE_LINK_SKELETON, querySkeletonCardArticleLinkSkeleton)
    .run();

  testComponent(() => renderSkeletonCard(routes.articles), {
    suffixTestNames: 'when is article page',
  })
    .toBeInTheDocument(TEST_NAME.ARTICLE_LINK_SKELETON, querySkeletonCardArticleLinkSkeleton)
    .not.toBeInTheDocument(TEST_NAME.TWITTER_AVATAR_SKELETON, querySkeletonCardAvatarSkeleton)
    .run();
});
