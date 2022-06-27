import { lighten as lightenMixin } from 'polished';
import styled, { css } from 'styled-components';

import Skeleton from '~/components/atoms/Skeleton/Skeleton';
import Card from '~/components/molecules/Card/Card';
import { TEST_ID } from '~/constants';
import { useCurrentPageVariant } from '~/hooks';
import * as styledMixin from '~/theme/mixins';

import type { RequiredOnlyWithNever, Never } from '~/commonTypes';
import type { VariantColorValueProp } from '~/theme/mixins';

const LIGHTEN_ACTIVE_COLOR_AMOUNT = 0.17;

type LightenProps = {
  readonly lighten: boolean;
  readonly lightenAmount: number | string;
};

type GreyProp = {
  readonly grey: boolean;
};

type StyledCardHeaderProps = LightenProps & Required<VariantColorValueProp> & GreyProp;

const StyledCardHeader = styled(Card.Header)<StyledCardHeaderProps>`
  background-color: ${styledMixin.variantColorValue({ lighten: true })};

  ${({ lighten }) =>
    lighten &&
    css<Required<VariantColorValueProp> & LightenProps>`
      background-color: ${({ variant, theme, lightenAmount }) =>
        lightenMixin(lightenAmount, theme[variant])};
    `}

  ${({ grey }) =>
    grey &&
    css`
      background-color: ${({ theme }) => theme.grey100};
    `}
`;

const StyledSkeletonHeading = styled(Skeleton)`
  width: 60%;
  height: ${({ theme }) => theme.fontSize.l};
  margin: 5px 0 0;
`;

const StyledSkeletonTime = styled(Skeleton)`
  margin: 10px 0 0;
  width: 4.5rem;
  height: ${({ theme }) => theme.fontSize.xs};
`;

type StyledAvatarSkeletonProps = LightenProps & GreyProp;

const StyledAvatarSkeleton = styled(Skeleton)<StyledAvatarSkeletonProps>`
  margin: 0;
  width: 86px;
  height: 86px;
  border: 5px solid
    ${({ theme, lighten, lightenAmount }) =>
      lightenMixin(lighten ? lightenAmount : 0.1, theme.twitters)};
  border-radius: 50%;
  position: absolute;
  right: 25px;
  top: 25px;

  ${({ grey }) =>
    grey &&
    css`
      border-color: ${({ theme }) => theme.grey100};
    `}
`;

const StyledLinkButtonSkeleton = styled(Skeleton)`
  margin: 0;
  display: block;
  width: 47px;
  height: 47px;
  border-radius: 50px;
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledSecondaryButtonSkeleton = styled(Skeleton)`
  width: 105px;
  height: 30px;
  margin: auto 0 0;
  border-radius: 50px;
`;

type BaseSkeletonCardProps = Partial<LightenProps & GreyProp>;

type SkeletonCardWithoutProps = Never<BaseSkeletonCardProps>;
type SkeletonCardWithOnlyGreyProp = RequiredOnlyWithNever<BaseSkeletonCardProps, 'grey'>;
type SkeletonCardWithOnlyLightenProp = RequiredOnlyWithNever<BaseSkeletonCardProps, 'lighten'>;
type SkeletonCardWithLightenAndAmountProps = RequiredOnlyWithNever<
  BaseSkeletonCardProps,
  'lighten' | 'lightenAmount'
>;

export type SkeletonCardProps =
  | SkeletonCardWithoutProps
  | SkeletonCardWithOnlyGreyProp
  | SkeletonCardWithOnlyLightenProp
  | SkeletonCardWithLightenAndAmountProps;

const defaultProps = {
  lighten: false,
  lightenAmount: LIGHTEN_ACTIVE_COLOR_AMOUNT,
  grey: false,
};

const SkeletonCard = ({
  lighten,
  lightenAmount,
  grey,
}: SkeletonCardProps & typeof defaultProps) => {
  const pageVariant = useCurrentPageVariant();

  return (
    <Card.Wrapper data-testid={TEST_ID.SKELETON_CARD.WRAPPER}>
      <StyledCardHeader
        lighten={lighten}
        lightenAmount={lightenAmount}
        variant={pageVariant}
        grey={grey}
        as="div"
      >
        <StyledSkeletonHeading dark />
        <StyledSkeletonTime dark />
        {pageVariant === 'twitters' && (
          <StyledAvatarSkeleton
            data-testid={TEST_ID.SKELETON_CARD.AVATAR_SKELETON}
            lightenAmount={lightenAmount}
            lighten={lighten}
            grey={grey}
            dark
          />
        )}
        {pageVariant === 'articles' && (
          <StyledLinkButtonSkeleton
            data-testid={TEST_ID.SKELETON_CARD.ARTICLE_LINK_SKELETON}
            dark
          />
        )}
      </StyledCardHeader>
      <Card.Body>
        <Skeleton width="80%" />
        <Skeleton width="95%" />
        <Skeleton width="70%" />
        <Skeleton width="9rem" dark />
        <StyledSecondaryButtonSkeleton />
      </Card.Body>
    </Card.Wrapper>
  );
};

SkeletonCard.defaultProps = defaultProps;

export default SkeletonCard;
