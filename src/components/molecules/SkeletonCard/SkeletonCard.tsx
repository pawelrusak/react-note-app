import { lighten as lightenMixin } from 'polished';
import styled, { css } from 'styled-components';

import Skeleton from '~/components/atoms/Skeleton/Skeleton';
import Card from '~/components/molecules/Card/Card';

import { usePageTypeContext } from '~/hooks';
import * as styledMixin from '~/theme/mixins';

import type { ActiveColorArgs } from '~/theme/mixins';

const LIGHTEN_ACTIVE_COLOR_AMOUNT = 0.17;

type LightenActiveColor = {
  readonly lightenActiveColor: boolean;
  readonly lightenActiveColorAmount: number | string;
};

type StyledCardHeaderWrapperProps = LightenActiveColor & Required<ActiveColorArgs>;

const StyledCardHeaderWrapper = styled(Card.HeaderWrapper)<StyledCardHeaderWrapperProps>`
  ${styledMixin.lightenActiveColor};

  ${({ lightenActiveColor }) =>
    lightenActiveColor &&
    css<Required<ActiveColorArgs> & LightenActiveColor>`
      background-color: ${({ activecolor, theme, lightenActiveColorAmount }) =>
        lightenMixin(lightenActiveColorAmount, theme[activecolor])};
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

type StyledAvatarSkeletonProps = LightenActiveColor;

const StyledAvatarSkeleton = styled(Skeleton)<StyledAvatarSkeletonProps>`
  margin: 0;
  width: 86px;
  height: 86px;
  border: 5px solid
    ${({ theme, lightenActiveColor, lightenActiveColorAmount }) =>
      lightenMixin(lightenActiveColor ? lightenActiveColorAmount : 0.1, theme.twitters)};
  border-radius: 50%;
  position: absolute;
  right: 25px;
  top: 25px;
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

export type SkeletonCardProps =
  | {
      readonly lighten?: false;
      readonly lightenAmount?: number | string;
    }
  | {
      readonly lighten: true;
      readonly lightenAmount?: number | string;
    };

const defaultProps = {
  lighten: false,
  lightenAmount: LIGHTEN_ACTIVE_COLOR_AMOUNT,
};

const SkeletonCard = ({ lighten, lightenAmount }: SkeletonCardProps & typeof defaultProps) => {
  const itemType = usePageTypeContext();

  return (
    <Card.Wrapper>
      <StyledCardHeaderWrapper
        lightenActiveColor={lighten}
        lightenActiveColorAmount={lightenAmount}
        activecolor={itemType}
      >
        <StyledSkeletonHeading dark />
        <StyledSkeletonTime dark />
        {itemType === 'twitters' && (
          <StyledAvatarSkeleton
            lightenActiveColorAmount={lightenAmount}
            lightenActiveColor={lighten}
            dark
          />
        )}
        {itemType === 'articles' && <StyledLinkButtonSkeleton dark />}
      </StyledCardHeaderWrapper>
      <Card.ContentWrapper>
        <Skeleton width="80%" />
        <Skeleton width="95%" />
        <Skeleton width="70%" />
        <Skeleton width="9rem" dark />
        <StyledSecondaryButtonSkeleton />
      </Card.ContentWrapper>
    </Card.Wrapper>
  );
};

SkeletonCard.defaultProps = defaultProps;

export default SkeletonCard;
