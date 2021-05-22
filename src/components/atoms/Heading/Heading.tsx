import styled from 'styled-components';

export type HeadingProps = {
  readonly big?: boolean;
};

const Heading = styled.h1<HeadingProps>`
  font-size: ${({ theme, big }) => (big ? theme.fontSize.xl : theme.fontSize.l)};
  font-weight: ${({ theme }) => theme.bold};
`;

export default Heading;
