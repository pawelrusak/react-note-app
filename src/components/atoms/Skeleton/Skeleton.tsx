import { darken } from 'polished';
import styled, { DefaultTheme } from 'styled-components';

import * as styledKeyframe from '~/theme/keyframes';

import type { CSSSizeUnitVariants } from '~/commonTypes';

const calculateLineHeightSpace = (theme: DefaultTheme) =>
  parseFloat(theme.lineHeight as string) * parseFloat(theme.fontSize.s) -
  parseFloat(theme.fontSize.s);

export type SkeletonProps = {
  readonly dark?: true;
  readonly width?: `${number}${CSSSizeUnitVariants}`;
};

const Skeleton = styled.div<SkeletonProps>`
  background: ${({ theme, dark }) => (dark ? theme.grey300 : theme.grey200)};
  height: ${({ theme }) => theme.fontSize.s};
  width: ${({ width }) => width || '100%'};
  margin-top: ${({ theme }) => `${calculateLineHeightSpace(theme) / 2}rem`};
  margin-bottom: ${({ theme }) => `${calculateLineHeightSpace(theme)}rem`};
  border-radius: 0.4rem;

  @media (prefers-reduced-motion: no-preference) {
    position: relative;
    color: ${({ theme, dark }) => darken(0.055, dark ? theme.grey300 : theme.grey200)};
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to left, transparent, currentcolor, transparent);
      animation: ${styledKeyframe.translate} 1.35s infinite;
    }
  }
`;

export default Skeleton;
