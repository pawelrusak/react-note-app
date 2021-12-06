import { createMachine, assign } from 'xstate';

import { DetailsItem, Status } from '~/commonTypes';
import { fetchItem } from '~/services';

type DetailsItemContext = {
  detailsItemId: DetailsItem['id'];
  data?: DetailsItem;
};

type DetailsItemEvent = { type: 'FETCH'; id: string };

type DetailsItemTypestate =
  | {
      value: Status.Idle;
      context: DetailsItemContext;
    }
  | {
      value: Status.Loading;
      context: DetailsItemContext & {
        data: undefined;
      };
    }
  | {
      value: Status.Succeeded;
      context: Required<DetailsItemContext>;
    }
  | {
      value: Status.Failed;
      context: DetailsItemContext & { data: undefined };
    };

export const createDetailsItemMachine = (
  detailsItemId: DetailsItemContext['detailsItemId'],
  data: DetailsItemContext['data'] | undefined,
) =>
  createMachine<DetailsItemContext, DetailsItemEvent, DetailsItemTypestate>({
    id: 'fetchItem',
    initial: Status.Idle,
    context: {
      detailsItemId,
      data,
    },
    states: {
      [Status.Idle]: {
        on: {
          FETCH: [
            {
              target: Status.Loading,
              cond: (context) => !context.data,
            },
            {
              target: Status.Succeeded,
            },
          ],
        },
      },
      [Status.Loading]: {
        invoke: {
          src: (context) => fetchItem(context.detailsItemId),
          onDone: {
            target: Status.Succeeded,
            actions: assign({
              data: (_, event) => (event.data as { data: DetailsItem }).data,
            }),
          },
          onError: {
            target: Status.Failed,
          },
        },
      },
      [Status.Succeeded]: { type: 'final' },
      [Status.Failed]: { type: 'final' },
    },
  });
