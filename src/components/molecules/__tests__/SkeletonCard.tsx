import { render, screen, testComponent } from 'testUtils';

import SkeletonCard from '../SkeletonCard/SkeletonCard';

type SkeletonCardType = 'Note' | 'Twitter' | 'Article';

const renderSkeletonCard = (cardType: SkeletonCardType) => {
  const itemType = cardType.toLowerCase() as 'note' | 'twitter' | 'article';
  const pageType = `${itemType}s` as const;

  return {
    ...render(<SkeletonCard />, { pageType }),
  };
};

const querySkeletonCardAvatarSkeleton = () => screen.queryByTestId('SkeletonCard_AvatarSkeleton');
const querySkeletonCardArticleLinkSkeleton = () =>
  screen.queryByTestId('SkeletonCard_ArticleLinkSkeleton');

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
