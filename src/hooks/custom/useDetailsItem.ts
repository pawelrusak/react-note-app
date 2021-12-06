import { useMachine } from '@xstate/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useItemSelector } from './useItemSelector';
import { Status } from '~/commonTypes';
import { useCurrentPageVariant } from '~/context';
import { createDetailsItemMachine } from '~/machines';

import type { URLParams } from '~/commonTypes';

export const useDetailsItem = () => {
  const pageVariant = useCurrentPageVariant();
  const { id: detailsItemId } = useParams<URLParams>();
  const detailsItem = useItemSelector(pageVariant, detailsItemId);
  const [state, send] = useMachine(createDetailsItemMachine(detailsItemId, detailsItem));

  useEffect(() => {
    send('FETCH');
  }, [send]);

  const { value, context } = state;

  return {
    data: context.data,
    isLoading: () => value === Status.Idle || value === Status.Loading,
    isSucceeded: () => value === Status.Succeeded,
    isFailed: () => value === Status.Failed,
  };
};
