import styled from 'styled-components';

import Navbar from '~/components/organisms/Navbar/Navbar';
import { media } from '~/theme/mixins';

const StyledWrapper = styled.div`
  ${media.greaterThan('sm')`
    padding-left: 13rem;
  `}

  ${media.greaterThan('xl')`
    padding-left: 15rem;
  `}
`;

export type UserPageTemplateProps = {
  readonly children: React.ReactNode;
};

const UserPageTemplate = ({ children }: UserPageTemplateProps) => (
  <StyledWrapper>
    <Navbar />
    {children}
  </StyledWrapper>
);

export default UserPageTemplate;
