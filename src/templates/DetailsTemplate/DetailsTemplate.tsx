import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import TextButton from '~/components/atoms/TextButton/TextButton';
import Time from '~/components/atoms/Time/Time';
import ConfirmationModal from '~/components/molecules/ConfirmationModal/ConfirmationModal';
import { TEST_ID } from '~/constants/tests';
import { useCurrentPageVariant, useConfirmationModal } from '~/hooks';
import { routes } from '~/routes';
import UserPageTemplate from '~/templates/UserPageTemplate/UserPageTemplate';

import type { DetailsItem } from '~/commonTypes';

const StyledWrapper = styled.div`
  padding: 25px 150px 25px 70px;
  max-width: 50vw;
  position: relative;

  @media (max-width: 1200px) {
    max-width: 80vw;
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

const StyledParagraph = styled.p`
  color: #434343;
  font-weight: ${({ theme }) => theme.bold};
  font-size: 1.5rem;
  text-transform: uppercase;
  margin: 0;
`;

const StyledLink = styled.a`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

const StyledAvatar = styled.img`
  position: absolute;
  right: -80px;
  top: 50px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const RemoveButton = styled(TextButton)`
  margin-top: 1.9rem;
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

  const handleConfirm = () => {
    removeItemAction(pageVariant, id);
    history.replace(routes[pageVariant]);
  };

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <StyledPageHeader>
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
        </StyledPageHeader>

        <Paragraph>{content}</Paragraph>
        {pageVariant === 'articles' && (
          <StyledLink
            data-testid={TEST_ID.DETAILS_TEMPLATE.ARTICLE_LINK}
            href={articleUrl as string}
          >
            Open article
          </StyledLink>
        )}
        {pageVariant === 'twitters' && (
          <StyledAvatar
            data-testid={TEST_ID.DETAILS_TEMPLATE.AVATAR}
            alt={title}
            src={`https://unavatar.now.sh/twitter/${twitterName as string}  `}
          />
        )}
        <Button as={Link} to={`/${pageVariant}`} variant={pageVariant}>
          save / close
        </Button>
        <RemoveButton onClick={openModal}>remove note</RemoveButton>
        <ConfirmationModal
          variant={pageVariant}
          show={isOpen()}
          onCancel={closeModal}
          onConfirm={handleConfirm}
        />
      </StyledWrapper>
    </UserPageTemplate>
  );
};

/**
 * @todo check if this code can be removed
 */
DetailsTemplate.defaultProps = {
  id: '',
  title: '',
  created: '',
  content: '',
  articleUrl: '',
  twitterName: '',
};

export default DetailsTemplate;
