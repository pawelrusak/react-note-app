import styled from 'styled-components';

import { media } from '~/theme/mixins';

export type HeadingProps = {
  readonly big?: boolean;
};

const Heading = styled.h1<HeadingProps>`
  font-style: normal;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme, big }) => (big ? theme.fontSize.xl : '2.2rem')};
  line-height: ${({ big }) => (big ? 1 : 1.21)};

  color: ${({ theme }) => theme.black};

  ${media.greaterThan<HeadingProps>('xs')`;
    font-size: ${({ theme, big }) => (big ? theme.fontSize.xl : theme.fontSize.l)};
    line-height: ${({ big }) => (big ? 1.11 : 1.2)};
  `}

  ${media.greaterThan<HeadingProps>('xl')`;
    font-size: ${({ theme, big }) => big && theme.fontSize.xl};
    line-height: ${({ big }) => big && 1};
  `}
`;

export default Heading;
