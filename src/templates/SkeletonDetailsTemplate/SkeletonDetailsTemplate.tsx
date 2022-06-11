import { lighten } from 'polished';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Skeleton from '~/components/atoms/Skeleton/Skeleton';
import { TEST_ID } from '~/constants';
import { useCurrentPageVariant } from '~/hooks';
import DetailsTemplate from '~/templates/DetailsTemplate/DetailsTemplate';
import UserPageTemplate from '~/templates/UserPageTemplate/UserPageTemplate';
import { media } from '~/theme/mixins';

import type { VariantColorValueProp } from '~/theme/mixins';

const LIGHTEN_ACTIVE_COLOR_AMOUNT = 0.17;

const StyledSkeletonHeading = styled(Skeleton)`
  /* height: ${({ theme }) => theme.fontSize.xl}; */
  height: 3rem;
  /* margin: 2.5rem 0 3rem; */
  width: max(16rem, 50vw);

  margin: 1.5rem 0;

  ${media.greaterThan('xs')`;
    height: 3.6rem;
    width: 20rem;
  `}

  ${media.greaterThan('sm')`
    margin: 2rem 0;
    width: 23rem;
  `}

  ${media.greaterThan('md')`
    width: 30rem;
  `}

  ${media.greaterThan('lg')`
    margin-top: 3.8rem;
    margin-bottom: 2.3rem;
    width: 32rem;
  `}

  ${media.greaterThan('xl')`;
    height: ${({ theme }) => theme.fontSize.xl};
  `}
`;

const StyledSkeletonParagraph = styled(Skeleton)`
  /* height: ${({ theme }) => theme.fontSize.s}; */
  /* margin-bottom: 5rem; */
  height: 1.5rem;
  margin-bottom: 3.5rem;
  width: 15rem;

  ${media.greaterThan('xs')`
    width: 17rem;
  `}

  ${media.greaterThan('sm')`
    margin-bottom: 3rem;
  `}

  ${media.greaterThan('lg')`
    margin-bottom: 3.2rem;
  `}
`;

const StyledAvatarSkeleton = styled(Skeleton)`
  /* position: absolute; */
  /* right: -80px; */
  /* top: 50px; */
  /* width: 120px; */
  /* height: 120px; */
  /* border-radius: 50%; */
  width: 9rem;
  height: 9rem;
  width: clamp(9rem, 6.6rem + 6vw, 12rem);
  height: clamp(9rem, 6.6rem + 6vw, 12rem);
  border-radius: 50%;
  margin-left: 1rem;

  ${media.greaterThan('xs')`
    width: 10.5rem;
    height: 10.5rem;
  `}

  ${media.greaterThan('sm')`
    margin-left: 3rem;
    width: 12rem;
    height: 12rem;
  `}

  ${media.greaterThan('lg')`
    margin-left: 3rem;
    width: 14.4rem;
    height: 14.4rem;
    width: clamp(12rem, 3.6rem + 6vw, 14.4rem);
    height: clamp(12rem, 3.6rem + 6vw, 14.4rem);
  `}
`;

const StyledSkeletonLink = styled(Skeleton)`
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

  margin-top: 5rem;
  margin-bottom: 1.9rem;

  ${media.greaterThan('sm')`
    margin-top: 6rem;
  `}

  ${media.greaterThan('lg')`
    margin-top: 8.1rem;
  `}
`;

const StyledSkeletonButtonText = styled(Skeleton)`
  width: 11rem;
  margin: 0 auto;
`;

const StyledSkeletonRemoveButton = styled(Skeleton)`
  width: 9rem;
  height: 1.5rem;
  /* margin: 2.1rem 0 0; */
`;

const SkeletonDetailsTemplate = () => {
  const pageVariant = useCurrentPageVariant();

  return (
    <UserPageTemplate>
      <DetailsTemplate.Wrapper as="div" data-testid={TEST_ID.SKELETON_DETAILS_TEMPLATE.WRAPPER}>
        <DetailsTemplate.PageHeader as="div">
          <div>
            <StyledSkeletonHeading dark />
            <StyledSkeletonParagraph dark width="17rem" />
          </div>
          {pageVariant === 'twitters' && (
            <StyledAvatarSkeleton
              dark
              data-testid={TEST_ID.SKELETON_DETAILS_TEMPLATE.AVATAR_SKELETON}
            />
          )}
        </DetailsTemplate.PageHeader>
        <Skeleton width="90%" />
        <Skeleton width="95%" />
        <Skeleton width="85%" />
        <Skeleton width="75%" />
        {(pageVariant === 'articles' || pageVariant === 'twitters') && (
          <StyledSkeletonLink dark data-testid={TEST_ID.SKELETON_DETAILS_TEMPLATE.LINK_SKELETON} />
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
