import { darken } from 'polished';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import LinkIcon from '~/assets/icons/link.svg';
import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import Time from '~/components/atoms/Time/Time';
import ConfirmationModal from '~/components/molecules/ConfirmationModal/ConfirmationModal';
import { TEST_ID } from '~/constants';
import { useHistoryPush, useCurrentPageVariant, useConfirmationModal } from '~/hooks';
import { media } from '~/theme/mixins';
import * as styledMixin from '~/theme/mixins';

import type { Variant, Item } from '~/commonTypes';
import type { VariantColorValueProp } from '~/theme/mixins';

const cardPadding = css`
  padding: 1rem 1.9rem;

  ${media.greaterThan('xs')`
    padding: 1.7rem 3.2rem;
  `}
`;

const StyledWrapper = styled.div`
  min-height: 30.7rem;
  box-shadow: 0 7px 7px hsla(0, 0%, 0%, 0.09);
  border-radius: 0.7rem;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;

  ${media.greaterThan('xs')`
    min-height: 38.4rem;
  `}
`;

// create new component because the base one is reuse in others places
const StyledWrapperWithHover = styled(StyledWrapper)`
  @media (prefers-reduced-motion: no-preference) {
    transition: transform 0.15s ease-out;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const StyledHeader = styled.header<VariantColorValueProp>`
  position: relative;
  background-color: ${styledMixin.variantColorValue()};
  ${styledMixin.zIndexDeclaration('cardHeader')};

  ${cardPadding}
`;

type StyledHeaderWithHoverProp = {
  variantExtraPadding?: Variant;
} & VariantColorValueProp;

// create new component because the base one is reuse in others places
const StyledHeaderWithHover = styled(StyledHeader)<StyledHeaderWithHoverProp>`
  cursor: pointer;

  @media (prefers-reduced-motion: no-preference) {
    will-change: background-color;
    transition: background-color 0.2s ease-in-out;
  }

  &:hover {
    background-color: ${styledMixin.variantColorValue({ darken: true })};
  }

  ${({ variantExtraPadding }) =>
    variantExtraPadding === 'twitters' &&
    css`
      padding-right: 12.8rem;
    `}

  ${({ variantExtraPadding }) =>
    variantExtraPadding === 'articles' &&
    css`
      padding-right: 8.7rem;
    `}
`;

const StyledBody = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${cardPadding}

  padding-top: 1.5rem;
  padding-bottom: 1.3rem;

  ${media.greaterThan('sm')`
    padding-top: 2.9rem;
    padding-bottom: 2.4rem;
  `}
`;

const DateInfo = styled(Time)`
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.04em;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 0.5rem;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StyledAvatar = styled.img`
  width: 10rem;
  height: 10rem;
  border: 0.6rem solid ${({ theme }) => theme.twitters};
  border-radius: 5rem;

  position: absolute;
  right: 1.4rem;
  top: 1rem;

  @media (prefers-reduced-motion: no-preference) {
    will-change: border-color;
    transition: border-color 0.2s ease-in-out;
  }

  ${StyledHeaderWithHover}:hover & {
    border-color: ${(props) => darken(0.075, props.theme.twitters)};
  }
`;

const StyledArticleLink = styled.a`
  display: block;
  width: 4.7rem;
  height: 4.7rem;
  border-radius: 5rem;
  background: white url(${LinkIcon}) no-repeat;
  background-size: 60%;
  background-position: 50%;
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledParagraph = styled(Paragraph)`
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.6rem;
  line-height: 2.7rem;
`;

const StyledDetailsLink = styled(Link)`
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.bold};
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  margin-bottom: auto;
  font-variant-caps: all-small-caps;
  font-size: 1.5rem;
  line-height: 1;
  letter-spacing: -0.06rem;

  position: relative;
  align-self: flex-start;

  &::after {
    content: ' ';
    position: absolute;
    left: 0;
    // ((line height * font-height) - font-height) / half-white-space-around-font
    bottom: -0.15rem;
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

export type CardProps<V extends Variant> = Item<V>;

const defaultCardProps = {
  twitterName: null,
  articleUrl: null,
};

const Card = <V extends Variant>({
  id,
  title,
  created,
  twitterName,
  articleUrl,
  content,
}: CardProps<V>) => {
  const pageVariant = useCurrentPageVariant();
  const URLPathToDetails = `${pageVariant}/${id}`;
  const historyPush = useHistoryPush(URLPathToDetails);
  const { isOpen, closeModal, openModal, removeItemAction } = useConfirmationModal();

  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <StyledWrapperWithHover as="article">
      <StyledHeaderWithHover
        data-testid={TEST_ID.CARD.HEADER}
        onClick={historyPush}
        variant={pageVariant}
        variantExtraPadding={pageVariant}
      >
        <StyledHeading data-testid={TEST_ID.CARD.TITLE} title={title} as="h3">
          {title}
        </StyledHeading>
        <DateInfo data-testid={TEST_ID.CARD.DATE_INFO} date={created} />
        {pageVariant === 'twitters' && (
          <StyledAvatar src={`https://unavatar.now.sh/twitter/${twitterName || ''}`} />
        )}
        {pageVariant === 'articles' && (
          <StyledArticleLink data-testid={TEST_ID.CARD.ARTICLE_LINK} href={articleUrl || ''} />
        )}
      </StyledHeaderWithHover>
      <StyledBody>
        <StyledParagraph>{content}</StyledParagraph>
        <StyledDetailsLink to={URLPathToDetails}>read more</StyledDetailsLink>
        <Button onClick={openModal} secondary>
          REMOVE
        </Button>
        <ConfirmationModal
          show={isOpen()}
          variant={pageVariant}
          onConfirm={() => removeItemAction(pageVariant, id)}
          onCancel={closeModal}
          cancelRef={cancelRef}
        />
      </StyledBody>
    </StyledWrapperWithHover>
  );
};

Card.defaultProps = defaultCardProps;

Card.Wrapper = StyledWrapper;
Card.Header = StyledHeader;
Card.Body = StyledBody;

export default Card;
