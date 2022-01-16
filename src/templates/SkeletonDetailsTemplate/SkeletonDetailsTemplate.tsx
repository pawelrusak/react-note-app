import { lighten } from 'polished';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Skeleton from '~/components/atoms/Skeleton/Skeleton';
import { TEST_ID } from '~/constants';
import { useCurrentPageVariant } from '~/hooks';
import DetailsTemplate from '~/templates/DetailsTemplate/DetailsTemplate';
import UserPageTemplate from '~/templates/UserPageTemplate/UserPageTemplate';

import type { VariantColorValueProp } from '~/theme/mixins';

const LIGHTEN_ACTIVE_COLOR_AMOUNT = 0.17;

const StyledSkeletonHeading = styled(Skeleton)`
  height: ${({ theme }) => theme.fontSize.xl};
  margin: 2.5rem 0 3rem;
`;

const StyledSkeletonParagraph = styled(Skeleton)`
  height: ${({ theme }) => theme.fontSize.s};
  margin-bottom: 5rem;
`;

const StyledAvatarSkeleton = styled(Skeleton)`
  position: absolute;
  right: -80px;
  top: 50px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const StyledLinkSkeleton = styled(Skeleton)`
  font-size: ${({ theme }) => theme.fontSize.s};
  width: 17rem;
  margin: 2.5rem 0 0;
`;

const StyledButton = styled(Button)<Required<VariantColorValueProp>>`
  cursor: default;
  margin-top: 5rem;

  &,
  &:hover {
    background-color: ${({ variant, theme }) =>
      lighten(LIGHTEN_ACTIVE_COLOR_AMOUNT, theme[variant])};
  }
`;

const StyledSkeletonButtonText = styled(Skeleton)`
  width: 11rem;
  margin: 0;
`;

const StyledSkeletonRemoveButton = styled(Skeleton)`
  width: 8.5rem;
  height: 1.5rem;
  margin: 2.1rem 0 0;
`;

const SkeletonDetailsTemplate = () => {
  const pageVariant = useCurrentPageVariant();

  return (
    <UserPageTemplate>
      <DetailsTemplate.Wrapper data-testid={TEST_ID.SKELETON_DETAILS_TEMPLATE.WRAPPER}>
        <DetailsTemplate.PageHeader>
          <StyledSkeletonHeading dark width="37rem" />
          <StyledSkeletonParagraph dark width="17rem" />
        </DetailsTemplate.PageHeader>
        {pageVariant === 'twitters' && (
          <StyledAvatarSkeleton
            dark
            data-testid={TEST_ID.SKELETON_DETAILS_TEMPLATE.AVATAR_SKELETON}
          />
        )}
        <Skeleton width="90%" />
        <Skeleton width="95%" />
        <Skeleton width="85%" />
        <Skeleton width="75%" />
        {(pageVariant === 'articles' || pageVariant === 'twitters') && (
          <StyledLinkSkeleton dark data-testid={TEST_ID.SKELETON_DETAILS_TEMPLATE.LINK_SKELETON} />
        )}
        <StyledButton as="div" variant={pageVariant}>
          <StyledSkeletonButtonText dark />
        </StyledButton>
        <StyledSkeletonRemoveButton dark />
      </DetailsTemplate.Wrapper>
    </UserPageTemplate>
  );
};

export default SkeletonDetailsTemplate;
