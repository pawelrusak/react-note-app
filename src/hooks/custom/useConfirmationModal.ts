import { useState } from 'react';

import { useRemoveItemAction } from './useRemoveItemAction';

import type { ItemVariants } from '~/commonTypes';

export const useConfirmationModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const removeItem = useRemoveItemAction();

  const isOpen = () => open;

  const closeModal = () => setOpen(false);

  const openModal = () => setOpen(true);

  const removeItemAction = <T extends ItemVariants>(variant: T, id: string) => {
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
