import { Form, useFormikContext } from 'formik';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Input from '~/components/atoms/Input/Input';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import Field from '~/components/molecules/Field/Field';
import { media } from '~/theme/mixins';
import { isNewItemVariantTouched } from '~/utils';

import type { Variants, Item } from '~/commonTypes';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledHeader = styled.header`
  margin-bottom: 3rem;

  ${media.greaterThan('xl')`
    margin-bottom: 4.3rem;
  `}
`;

const StyledFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 4rem;
  flex-grow: 1;

  ${media.greaterThan('sm')`
    flex-grow: 0;
    min-height: 100%;
    min-height: clamp(39rem, 54vh, 41.4rem);
    margin-bottom: 5rem;
  `}

  ${media.greaterThan('lg')`
    min-height: clamp(41.4rem, 42.2vh, 45.6rem);
    margin-bottom: clamp(5rem, 9.3vh, 10rem);
  `}
`;

const StyledField = styled(Field)`
  max-width: min(100%, 37.4rem);
`;

const StyledTextAreaField = styled(Field)`
  width: auto;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  min-width: 100%;
`;

const StyledTextArea = styled(StyledInput).attrs(() => ({ as: 'textarea' }))`
  border-radius: 2rem;
  width: 100%;
  height: 100%;
  margin-bottom: 0;
  resize: none;

  flex-grow: 1;
`;

const StyledParagraph = styled(Paragraph)`
  display: none;

  ${media.greaterThan('xl')`
    display: inline-block;
    padding-top: 1.2rem;
    font-weight: 300;
    font-size: 2.5rem;
    line-height: 124%;
  `}
`;

const StyleLineBreak = styled.span`
  display: block;
`;

const subHeading = {
  notes: (
    <StyledParagraph data-testid="NewItemForm_NoteSubheading">
      <StyleLineBreak>A note requires title</StyleLineBreak> and description
    </StyledParagraph>
  ),
  twitters: (
    <StyledParagraph data-testid="NewItemForm_TwitterSubheading">
      <StyleLineBreak>A twitter requires account name,</StyleLineBreak>title and description
    </StyledParagraph>
  ),
  articles: (
    <StyledParagraph data-testid="NewItemForm_ArticleSubheading">
      <StyleLineBreak>An article requires title, description</StyleLineBreak> and a link
    </StyledParagraph>
  ),
};

export type NewItemFormProps = {
  readonly formVariant: Variants;
};

const NewItemForm = ({ formVariant }: NewItemFormProps) => {
  const { isSubmitting, touched, isValid } = useFormikContext<Item>();

  return (
    <StyledForm>
      <StyledHeader>
        <Heading big as="h2" id="new-item-bar">
          Create new {formVariant}
        </Heading>
        {subHeading[formVariant]}
      </StyledHeader>
      <StyledFieldsWrapper>
        <StyledField type="text" name="title" placeholder="title" component={StyledInput} />
        {formVariant === 'twitters' && (
          <StyledField
            placeholder="twitter name eg. hello_roman"
            type="text"
            name="twitterName"
            component={StyledInput}
          />
        )}
        {formVariant === 'articles' && (
          <StyledField placeholder="link" type="text" name="articleUrl" component={StyledInput} />
        )}
        <StyledTextAreaField placeholder="description" name="content" component={StyledTextArea} />
      </StyledFieldsWrapper>
      <Button
        type="submit"
        pending={isSubmitting}
        disabled={isSubmitting || (isNewItemVariantTouched(touched, formVariant) && !isValid)}
        variant={formVariant}
      >
        Add Note
      </Button>
    </StyledForm>
  );
};

export default NewItemForm;
