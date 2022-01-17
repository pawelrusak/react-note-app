import styled from 'styled-components';

import plusIcon from '~/assets/icons/plus.svg';
import ButtonIcon from '~/components/atoms/ButtonIcon/ButtonIcon';
import Heading from '~/components/atoms/Heading/Heading';
import Input from '~/components/atoms/Input/Input';
import Counter from '~/components/molecules/Counter/Counter';
import NewItemBar from '~/components/organisms/NewItemBar/NewItemBar';
import { useToggle, useCurrentPageVariant, useSearchState } from '~/hooks';
import UserPageTemplate from '~/templates/UserPageTemplate/UserPageTemplate';
import * as styledMixin from '~/theme/mixins';
import { VisuallyHidden } from '~/utils';

import type { VariantColorValueProp } from '~/theme/mixins';

const StyledMain = styled.main`
  position: relative;
  padding: 25px 150px 25px 70px;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledMainHeader = styled.header`
  margin: 25px 0 50px 0;
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 0 0;

  ::first-letter {
    text-transform: uppercase;
  }
`;

type StyledButtonIconProps = {
  readonly active: boolean;
} & Required<VariantColorValueProp>;

const StyledButtonIcon = styled(ButtonIcon)<StyledButtonIconProps>`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: ${styledMixin.variantColorValue()};
  background-size: 35%;
  border-radius: 50px;
  ${styledMixin.zIndexDeclaration('gridTemplateButtonIcon')};
  transform: rotate(${({ active }) => (active ? '-45deg' : '0')});
  ${styledMixin.transitionTransformForNewItemBarAndHisToggleButton}
`;

export type CardListTemplateProps = {
  readonly children: React.ReactNode;
};

const CardListTemplate = ({ children }: CardListTemplateProps) => {
  const [newItemBarVisible, toggleNewItemBarVisible] = useToggle(false);
  const pageVariant = useCurrentPageVariant();
  const [search, setSearch] = useSearchState(pageVariant);

  return (
    <UserPageTemplate>
      <StyledMain>
        <StyledMainHeader>
          <form role="search">
            <p>
              <VisuallyHidden as="label" htmlFor="search-input" />
              <Input
                id="search-input"
                type="search"
                search
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </p>
          </form>
          <StyledHeading big as="h1">
            {pageVariant}
          </StyledHeading>
          <Counter />
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
