import { render, screen, testComponent } from 'testUtils';

import SkeletonDetailsTemplate from '../SkeletonDetailsTemplate/SkeletonDetailsTemplate';
import { TEST_ID, ROUTES_PATHS } from '~/constants';

import type { RoutesVariantRootPath } from '~/commonTypes';

const renderSkeletonDetailsTemplate = (path: RoutesVariantRootPath) =>
  render(<SkeletonDetailsTemplate />, { path });

const querySkeletonDetailsTemplateAvatarSkeleton = () =>
  screen.queryByTestId(TEST_ID.SKELETON_DETAILS_TEMPLATE.AVATAR_SKELETON);
const querySkeletonDetailsTemplateLinkSkeleton = () =>
  screen.queryByTestId(TEST_ID.SKELETON_DETAILS_TEMPLATE.LINK_SKELETON);

const TEST_NAME = {
  TWITTER_AVATAR_SKELETON: 'twitter avatar skeleton',
  LINK_SKELETON: 'link skeleton',
};

describe('<SkeletonDetailsTemplate />', () => {
  testComponent(() => renderSkeletonDetailsTemplate(ROUTES_PATHS.notes), {
    suffixTestNames: 'when is note page',
  })
    .not.toBeInTheDocument(
      TEST_NAME.TWITTER_AVATAR_SKELETON,
      querySkeletonDetailsTemplateAvatarSkeleton,
    )
    .not.toBeInTheDocument(TEST_NAME.LINK_SKELETON, querySkeletonDetailsTemplateLinkSkeleton)
    .run();

  testComponent(() => renderSkeletonDetailsTemplate(ROUTES_PATHS.twitters), {
    suffixTestNames: 'when is twitter page',
  })
    .toBeInTheDocument(
      TEST_NAME.TWITTER_AVATAR_SKELETON,
      querySkeletonDetailsTemplateAvatarSkeleton,
    )
    .toBeInTheDocument(TEST_NAME.LINK_SKELETON, querySkeletonDetailsTemplateLinkSkeleton)
    .run();

  testComponent(() => renderSkeletonDetailsTemplate(ROUTES_PATHS.articles), {
    suffixTestNames: 'when is article page',
  })
    .toBeInTheDocument(TEST_NAME.LINK_SKELETON, querySkeletonDetailsTemplateLinkSkeleton)
    .not.toBeInTheDocument(
      TEST_NAME.TWITTER_AVATAR_SKELETON,
      querySkeletonDetailsTemplateAvatarSkeleton,
    )
    .run();
});
