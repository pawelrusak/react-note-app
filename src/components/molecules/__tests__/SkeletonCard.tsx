import { render, screen, testComponent } from 'testUtils';

import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { TEST_ID } from '~/constants/tests';

type SkeletonCardType = 'Note' | 'Twitter' | 'Article';

const renderSkeletonCard = (cardType: SkeletonCardType) => {
  const itemType = cardType.toLowerCase() as 'note' | 'twitter' | 'article';
  const pageType = `${itemType}s` as const;

  return {
    ...render(<SkeletonCard />, { pageType }),
  };
};

const querySkeletonCardAvatarSkeleton = () =>
  screen.queryByTestId(TEST_ID.SKELETON_CARD.AVATAR_SKELETON);
const querySkeletonCardArticleLinkSkeleton = () =>
  screen.queryByTestId(TEST_ID.SKELETON_CARD.ARTICLE_LINK_SKELETON);

const TEST_NAME = {
  TWITTER_AVATAR_SKELETON: 'twitter avatar skeleton',
  ARTICLE_LINK_SKELETON: 'article link skeleton',
};

describe('<SkeletonCard />', () => {
  testComponent(() => renderSkeletonCard('Note'), { suffixTestNames: 'when is note page' })
    .not.toBeInTheDocument(TEST_NAME.TWITTER_AVATAR_SKELETON, querySkeletonCardAvatarSkeleton)
    .not.toBeInTheDocument(TEST_NAME.ARTICLE_LINK_SKELETON, querySkeletonCardArticleLinkSkeleton)
    .run();

  testComponent(() => renderSkeletonCard('Twitter'), { suffixTestNames: 'when is twitter page' })
    .toBeInTheDocument(TEST_NAME.TWITTER_AVATAR_SKELETON, querySkeletonCardAvatarSkeleton)
    .not.toBeInTheDocument(TEST_NAME.ARTICLE_LINK_SKELETON, querySkeletonCardArticleLinkSkeleton)
    .run();

  testComponent(() => renderSkeletonCard('Article'), { suffixTestNames: 'when is article page' })
    .toBeInTheDocument(TEST_NAME.ARTICLE_LINK_SKELETON, querySkeletonCardArticleLinkSkeleton)
    .not.toBeInTheDocument(TEST_NAME.TWITTER_AVATAR_SKELETON, querySkeletonCardAvatarSkeleton)
    .run();
});
