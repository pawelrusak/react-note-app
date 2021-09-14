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

import type { VariantColorValueProp } from '~/theme/mixins';

const StyledWrapper = styled.div`
  position: relative;
  padding: 25px 150px 25px 70px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 85px;

  @media (max-width: 1500px) {
    grid-gap: 45px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const StyledPageHeader = styled.div`
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
  z-index: ${({ theme }) => theme.zIndex.gridTemplateButtonIcon};
  transform: rotate(${({ active }) => (active ? '-45deg' : '0')});
  ${styledMixin.transitionTransformForNewItemBarAndHisToggleButton}
`;

export type GridTemplateProps = {
  readonly children: React.ReactNode;
};

const GridTemplate = ({ children }: GridTemplateProps) => {
  const [newItemBarVisible, toggleNewItemBarVisible] = useToggle(false);
  const pageVariant = useCurrentPageVariant();
  const [search, setSearch] = useSearchState(pageVariant);

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <StyledPageHeader>
          <Input
            search
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <StyledHeading big as="h1">
            {pageVariant}
          </StyledHeading>
          <Counter />
        </StyledPageHeader>
        <StyledGrid>{children}</StyledGrid>
        <StyledButtonIcon
          aria-label="toggle new item bar"
          onClick={toggleNewItemBarVisible}
          icon={plusIcon}
          variant={pageVariant}
          active={newItemBarVisible}
        />
        <NewItemBar handleClose={toggleNewItemBarVisible} visible={newItemBarVisible} />
      </StyledWrapper>
    </UserPageTemplate>
  );
};

GridTemplate.Grid = StyledGrid;

export default GridTemplate;
