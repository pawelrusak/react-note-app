import { lighten } from 'polished';
import styled from 'styled-components';

import Skeleton from '~/components/atoms/Skeleton/Skeleton';
import Card from '~/components/molecules/Card/Card';

import { usePageTypeContext } from '~/hooks';
import * as styledMixin from '~/theme/mixins';

const StyledCardHeaderWrapper = styled(Card.HeaderWrapper)`
  ${styledMixin.lightenActiveColor};
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

const StyledAvatarSkeleton = styled(Skeleton)`
  margin: 0;
  width: 86px;
  height: 86px;
  border: 5px solid ${({ theme }) => lighten(0.1, theme.twitters)};
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

const SkeletonCard = () => {
  const itemType = usePageTypeContext();

  return (
    <Card.Wrapper>
      <StyledCardHeaderWrapper activecolor={itemType}>
        <StyledSkeletonHeading dark />
        <StyledSkeletonTime dark />
        {itemType === 'twitters' && <StyledAvatarSkeleton dark />}
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

export default SkeletonCard;
