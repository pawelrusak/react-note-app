import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import bulbIcon from '~/assets/icons/bulb.svg';
import logoIcon from '~/assets/icons/logo.svg';
import logoutIcon from '~/assets/icons/logout.svg';
import penIcon from '~/assets/icons/pen.svg';
import twitterIcon from '~/assets/icons/twitter.svg';
import ButtonIcon from '~/components/atoms/ButtonIcon/ButtonIcon';
import { usePageTypeContext, useAuth } from '~/hooks';
import * as styledMixin from '~/theme/mixins';

import type { VariantColorValueProp } from '~/theme/mixins';

const StyledWrapper = styled.nav<Required<VariantColorValueProp>>`
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px 0;
  width: 150px;
  height: 100vh;
  background-color: ${styledMixin.variantColorValue()};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 67px;
  height: 67px;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  border: none;
  margin-bottom: 10vh;
`;

const StyledLogoutButton = styled(ButtonIcon)`
  margin-top: auto;
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Sidebar = () => {
  const pageContext = usePageTypeContext();
  const { logout } = useAuth();

  return (
    <StyledWrapper variant={pageContext}>
      <StyledLogoLink to="/" />
      <StyledLinksList>
        <li>
          <ButtonIcon as={NavLink} to="/notes" icon={penIcon} activeClassName="active" />
        </li>
        <li>
          <ButtonIcon as={NavLink} to="/twitters" icon={twitterIcon} activeClassName="active" />
        </li>
        <li>
          <ButtonIcon as={NavLink} to="/articles" icon={bulbIcon} activeClassName="active" />
        </li>
      </StyledLinksList>
      <StyledLogoutButton aria-label="logout" type="button" onClick={logout} icon={logoutIcon} />
    </StyledWrapper>
  );
};

export default Sidebar;
