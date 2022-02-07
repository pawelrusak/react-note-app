import { Form, useFormikContext } from 'formik';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Input from '~/components/atoms/Input/Input';
import Field from '~/components/molecules/Field/Field';
import { isNewItemVariantTouched } from '~/utils';

import type { Variants, Item } from '~/commonTypes';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledTitleField = styled(Field)`
  margin-top: 30px;
`;

const StyledTextAreaField = styled(Field)`
  margin-bottom: 70px;
`;

const StyledTextArea = styled(Input).attrs(() => ({ as: 'textarea' }))`
  border-radius: 20px;
  width: 100%;
  height: 30vh;
`;

export type NewItemFormProps = {
  readonly formVariant: Variants;
};

const NewItemForm = ({ formVariant }: NewItemFormProps) => {
  const { isSubmitting, touched, isValid } = useFormikContext<Item>();

  return (
    <StyledForm>
      <header>
        <Heading big as="h2" id="new-item-bar">
          Create new {formVariant}
        </Heading>
      </header>
      <StyledTitleField type="text" name="title" placeholder="title" />
      {formVariant === 'twitters' && (
        <Field placeholder="twitter name eg. hello_roman" type="text" name="twitterName" />
      )}
      {formVariant === 'articles' && <Field placeholder="link" type="text" name="articleUrl" />}
      <StyledTextAreaField placeholder="description" name="content" component={StyledTextArea} />
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
