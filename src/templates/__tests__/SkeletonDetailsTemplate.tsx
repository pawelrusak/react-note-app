import { render, screen, testComponent } from 'testUtils';

import SkeletonDetailsTemplate from '../SkeletonDetailsTemplate/SkeletonDetailsTemplate';
import { routes } from '~/routes';

import type { RoutesVariantRootPaths } from '~/commonTypes';

const renderSkeletonDetailsTemplate = (path: RoutesVariantRootPaths) =>
  render(<SkeletonDetailsTemplate />, { path });

const querySkeletonDetailsTemplateAvatarSkeleton = () =>
  screen.queryByTestId('SkeletonDetailsTemplate_AvatarSkeleton');
const querySkeletonDetailsTemplateLinkSkeleton = () =>
  screen.queryByTestId('SkeletonDetailsTemplate_LinkSkeleton');

const TEST_NAME = {
  TWITTER_AVATAR_SKELETON: 'twitter avatar skeleton',
  LINK_SKELETON: 'link skeleton',
};

describe('<SkeletonDetailsTemplate />', () => {
  testComponent(() => renderSkeletonDetailsTemplate(routes.notes), {
    suffixTestNames: 'when is note page',
  })
    .not.toBeInTheDocument(
      TEST_NAME.TWITTER_AVATAR_SKELETON,
      querySkeletonDetailsTemplateAvatarSkeleton,
    )
    .not.toBeInTheDocument(TEST_NAME.LINK_SKELETON, querySkeletonDetailsTemplateLinkSkeleton)
    .run();

  testComponent(() => renderSkeletonDetailsTemplate(routes.twitters), {
    suffixTestNames: 'when is twitter page',
  })
    .toBeInTheDocument(
      TEST_NAME.TWITTER_AVATAR_SKELETON,
      querySkeletonDetailsTemplateAvatarSkeleton,
    )
    .toBeInTheDocument(TEST_NAME.LINK_SKELETON, querySkeletonDetailsTemplateLinkSkeleton)
    .run();

  testComponent(() => renderSkeletonDetailsTemplate(routes.articles), {
    suffixTestNames: 'when is article page',
  })
    .toBeInTheDocument(TEST_NAME.LINK_SKELETON, querySkeletonDetailsTemplateLinkSkeleton)
    .not.toBeInTheDocument(
      TEST_NAME.TWITTER_AVATAR_SKELETON,
      querySkeletonDetailsTemplateAvatarSkeleton,
    )
    .run();
});
