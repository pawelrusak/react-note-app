import styled from 'styled-components';

import Navbar from '~/components/organisms/Navbar/Navbar';

const StyledWrapper = styled.div`
  padding-left: 150px;
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
