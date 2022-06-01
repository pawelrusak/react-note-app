import styled, { css } from 'styled-components';

import bulbIcon from '~/assets/icons/bulb.svg';
import logoImg from '~/assets/icons/logo.svg';
import penIcon from '~/assets/icons/pen.svg';
import twitterIcon from '~/assets/icons/twitter.svg';

import ButtonIcon from '~/components/atoms/ButtonIcon/ButtonIcon';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import { media } from '~/theme/mixins';
import { VisuallyHidden } from '~/utils';

export const styledWrapperXsStyles = css`
  background-color: ${({ theme }) => theme.notes};
`;

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;

  ${media.greaterThan('xs')`
     ${styledWrapperXsStyles};
  `}
`;

const StyledHeader = styled.header`
  text-align: center;
`;

const StyledLogo = styled.img`
  width: 14.1rem;
  height: auto;
  margin-bottom: 6.6rem;

  ${media.greaterThan('xs')`
    margin-bottom: 1.1rem; 
    filter: invert(1);
  `}

  ${media.greaterThan('md')`
    width: 17rem; 
    
  `}

  ${media.greaterThan('lg')`
    margin-top: ${(45 / 1080) * 100}vh;
  `}  

  ${media.greaterThan('xl')`
    margin-bottom: calc(1.1rem + ${(26 / 1080) * 100}vh);
    width: 23.8rem; 
  `}
`;

const StyledAuthCard = styled.div`
  width: 100%;

  background-color: white;
  border-radius: 7px;

  ${media.greaterThan('xs')`
    width: 42rem;
    min-height: 42rem;
    margin-bottom: 0.8rem;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem;
    box-shadow: 0px 3px 8.5px rgba(0, 0, 0, 0.16);
  `}

  ${media.greaterThan('xl')`
    width: 57.4rem;
    min-height: 51.6rem;
    padding: 5.8rem 10rem;
  `}
`;

const StyledSubHeading = styled(Paragraph)`
  display: none;
  font-size: 2.6rem;
  line-height: 3rem;

  font-weight: ${({ theme }) => theme.bold};

  ${media.greaterThan('xs')`
    display: block;
    margin-bottom: 1.1rem; 
  `}

  ${media.greaterThan('md')`
    font-size: 3.2rem;
    line-height: 3.6rem;
  `}

  ${media.greaterThan('xl')`
    font-size: 3.8rem;
    line-height: 4rem;
  `}
`;

const StyledTextBlock = styled.span`
  display: block;
`;

const ButtonIconGroup = styled.div`
  display: none;

  ${media.greaterThan('xl')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 26.9rem;
    margin: 0 auto;
    margin-top: calc(1.1rem + ${(14 / 1080) * 100}vh);
    margin-bottom: calc(1.1rem + ${(20 / 1080) * 100}vh);
  `}
`;

export type AuthTemplateProps = {
  children: JSX.Element;
};

const AuthTemplate = ({ children }: AuthTemplateProps) => (
  <StyledWrapper>
    <StyledHeader>
      <h1>
        <StyledLogo src={logoImg} aria-hidden alt="FavNote." />
        <VisuallyHidden>FavNote.</VisuallyHidden>
      </h1>
      <StyledSubHeading>
        <StyledTextBlock>Your new favorite</StyledTextBlock> online notes experience
      </StyledSubHeading>
      <ButtonIconGroup aria-hidden>
        <ButtonIcon icon={penIcon} />
        <ButtonIcon icon={twitterIcon} />
        <ButtonIcon icon={bulbIcon} />
      </ButtonIconGroup>
    </StyledHeader>
    <StyledAuthCard>{children}</StyledAuthCard>
  </StyledWrapper>
);

// export for storybook decorators
AuthTemplate.AuthCard = StyledAuthCard;

export default AuthTemplate;
