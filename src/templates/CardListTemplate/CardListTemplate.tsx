import styled from 'styled-components';

import plusIcon from '~/assets/icons/plus.svg';
import ButtonIcon from '~/components/atoms/ButtonIcon/ButtonIcon';
import Heading from '~/components/atoms/Heading/Heading';
import Counter from '~/components/molecules/Counter/Counter';
import Search from '~/components/molecules/Search/Search';
import NewItemBar from '~/components/organisms/NewItemBar/NewItemBar';
import { useToggle, useCurrentPageVariant } from '~/hooks';
import UserPageTemplate from '~/templates/UserPageTemplate/UserPageTemplate';
import { media } from '~/theme/mixins';
import * as styledMixin from '~/theme/mixins';
import { VisuallyHidden } from '~/utils';

import type { VariantColorValueProp } from '~/theme/mixins';

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;

  padding: 2rem 1.5rem 6.4rem;

  ${media.greaterThan('xs')`
    padding: 3rem 6rem 6.4rem;
  `}

  ${media.greaterThan('sm')`
    padding: 4rem 17rem 4rem 8.7rem;

    padding-right: 10rem;
    padding-right: clamp(10rem, 6.5rem + 5.8vw, 17rem);
  `}

  ${media.greaterThan('xl')`
    padding: 5.8rem 16rem 4rem 7rem;
  `}
`;

const StyledMainHeader = styled.header`
  margin-bottom: 2rem;

  ${media.greaterThan('xs')`
    margin-bottom: 3.2rem;
  `}

  ${media.greaterThan('sm')`
    display: flex;
    flex-direction: column-reverse;

    margin-bottom: 4.4rem;
  `}

  ${media.greaterThan('xl')`
    margin-bottom: 5.4rem;
  `}
`;

const StyledHeadings = styled.div`
  margin-bottom: 2rem;

  ${media.greaterThan('sm')`
    margin-bottom: 0;
  `}
`;

const StyledHeading = styled(Heading)`
  line-height: 1;
  margin: 2rem 0 0.6rem;

  &::first-letter {
    text-transform: uppercase;
  }

  ${media.greaterThan('sm')`
    margin-bottom: 0.4rem;
  `}

  ${media.greaterThan('lg')`
    margin-bottom: 0.6rem;
  `}

  ${media.greaterThan('xl')`
    margin-top: 3.2rem;
  `}
`;

type StyledButtonIconProps = {
  readonly active: boolean;
} & Required<VariantColorValueProp>;

const StyledButtonIcon = styled(ButtonIcon)<StyledButtonIconProps>`
  position: fixed;
  inset: auto 1.5rem 8rem auto;
  background-color: ${styledMixin.variantColorValue()};
  background-size: 2.5rem;
  border-radius: 50px;
  ${styledMixin.zIndexDeclaration('gridTemplateButtonIcon')};
  ${styledMixin.transitionTransformForNewItemBarAndHisToggleButton};

  width: 6.8rem;
  height: 6.8rem;

  &:hover {
    background-color: ${styledMixin.variantColorValue({ darken: true })};
  }

  transform: rotate(${({ active }) => (active ? '-45deg' : '0')})
    scale(${({ active }) => (active ? 0.676 : 1)});

  box-shadow: ${({ active }) => (active ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)')};

  ${media.greaterThan('xs')`
    inset: auto 2.5rem 9rem auto;
  `}

  ${media.greaterThan('sm')`
    inset: auto 4rem 3rem auto;
    box-shadow: none;
  `}

  ${media.greaterThan('xl')`
    inset: auto 4.5rem 3.4rem auto;
  `}
`;

export type CardListTemplateProps = {
  readonly children: React.ReactNode;
};

const CardListTemplate = ({ children }: CardListTemplateProps) => {
  const [newItemBarVisible, toggleNewItemBarVisible] = useToggle(false);
  const pageVariant = useCurrentPageVariant();

  return (
    <UserPageTemplate>
      <StyledMain>
        <StyledMainHeader>
          <StyledHeadings>
            <StyledHeading big as="h1">
              {pageVariant}
            </StyledHeading>
            <Counter />
          </StyledHeadings>
          <Search />
        </StyledMainHeader>
        {children}
        <StyledButtonIcon
          type="button"
          icon={plusIcon}
          variant={pageVariant}
          active={newItemBarVisible}
          onClick={toggleNewItemBarVisible}
        >
          <VisuallyHidden>Toggle new item bar</VisuallyHidden>
        </StyledButtonIcon>
        <NewItemBar handleClose={toggleNewItemBarVisible} visible={newItemBarVisible} />
      </StyledMain>
    </UserPageTemplate>
  );
};

export default CardListTemplate;
