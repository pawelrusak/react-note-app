import { Formik, Form } from 'formik';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Input from '~/components/atoms/Input/Input';
import Field from '~/components/molecules/Field/Field';
import { TEST_ID } from '~/constants/tests';
import { usePageTypeContext, useAddItemAction } from '~/hooks';
import * as styledMixin from '~/theme/mixins';
import { newItemSchema } from '~/validations';

import type { ActiveColorArgs } from '~/theme/mixins';

type IsVisible = { readonly isVisible: boolean };
type StyledWrapperProps = Required<ActiveColorArgs> & IsVisible;

const StyledWrapper = styled.div<StyledWrapperProps>`
  border-left: 10px solid ${({ theme, activecolor }) => theme[activecolor]};
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
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
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

export type NewItemBarProps = IsVisible & { readonly handleClose: () => void };

const NewItemBar = ({ isVisible, handleClose }: NewItemBarProps) => {
  const pageContext = usePageTypeContext();
  const addItemAction = useAddItemAction();

  return (
    <StyledWrapper
      data-testid={TEST_ID.NEW_ITEM_BAR.WRAPPER}
      isVisible={isVisible}
      activecolor={pageContext}
    >
      <Heading big>Create new {pageContext}</Heading>
      <Formik
        validationSchema={newItemSchema}
        initialValues={{
          title: '',
          content: '',
          variant: pageContext,
          articleUrl: '',
          twitterName: '',
        }}
        onSubmit={(values) => {
          addItemAction(pageContext, values);
          handleClose();
        }}
      >
        {() => (
          <StyledForm>
            <StyledTitleField type="text" name="title" placeholder="title" />
            {pageContext === 'twitters' && (
              <Field placeholder="twitter name eg. hello_roman" type="text" name="twitterName" />
            )}
            {pageContext === 'articles' && (
              <Field placeholder="link" type="text" name="articleUrl" />
            )}
            <StyledTextAreaField
              placeholder="description"
              name="content"
              component={StyledTextArea}
            />
            <Button type="submit" activecolor={pageContext}>
              Add Note
            </Button>
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
  );
};

NewItemBar.defaultProps = {
  isVisible: false,
};

export default NewItemBar;
