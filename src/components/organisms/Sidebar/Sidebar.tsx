import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import bulbIcon from '~/assets/icons/bulb.svg';
import logoIcon from '~/assets/icons/logo.svg';
import logoutIcon from '~/assets/icons/logout.svg';
import penIcon from '~/assets/icons/pen.svg';
import twitterIcon from '~/assets/icons/twitter.svg';
import ButtonIcon from '~/components/atoms/ButtonIcon/ButtonIcon';
import { useCurrentPageVariant, useAuth } from '~/hooks';
import * as styledMixin from '~/theme/mixins';
import { VisuallyHidden } from '~/utils';

import type { VariantColorValueProp } from '~/theme/mixins';

const StyledHeader = styled.header<Required<VariantColorValueProp>>`
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${styledMixin.variantColorValue()};
`;

const StyledNav = styled.nav`
  padding: 25px 0;
  width: 150px;
  height: 100vh;
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
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledMainLinksList = styled(StyledLinksList)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogoListItem = styled.li`
  margin-bottom: 10vh;
`;

const StyledLogoutListItem = styled.li`
  margin-top: auto;
`;

const Sidebar = () => {
  const pageVariant = useCurrentPageVariant();
  const { logout } = useAuth();

  return (
    <StyledHeader variant={pageVariant}>
      <StyledNav>
        <StyledMainLinksList>
          <StyledLogoListItem>
            <StyledLogoLink to="/">
              <VisuallyHidden>FavNote.</VisuallyHidden>
            </StyledLogoLink>
          </StyledLogoListItem>
          <li>
            <VisuallyHidden>Types of notes</VisuallyHidden>
            <StyledLinksList>
              <li>
                <ButtonIcon as={NavLink} to="/notes" icon={penIcon} activeClassName="active">
                  <VisuallyHidden>Basic notes</VisuallyHidden>
                </ButtonIcon>
              </li>
              <li>
                <ButtonIcon as={NavLink} to="/twitters" icon={twitterIcon} activeClassName="active">
                  <VisuallyHidden>Twitter notes</VisuallyHidden>
                </ButtonIcon>
              </li>
              <li>
                <ButtonIcon as={NavLink} to="/articles" icon={bulbIcon} activeClassName="active">
                  <VisuallyHidden>Article notes</VisuallyHidden>
                </ButtonIcon>
              </li>
            </StyledLinksList>
          </li>
          <StyledLogoutListItem>
            <ButtonIcon type="button" onClick={logout} icon={logoutIcon}>
              <VisuallyHidden>Logout</VisuallyHidden>
            </ButtonIcon>
          </StyledLogoutListItem>
        </StyledMainLinksList>
      </StyledNav>
    </StyledHeader>
  );
};

export default Sidebar;
