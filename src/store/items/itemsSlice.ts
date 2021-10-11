import { createSlice, createAsyncThunk, AppThunkConfig } from '@reduxjs/toolkit';

import { Status } from '~/commonTypes';
import { ACTION_DOMAINS } from '~/constants/actionDomains';
import * as services from '~/services';

import type { Item, NewItem, Variants } from '~/commonTypes';

export type ItemsState = {
  notes: Item<'notes'>[];
  twitters: Item<'twitters'>[];
  articles: Item<'articles'>[];
  status: Status;
};

const initialState: ItemsState = {
  notes: [],
  twitters: [],
  articles: [],
  status: Status.Idle,
};

// eslint-disable-next-line @typescript-eslint/ban-types
type ObjectWithItemVariant<T extends object | never = never> = {
  variant: Variants;
} & T;

type FetchItemsReturn = ObjectWithItemVariant<{ data: Item[] }>;
type FetchItemsArg = { variant: Variants };

export const fetchItems = createAsyncThunk<FetchItemsReturn, FetchItemsArg, AppThunkConfig>(
  `${ACTION_DOMAINS.ITEMS}/fetchItems`,
  async ({ variant }, { getState, rejectWithValue }) => {
    try {
      const { data } = await services.fetchItems({
        variant,
        userID: getState().auth.userID,
      });

      return { data, variant };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

type AddItemReturn = ObjectWithItemVariant<{ data: Item }>;
type AddItemArg = ObjectWithItemVariant<{ newItem: NewItem }>;

export const addItem = createAsyncThunk<AddItemReturn, AddItemArg, AppThunkConfig>(
  `${ACTION_DOMAINS.ITEMS}/addItem`,
  async ({ variant, newItem }, { getState, rejectWithValue }) => {
    try {
      const { data } = await services.addItem({
        variant,
        userID: getState().auth.userID,
        ...newItem,
      });

      return { data, variant };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

type RemoveItemReturn = ObjectWithItemVariant<{ id: Item['id'] }>;
type RemoveItemArg = RemoveItemReturn;

export const removeItem = createAsyncThunk<RemoveItemReturn, RemoveItemArg, AppThunkConfig>(
  `${ACTION_DOMAINS.ITEMS}/removeItem`,
  async ({ variant, id }, { rejectWithValue }) => {
    try {
      await services.removeItem(id);

      return { variant, id };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const itemsSlice = createSlice({
  name: ACTION_DOMAINS.ITEMS,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchItems.fulfilled, (state, { payload }) => {
        state.status = Status.Succeeded;
        // eslint-disable-next-line
        // @ts-expect-error
        state[payload.variant] = [...payload.data];
      })
      .addCase(addItem.fulfilled, (state, action) => {
        // eslint-disable-next-line
        // @ts-expect-error
        state[action.payload.variant].unshift({ ...action.payload.data });
      })
      .addCase(removeItem.fulfilled, (state, { payload }) => {
        // eslint-disable-next-line
        // @ts-expect-error
        state[payload.variant] = (state[payload.variant] as Item[]).filter(
          (item) => item.id !== payload.id,
        );
      }),
});

export default itemsSlice.reducer;
