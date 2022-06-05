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

const { media } = styledMixin;

const StyledHeader = styled.header<Required<VariantColorValueProp>>`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: ${styledMixin.variantColorValue()};
  z-index: ${({ theme }) => theme.zIndex.navbar};
  box-shadow: 0px -3px 3.5px rgba(0, 0, 0, 0.16);

  ${media.greaterThan('sm')`
    top: 0;
    left: 0;
    right: auto;
    box-shadow: 0px 3px 3.5px rgba(0, 0, 0, 0.16);
  `}
`;

const StyledNav = styled.nav`
  width: 100vw;
  padding: 0.7rem 1.5rem;

  ${media.greaterThan('sm')`
    padding: 5.8rem 0 2.2rem;
    top: 0;
    left: 0;
    width: 13rem;
    height: 100vh;
  `};

  ${media.greaterThan('xl')`
    width: 15rem;
  `};
`;

const StyledLogo = styled.img`
  display: block;
  width: 7.3rem;
  object-fit: contain;
`;

const StyledMainLinksList = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: 3fr auto;

  ${media.greaterThan(`sm`)`
    display: flex;
    height: 100%;
    justify-content: space-between;
    width: auto;
    flex-direction: column;
    align-items: center;
  `}
`;

const StyledTypesOfNotesLinkList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  width: 100%;

  > li:first-of-type {
    justify-self: start;
  }

  ${media.greaterThan('sm')`
    display: block;
  `}

  > li {
    margin-bottom: 1rem;
    margin-bottom: clamp(1rem, -4.7rem + 6.3vw, 2.9rem);
  }

  @media screen and (max-height: 47.9em) {
    > li {
      margin-bottom: 1rem;
    }
  }

  ${media.lessThan('sm')`
    > li {
      margin-bottom: 0;
    }
  `}
`;

const StyledLogoListItem = styled.li`
  display: none;

  ${media.greaterThan('sm')`
    display: block;
    margin-bottom: 8rem;
    // 80px for 1400px device width, 119px for 1800px device width
    // https://royalfig.github.io/fluid-typography-calculator/
    margin-bottom: clamp(8rem, -5.65rem + 9.75vw, 11.9rem);
  `}
`;

const StyledButtonIcon = styled(ButtonIcon)`
  ${media.lessThan('sm')`
    border-radius: 4rem;
    height: 5rem;
    width: 5rem;
    background-size: 60% 60%;
  `}
`;

const StyledLogoutButtonIcon = styled(StyledButtonIcon)`
  background-size: 70% 50%;
  ${media.lessThan('sm')`
    background-size: 80%;
  `}
`;

const StyledLogoutListItem = styled.li`
  justify-self: end;

  ${media.greaterThan('sm')`
    margin-top: auto;
  `}
`;

const Navbar = () => {
  const pageVariant = useCurrentPageVariant();
  const { logout } = useAuth();

  return (
    <StyledHeader variant={pageVariant}>
      <StyledNav>
        <StyledMainLinksList>
          <StyledLogoListItem>
            <NavLink to="/">
              <StyledLogo src={logoIcon} alt="FavNote. logo" aria-hidden />
              <VisuallyHidden>FavNote.</VisuallyHidden>
            </NavLink>
          </StyledLogoListItem>
          <li>
            <VisuallyHidden>Types of notes</VisuallyHidden>
            <StyledTypesOfNotesLinkList>
              <li>
                <StyledButtonIcon as={NavLink} to="/notes" icon={penIcon} activeClassName="active">
                  <VisuallyHidden>Basic notes</VisuallyHidden>
                </StyledButtonIcon>
              </li>
              <li>
                <StyledButtonIcon
                  as={NavLink}
                  to="/twitters"
                  icon={twitterIcon}
                  activeClassName="active"
                >
                  <VisuallyHidden>Twitter notes</VisuallyHidden>
                </StyledButtonIcon>
              </li>
              <li>
                <StyledButtonIcon
                  as={NavLink}
                  to="/articles"
                  icon={bulbIcon}
                  activeClassName="active"
                >
                  <VisuallyHidden>Article notes</VisuallyHidden>
                </StyledButtonIcon>
              </li>
            </StyledTypesOfNotesLinkList>
          </li>
          <StyledLogoutListItem>
            <StyledLogoutButtonIcon type="button" onClick={logout} icon={logoutIcon}>
              <VisuallyHidden>Logout</VisuallyHidden>
            </StyledLogoutButtonIcon>
          </StyledLogoutListItem>
        </StyledMainLinksList>
      </StyledNav>
    </StyledHeader>
  );
};

export default Navbar;
