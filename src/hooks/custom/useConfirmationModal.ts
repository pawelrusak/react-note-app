import { useState } from 'react';

import { useRemoveItemAction } from './useRemoveItemAction';

import type { Variant, Item } from '~/commonTypes';

export const useConfirmationModal = <V extends Variant>() => {
  const [open, setOpen] = useState<boolean>(false);
  const removeItem = useRemoveItemAction();

  const isOpen = () => open;

  const closeModal = () => setOpen(false);

  const openModal = () => setOpen(true);

  const removeItemAction = (variant: V, id: Item['id']) => {
    closeModal();
    removeItem(variant, id);
  };

  return {
    isOpen,
    closeModal,
    openModal,
    removeItemAction,
  };
};
