import styled from 'styled-components';

import plusIcon from '~/assets/icons/plus.svg';
import ButtonIcon from '~/components/atoms/ButtonIcon/ButtonIcon';
import Heading from '~/components/atoms/Heading/Heading';
import Input from '~/components/atoms/Input/Input';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import Skeleton from '~/components/atoms/Skeleton/Skeleton';
import NewItemBar from '~/components/organisms/NewItemBar/NewItemBar';
import { TEST_ID } from '~/constants/tests';
import { useToggle, usePageTypeContext, useItemsStatus, useSearchState } from '~/hooks';
import UserPageTemplate from '~/templates/UserPageTemplate/UserPageTemplate';
import * as styledMixin from '~/theme/mixins';

import type { ActiveColorArgs } from '~/theme/mixins';

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

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.grey500};
`;

const StyledSkeletonCounter = styled(Skeleton)`
  height: ${({ theme }) => theme.fontSize.m};
  width: 9rem;
`;

type StyledButtonIconProps = {
  readonly active: boolean;
} & ActiveColorArgs;

const StyledButtonIcon = styled(ButtonIcon)<StyledButtonIconProps>`
  position: fixed;
  bottom: 40px;
  right: 40px;
  ${styledMixin.activecolor}
  background-size: 35%;
  border-radius: 50px;
  z-index: 10000;
  transform: rotate(${({ active }) => (active ? '-45deg' : '0')});
  ${styledMixin.transitionTransformForNewItemBarAndHisToggleButton}
`;

export type GridTemplateProps = {
  readonly children: React.ReactNode;
};

const GridTemplate = ({ children }: GridTemplateProps) => {
  const [newItemBarVisible, toggleNewItemBarVisible] = useToggle(false);
  const pageType = usePageTypeContext();
  const { isLoading } = useItemsStatus();
  const [search, setSearch] = useSearchState(pageType);

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
            {pageType}
          </StyledHeading>
          {isLoading() ? (
            <StyledSkeletonCounter data-testid={TEST_ID.GRID_TEMPLATE.SKELETON_COUNTER} />
          ) : (
            <StyledParagraph data-testid={TEST_ID.GRID_TEMPLATE.COUNTER}>
              6 {pageType}
            </StyledParagraph>
          )}
        </StyledPageHeader>
        <StyledGrid>{children}</StyledGrid>
        <StyledButtonIcon
          aria-label="toggle new item bar"
          onClick={toggleNewItemBarVisible}
          icon={plusIcon}
          activecolor={pageType}
          active={newItemBarVisible}
        />
        <NewItemBar handleClose={toggleNewItemBarVisible} isVisible={newItemBarVisible} />
      </StyledWrapper>
    </UserPageTemplate>
  );
};

GridTemplate.Grid = StyledGrid;

export default GridTemplate;
