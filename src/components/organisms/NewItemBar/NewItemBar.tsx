import { Formik } from 'formik';
import styled from 'styled-components';

import NewItemForm from '~/components/organisms/NewItemForm/NewItemForm';
import { TEST_ID } from '~/constants';
import { useCurrentPageVariant, useAddItemAction } from '~/hooks';
import * as styledMixin from '~/theme/mixins';
import { newItemSchema } from '~/validations';

import type { VariantColorValueProp } from '~/theme/mixins';

type Visible = { readonly visible: boolean };
type StyledWrapperProps = Required<VariantColorValueProp> & Visible;

const StyledWrapper = styled.div<StyledWrapperProps>`
  border-left: 10px solid ${styledMixin.variantColorValue()};
  ${styledMixin.zIndexDeclaration('newItemBar')};
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

export type NewItemBarProps = Visible & { readonly handleClose: () => void };

const NewItemBar = ({ visible, handleClose }: NewItemBarProps) => {
  const pageVariant = useCurrentPageVariant();
  const addItemAction = useAddItemAction();

  const initialValues = {
    title: '',
    content: '',
    articleUrl: '',
    twitterName: '',
    variant: pageVariant,
  };

  return (
    <StyledWrapper
      data-testid={TEST_ID.NEW_ITEM_BAR.WRAPPER}
      visible={visible}
      variant={pageVariant}
      role="dialog"
      aria-labelledby="new-item-bar"
      aria-modal="true"
    >
      <Formik
        validationSchema={newItemSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          addItemAction(pageVariant, values);
          actions.setSubmitting(false);
          actions.resetForm({
            values: initialValues,
          });
          handleClose();
        }}
      >
        <NewItemForm formVariant={pageVariant} />
      </Formik>
    </StyledWrapper>
  );
};

NewItemBar.defaultProps = {
  visible: false,
};

export default NewItemBar;
