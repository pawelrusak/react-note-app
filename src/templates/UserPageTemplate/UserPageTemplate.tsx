import styled from 'styled-components';

import Sidebar from '~/components/organisms/Navbar/Navbar';

const StyledWrapper = styled.div`
  padding-left: 150px;
`;

export type UserPageTemplateProps = {
  readonly children: React.ReactNode;
};

const UserPageTemplate = ({ children }: UserPageTemplateProps) => (
  <StyledWrapper>
    <Sidebar />
    {children}
  </StyledWrapper>
);

export default UserPageTemplate;
