import { darken } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LinkIcon from '~/assets/icons/link.svg';
import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import Time from '~/components/atoms/Time/Time';
import { TEST_ID } from '~/constants/tests';
import { useHistoryPush, useRemoveItemAction, useCurrentPageVariant } from '~/hooks';
import * as styledMixin from '~/theme/mixins';

import type { Item } from '~/commonTypes';
import type { VariantColorValueProp } from '~/theme/mixins';

const StyledWrapper = styled.div`
  min-height: 380px;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
`;

// create new component because the base one is reuse in others places
const StyledWrapperWithHover = styled(StyledWrapper)`
  @media (prefers-reduced-motion: no-preference) {
    transition: transform 0.15s ease-out;

    &:hover {
      transform: scale(1.015);
    }
  }
`;

const HeaderWrapper = styled.div<VariantColorValueProp>`
  position: relative;
  padding: 17px 30px;
  background-color: ${styledMixin.variantColorValue()};

  &:first-of-type {
    ${styledMixin.zIndexDeclaration('cardHeader')};
  }
`;

// create new component because the base one is reuse in others places
const HeaderWrapperWithHover = styled(HeaderWrapper)<VariantColorValueProp>`
  cursor: pointer;

  @media (prefers-reduced-motion: no-preference) {
    will-change: background-color;
    transition: background-color 0.2s ease-in-out;
  }

  &:hover {
    background-color: ${styledMixin.variantColorValue({ darken: true })};
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
  @media (prefers-reduced-motion: no-preference) {
    will-change: border-color;
    transition: border-color 0.2s ease-in-out;
  }

  ${HeaderWrapperWithHover}:hover & {
    border-color: ${(props) => darken(0.075, props.theme.twitters)};
  }
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
  position: relative;
  align-self: flex-start;

  &::after {
    content: ' ';
    position: absolute;
    left: 0;
    // ((line height * font-height) - font-height) / half-white-space-around-font
    bottom: ${({ theme }) => `calc(${(+theme.lineHeight * 1.6 - 1.6) / 2}rem - 0.2rem)`};
    height: 0.2rem;
    width: 100%;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: left;
  }

  @media (prefers-reduced-motion: no-preference) {
    &::after {
      transition: transform 0.15s ease-in-out;
    }
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export type CardProps = Item;

const defaultCardProps = {
  twitterName: null,
  articleUrl: null,
};

const Card = ({ id, title, created, twitterName, articleUrl, content }: CardProps) => {
  const pageVariant = useCurrentPageVariant();
  const URLPathToDetails = `${pageVariant}/${id}`;
  const historyPush = useHistoryPush(URLPathToDetails);
  const removeItem = useRemoveItemAction();

  return (
    <StyledWrapperWithHover>
      <HeaderWrapperWithHover
        data-testid={TEST_ID.CARD.HEADER}
        onClick={historyPush}
        variant={pageVariant}
      >
        <StyledHeading data-testid={TEST_ID.CARD.TITLE}>{title}</StyledHeading>
        <DateInfo data-testid={TEST_ID.CARD.DATE_INFO} date={created} />
        {pageVariant === 'twitters' && (
          <StyledAvatar src={`https://unavatar.now.sh/twitter/${twitterName || ''}`} />
        )}
        {pageVariant === 'articles' && (
          <StyledArticleLink data-testid={TEST_ID.CARD.ARTICLE_LINK} href={articleUrl || ''} />
        )}
      </HeaderWrapperWithHover>
      <ContentWrapper>
        <StyledContentParagraph>{content}</StyledContentParagraph>
        <StyledContentLink to={URLPathToDetails}>read more</StyledContentLink>
        <Button onClick={() => removeItem(pageVariant, id)} secondary>
          REMOVE
        </Button>
      </ContentWrapper>
    </StyledWrapperWithHover>
  );
};

Card.defaultProps = defaultCardProps;

Card.Wrapper = StyledWrapper;
Card.HeaderWrapper = HeaderWrapper;
Card.ContentWrapper = ContentWrapper;

export default Card;
