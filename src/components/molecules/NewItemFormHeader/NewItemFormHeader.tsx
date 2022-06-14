import styled from 'styled-components';

import Heading from '~/components/atoms/Heading/Heading';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import { TEST_ID } from '~/constants';
import { media } from '~/theme/mixins';

import type { Variants } from '~/commonTypes';

const StyledHeader = styled.header`
  margin-bottom: 3rem;
  ${media.greaterThan('xl')`
    margin-bottom: 4.3rem;
  `}
`;

const StyledParagraph = styled(Paragraph)`
  display: none;

  ${media.greaterThan('xl')`
    display: inline-block;
    padding-top: 1.2rem;
    font-weight: ${({ theme }) => theme.light};
    font-size: 2.5rem;
    line-height: 124%;
  `}
`;

const StyleLineBreak = styled.span`
  display: block;
`;

const subHeading = {
  notes: (
    <StyledParagraph data-testid={TEST_ID.NEW_ITEM_FORM.NOTE_SUBHEADING}>
      <StyleLineBreak>A note requires title</StyleLineBreak> and description
    </StyledParagraph>
  ),
  twitters: (
    <StyledParagraph data-testid={TEST_ID.NEW_ITEM_FORM.TWITTER_SUBHEADING}>
      <StyleLineBreak>A twitter requires account name,</StyleLineBreak>title and description
    </StyledParagraph>
  ),
  articles: (
    <StyledParagraph data-testid={TEST_ID.NEW_ITEM_FORM.ARTICLE_SUBHEADING}>
      <StyleLineBreak>An article requires title, description</StyleLineBreak> and a link
    </StyledParagraph>
  ),
};

export type NewItemFormHeaderProps = {
  readonly variant: Variants;
  readonly headingId: string;
};

const NewItemFormHeader = ({ variant, headingId }: NewItemFormHeaderProps) => (
  <StyledHeader>
    <Heading big as="h2" id={headingId}>
      Create new {variant}
    </Heading>
    {subHeading[variant]}
  </StyledHeader>
);

export default NewItemFormHeader;
