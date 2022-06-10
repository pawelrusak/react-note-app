import { Formik } from 'formik';
import styled from 'styled-components';

import NewItemForm from '~/components/organisms/NewItemForm/NewItemForm';
import { TEST_ID } from '~/constants';
import { useCurrentPageVariant, useAddItemAction } from '~/hooks';
import { media } from '~/theme/mixins';
import * as styledMixin from '~/theme/mixins';
import { newItemSchema } from '~/validations';

import type { VariantColorValueProp } from '~/theme/mixins';

type Visible = { readonly visible: boolean };
type StyledWrapperProps = Required<VariantColorValueProp> & Visible;

const StyledWrapper = styled.div<StyledWrapperProps>`
  ${styledMixin.zIndexDeclaration('newItemBar')};
  position: fixed;
  display: flex;
  padding: 2rem 1.5rem 9rem;
  right: 0;
  top: 0;
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  background-color: white;
  box-shadow: -10px 0 8.5px rgba(0, 0, 0, 0.06);
  transform: translate(${({ visible }) => (visible ? '0' : '100%')});
  ${styledMixin.transitionTransformForNewItemBarAndHisToggleButton};
  overflow-y: scroll;

  ${media.greaterThan('sm')`
    border-left: 11px solid ${styledMixin.variantColorValue()};
    align-items: center;
    padding: 2rem 5.9rem 2rem 7.2rem;
    width: 58.2rem;
  `}

  ${media.greaterThan('xl')`
    border-left: 11px solid ${styledMixin.variantColorValue()};
    padding: 2rem 8.3rem 2rem 10.6rem;
    padding-top: clamp(10rem, 14vh, 14.6rem);
    align-items: normal;
    width: 64rem;
  `}
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
