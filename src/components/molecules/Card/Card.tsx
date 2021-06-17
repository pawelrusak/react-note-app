import styled, { css } from 'styled-components';

import LinkIcon from '~/assets/icons/link.svg';
import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
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

type ContentWrapperProps = {
  readonly flex: boolean;
};

const ContentWrapper = styled(HeaderWrapper)<ContentWrapperProps>`
  background-color: white;

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
`;

const DateInfo = styled(Paragraph)`
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

const StyledLinkButton = styled.a`
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

export type CardProps = Item;

const defaultCardProps = {
  twitterName: null,
  articleUrl: null,
};

const Card = ({ id, title, created, twitterName, articleUrl, content }: CardProps) => {
  const itemType = usePageTypeContext();
  const historyPush = useHistoryPush(`${itemType}/${id}`);
  const removeItem = useRemoveItemAction();

  return (
    <StyledWrapper>
      <HeaderWrapper data-testid="card-heading-bar" onClick={historyPush} activecolor={itemType}>
        <StyledHeading>{title}</StyledHeading>
        <DateInfo>{String(created.toString())}</DateInfo>
        {itemType === 'twitters' && (
          <StyledAvatar src={`https://unavatar.now.sh/twitter/${twitterName || ''}`} />
        )}
        {itemType === 'articles' && (
          <StyledLinkButton data-testid="card-article-link" href={articleUrl || ''} />
        )}
      </HeaderWrapper>
      <ContentWrapper flex>
        <Paragraph>{content}</Paragraph>
        <Button onClick={() => removeItem(itemType, id)} secondary>
          REMOVE
        </Button>
      </ContentWrapper>
    </StyledWrapper>
  );
};

Card.defaultProps = defaultCardProps;

export default Card;
