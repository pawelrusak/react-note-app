import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import TextButton from '~/components/atoms/TextButton/TextButton';
import Time from '~/components/atoms/Time/Time';
import ConfirmationModal from '~/components/molecules/ConfirmationModal/ConfirmationModal';
import { TEST_ID, ROUTES_PATHS } from '~/constants';
import { useCurrentPageVariant, useConfirmationModal } from '~/hooks';
import UserPageTemplate from '~/templates/UserPageTemplate/UserPageTemplate';
import { media } from '~/theme/mixins';

import type { DetailsItem } from '~/commonTypes';

const StyledWrapper = styled.div`
  padding: 1.5rem 1.5rem 6rem;

  ${media.greaterThan('xs')`
    padding: 3rem 6rem 6rem;
  `}

  ${media.greaterThan('sm')`
    padding: 4rem 9rem 2rem;
    max-width: 50vw;
  `}

  ${media.greaterThan('lg')`
    padding: 9rem 13.4rem 2rem;
    padding-top: clamp(4rem, 7vh, 9rem);
    padding-left: clamp(9rem, 7vw, 13.4rem);
  `}
`;

const StyledDetailsWrapper = styled.article`
  ${media.greaterThan('sm')`
    width: 37.41vw;
  `}

  ${media.greaterThan('lg')`
    width: 29.01vw;
  `}
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

const StyledHeading = styled(Heading)`
  line-height: 1;

  margin: 1.5rem 0;

  ${media.greaterThan('sm')`
    margin: 2rem 0;
  `}

  ${media.greaterThan('lg')`
    margin-top: 3.8rem;
    margin-bottom: 2.3rem;
  `}
`;

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.grey700};
  font-weight: ${({ theme }) => theme.bold};
  font-size: 1.5rem;
  text-transform: uppercase;

  margin-bottom: 3.5rem;

  ${media.greaterThan('sm')`
    margin-bottom: 3rem;
  `}

  ${media.greaterThan('lg')`
    margin-bottom: 3.2rem;
  `}
`;

const StyledLink = styled(TextButton)`
  display: inline-block;
  text-transform: uppercase;
  color: ${({ theme }) => theme.black};
  font-size: ${({ theme }) => theme.fontSize.s};
  text-decoration: none;
`;

const StyledAvatar = styled.img`
  width: 9rem;
  height: 9rem;

  width: clamp(9rem, 6.6rem + 6vw, 12rem);
  height: clamp(9rem, 6.6rem + 6vw, 12rem);

  border-radius: 50%;
  margin-left: 1.5rem;

  ${media.greaterThan('xs')`
    width: 10.5rem;
    height: 10.5rem;
  `}

  ${media.greaterThan('sm')`
    margin-left: 3rem;
    width: 12rem;
    height: 12rem;
  `}

  ${media.greaterThan('lg')`
    margin-left: 3rem;
    width: 14.4rem;
    height: 14.4rem;
    width: clamp(12rem, 3.6rem + 6vw, 14.4rem);
    height: clamp(12rem, 3.6rem + 6vw, 14.4rem);
  `}
`;

const StyledContent = styled(Paragraph)`
  display: block;
  line-height: ${({ theme }) => theme.lineHeight};
  margin-bottom: 2rem;

  ${media.greaterThan('sm')`
    margin-right: 1.1rem;
  `}

  ${media.greaterThan('xl')`
    margin-right: 0.6rem;
  `}
`;

const StyledSaveButton = styled(Button)`
  margin-top: 5rem;
  margin-bottom: 1.9rem;

  ${media.greaterThan('sm')`
    margin-top: 6rem;
  `}

  ${media.greaterThan('lg')`
    margin-top: 8.1rem;
  `}
`;

export type DetailsTemplateProps = DetailsItem;

const DetailsTemplate = ({
  id,
  title,
  created,
  content,
  articleUrl,
  twitterName,
}: DetailsTemplateProps) => {
  const pageVariant = useCurrentPageVariant();
  const { isOpen, closeModal, openModal, removeItemAction } = useConfirmationModal();
  const history = useHistory();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleConfirm = () => {
    removeItemAction(pageVariant, id);
    history.replace(ROUTES_PATHS[pageVariant]);
  };

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <StyledDetailsWrapper>
          <StyledHeader>
            <div>
              <StyledHeading big as="h1">
                {title}
              </StyledHeading>
              <StyledParagraph>
                created -{' '}
                <Time
                  data-testid={TEST_ID.DETAILS_TEMPLATE.DATE_INFO}
                  date={created}
                  format="DD/MM/YYYY"
                />
              </StyledParagraph>
            </div>
            {pageVariant === 'twitters' && (
              <StyledAvatar
                data-testid={TEST_ID.DETAILS_TEMPLATE.AVATAR}
                alt={title}
                src={`https://unavatar.now.sh/twitter/${twitterName as string}  `}
              />
            )}
          </StyledHeader>
          <StyledContent>{content}</StyledContent>
          {pageVariant === 'articles' && (
            <StyledLink
              as="a"
              href={articleUrl as string}
              data-testid={TEST_ID.DETAILS_TEMPLATE.ARTICLE_LINK}
              target="_blank"
              rel="noopener"
            >
              Open this article
            </StyledLink>
          )}
          {pageVariant === 'twitters' && (
            <StyledLink
              as="a"
              href={`https://twitter.com/${twitterName as string}`}
              data-testid={TEST_ID.DETAILS_TEMPLATE.TWITTER_LINK}
              target="_blank"
              rel="noopener"
            >
              Open this twitter
            </StyledLink>
          )}
          <StyledSaveButton as={Link} to={`/${pageVariant}`} variant={pageVariant}>
            save / close
          </StyledSaveButton>
          <TextButton onClick={openModal}>remove note</TextButton>
          <ConfirmationModal
            variant={pageVariant}
            show={isOpen()}
            onCancel={closeModal}
            onConfirm={handleConfirm}
            cancelRef={cancelRef}
          />
        </StyledDetailsWrapper>
      </StyledWrapper>
    </UserPageTemplate>
  );
};

DetailsTemplate.Wrapper = StyledWrapper;
DetailsTemplate.PageHeader = StyledHeader;
DetailsTemplate.Heading = StyledHeading;

export default DetailsTemplate;
