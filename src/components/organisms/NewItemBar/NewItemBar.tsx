import { Formik, Form } from 'formik';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Input from '~/components/atoms/Input/Input';
import Field from '~/components/molecules/Field/Field';
import { TEST_ID } from '~/constants/tests';
import { useCurrentPageVariant, useAddItemAction } from '~/hooks';
import * as styledMixin from '~/theme/mixins';
import { isNewItemVariantTouched } from '~/utils';
import { newItemSchema } from '~/validations';

import type { VariantColorValueProp } from '~/theme/mixins';

type Visible = { readonly visible: boolean };
type StyledWrapperProps = Required<VariantColorValueProp> & Visible;

const StyledWrapper = styled.div<StyledWrapperProps>`
  border-left: 10px solid ${styledMixin.variantColorValue()};
  z-index: 9999;
  position: fixed;
  display: flex;
  padding: 100px 90px;
  flex-direction: column;
  right: 0;
  top: 0;
  height: 100%;
  min-height: 100vh;
  width: 680px;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ visible }) => (visible ? '0' : '100%')});
  ${styledMixin.transitionTransformForNewItemBarAndHisToggleButton};
  overflow-y: scroll;
`;

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

export type NewItemBarProps = Visible & { readonly handleClose: () => void };

const NewItemBar = ({ visible, handleClose }: NewItemBarProps) => {
  const pageVariant = useCurrentPageVariant();
  const addItemAction = useAddItemAction();

  return (
    <StyledWrapper
      data-testid={TEST_ID.NEW_ITEM_BAR.WRAPPER}
      visible={visible}
      variant={pageVariant}
    >
      <Heading big>Create new {pageVariant}</Heading>
      <Formik
        validationSchema={newItemSchema}
        initialValues={{
          title: '',
          content: '',
          variant: pageVariant,
          articleUrl: '',
          twitterName: '',
        }}
        onSubmit={(values) => {
          addItemAction(pageVariant, values);
          handleClose();
        }}
      >
        {({ isSubmitting, touched, isValid }) => (
          <StyledForm>
            <StyledTitleField type="text" name="title" placeholder="title" />
            {pageVariant === 'twitters' && (
              <Field placeholder="twitter name eg. hello_roman" type="text" name="twitterName" />
            )}
            {pageVariant === 'articles' && (
              <Field placeholder="link" type="text" name="articleUrl" />
            )}
            <StyledTextAreaField
              placeholder="description"
              name="content"
              component={StyledTextArea}
            />
            <Button
              type="submit"
              pending={isSubmitting}
              disabled={isSubmitting || (isNewItemVariantTouched(touched, pageVariant) && !isValid)}
              variant={pageVariant}
            >
              Add Note
            </Button>
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
  );
};

NewItemBar.defaultProps = {
  visible: false,
};

export default NewItemBar;
