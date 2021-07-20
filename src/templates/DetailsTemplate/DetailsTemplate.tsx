import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import Time from '~/components/atoms/Time/Time';
import { usePageTypeContext } from '~/hooks';
import UserPageTemplate from '~/templates/UserPageTemplate/UserPageTemplate';

import type { Item } from '~/commonTypes';

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

const StyledImage = styled.img`
  position: absolute;
  right: -80px;
  top: 50px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

export type DetailsTemplateProps = Omit<Item, 'id'>;

const DetailsTemplate = ({
  title,
  created,
  content,
  articleUrl,
  twitterName,
}: DetailsTemplateProps) => {
  const pageContext = usePageTypeContext();

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <StyledPageHeader>
          <StyledHeading big as="h1">
            {title}
          </StyledHeading>
          <StyledParagraph>
            created -{' '}
            <Time data-testid="details-template-date" date={created} format="DD/MM/YYYY" />
          </StyledParagraph>
        </StyledPageHeader>

        <Paragraph>{content}</Paragraph>
        {pageContext === 'articles' && (
          <StyledLink data-testid="article-link" href={articleUrl as string}>
            Open article
          </StyledLink>
        )}
        {pageContext === 'twitters' && (
          <StyledImage
            data-testid="avatar"
            alt={title}
            src={`https://unavatar.now.sh/twitter/${twitterName as string}  `}
          />
        )}
        <Button as={Link} to={`/${pageContext}`} activecolor={pageContext}>
          save / close
        </Button>
      </StyledWrapper>
    </UserPageTemplate>
  );
};

/**
 * @todo check if this code can be removed
 */
DetailsTemplate.defaultProps = {
  title: '',
  created: '',
  content: '',
  articleUrl: '',
  twitterName: '',
};

export default DetailsTemplate;
