import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LinkIcon from '~/assets/icons/link.svg';
import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import Time from '~/components/atoms/Time/Time';
import { TEST_ID } from '~/constants/tests';
import { useHistoryPush, useRemoveItemAction, usePageTypeContext } from '~/hooks';
import { activecolor } from '~/theme/mixins';

import type { ItemVariants, Item } from '~/commonTypes';

const StyledWrapper = styled.div`
  min-height: 380px;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
`;

type HeaderWrapperProps = {
  readonly activecolor?: ItemVariants;
};

const HeaderWrapper = styled.div<HeaderWrapperProps>`
  position: relative;
  padding: 17px 30px;
  ${activecolor}

  :first-of-type {
    z-index: 9999;
  }
`;

const ContentWrapper = styled(HeaderWrapper)`
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const DateInfo = styled(Time)`
  margin: 0 0 5px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0;
`;

const StyledAvatar = styled.img`
  width: 86px;
  height: 86px;
  border: 5px solid ${({ theme }) => theme.twitters};
  border-radius: 50px;
  position: absolute;
  right: 25px;
  top: 25px;
`;

const StyledArticleLink = styled.a`
  display: block;
  width: 47px;
  height: 47px;
  border-radius: 50px;
  background: white url(${LinkIcon}) no-repeat;
  background-size: 60%;
  background-position: 50%;
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
`;

/**
 * @todo Should I add a fallback for IE?
 */
const StyledContentParagraph = styled(Paragraph)`
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0.5rem 0 0;
  line-height: ${({ theme }) => theme.lineHeight};

  @supports not (-webkit-line-clamp: 4) {
    display: initial;
    /* theme-paragraph-font-size x 4 [line clamp] x 1.2[standard default browsers line height] */
    height: ${({ theme }) => `${parseFloat(theme.fontSize.s) * 4 * 1.2}rem`};
    overflow-y: hidden;
  }
`;

const StyledContentLink = styled(Link)`
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.bold};
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  margin-bottom: auto;
  font-variant-caps: all-small-caps;
  line-height: ${({ theme }) => theme.lineHeight};
`;

export type CardProps = Item;

const defaultCardProps = {
  twitterName: null,
  articleUrl: null,
};

const Card = ({ id, title, created, twitterName, articleUrl, content }: CardProps) => {
  const itemType = usePageTypeContext();
  const URLPathToDetails = `${itemType}/${id}`;
  const historyPush = useHistoryPush(URLPathToDetails);
  const removeItem = useRemoveItemAction();

  return (
    <StyledWrapper>
      <HeaderWrapper data-testid={TEST_ID.CARD.HEADER} onClick={historyPush} activecolor={itemType}>
        <StyledHeading data-testid={TEST_ID.CARD.TITLE}>{title}</StyledHeading>
        <DateInfo data-testid={TEST_ID.CARD.DATE_INFO} date={created} />
        {itemType === 'twitters' && (
          <StyledAvatar src={`https://unavatar.now.sh/twitter/${twitterName || ''}`} />
        )}
        {itemType === 'articles' && (
          <StyledArticleLink data-testid={TEST_ID.CARD.ARTICLE_LINK} href={articleUrl || ''} />
        )}
      </HeaderWrapper>
      <ContentWrapper>
        <StyledContentParagraph>{content}</StyledContentParagraph>
        <StyledContentLink to={URLPathToDetails}>read more</StyledContentLink>
        <Button onClick={() => removeItem(itemType, id)} secondary>
          REMOVE
        </Button>
      </ContentWrapper>
    </StyledWrapper>
  );
};

Card.defaultProps = defaultCardProps;

Card.Wrapper = StyledWrapper;
Card.HeaderWrapper = HeaderWrapper;
Card.ContentWrapper = ContentWrapper;

export default Card;
