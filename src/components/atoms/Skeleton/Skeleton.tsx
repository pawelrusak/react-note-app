import styled, { DefaultTheme } from 'styled-components';

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
`;

export default Skeleton;
