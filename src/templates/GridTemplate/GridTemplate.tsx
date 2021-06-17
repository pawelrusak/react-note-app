import styled from 'styled-components';

import plusIcon from '~/assets/icons/plus.svg';
import ButtonIcon from '~/components/atoms/ButtonIcon/ButtonIcon';
import Heading from '~/components/atoms/Heading/Heading';
import Input from '~/components/atoms/Input/Input';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import NewItemBar from '~/components/organisms/NewItemBar/NewItemBar';
import { useToggle, usePageTypeContext } from '~/hooks';
import UserPageTemplate from '~/templates/UserPageTemplate/UserPageTemplate';
import { activecolor } from '~/theme/mixins';

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
`;

const StyledButtonIcon = styled(ButtonIcon)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  ${activecolor}
  background-size: 35%;
  border-radius: 50px;
  z-index: 10000;
`;

export type GridTemplateProps = {
  readonly children: React.ReactNode;
};

const GridTemplate = ({ children }: GridTemplateProps) => {
  const [newItemBarVisible, toggleNewItemBarVisible] = useToggle(false);
  const pageType = usePageTypeContext();

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <StyledPageHeader>
          <Input search placeholder="Search" />
          <StyledHeading big as="h1">
            {pageType}
          </StyledHeading>
          <StyledParagraph>6 {pageType}</StyledParagraph>
        </StyledPageHeader>
        <StyledGrid>{children}</StyledGrid>
        <StyledButtonIcon
          onClick={toggleNewItemBarVisible}
          icon={plusIcon}
          activecolor={pageType}
        />
        <NewItemBar handleClose={toggleNewItemBarVisible} isVisible={newItemBarVisible} />
      </StyledWrapper>
    </UserPageTemplate>
  );
};

export default GridTemplate;
