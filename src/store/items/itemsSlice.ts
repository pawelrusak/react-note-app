import { createSlice, createAsyncThunk, AppThunkConfig } from '@reduxjs/toolkit';

import { ACTION_DOMAINS } from '~/constants/actionDomains';
import * as services from '~/services';

import type {
  Item,
  NewItem,
  NoteItem,
  ArticleItem,
  TwitterItem,
  ItemVariants,
} from '~/commonTypes';

export type ItemsState = {
  notes: NoteItem[];
  twitters: TwitterItem[];
  articles: ArticleItem[];
  isLoading: boolean;
};

const initialState: ItemsState = {
  notes: [],
  twitters: [],
  articles: [],
  isLoading: false,
};

// eslint-disable-next-line @typescript-eslint/ban-types
type ObjectWithItemVariant<T extends object | never = never> = {
  itemVariant: ItemVariants;
} & T;

type FetchItemsReturn = ObjectWithItemVariant<{ data: Item[] }>;
type FetchItemsArg = { itemVariant: ItemVariants };

export const fetchItems = createAsyncThunk<FetchItemsReturn, FetchItemsArg, AppThunkConfig>(
  `${ACTION_DOMAINS.ITEMS}/fetchItems`,
  async ({ itemVariant }, { getState, rejectWithValue }) => {
    try {
      const { data } = await services.fetchItems({
        type: itemVariant,
        userID: getState().auth.userID,
      });

      return { data, itemVariant };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

type AddItemReturn = ObjectWithItemVariant<{ data: Item }>;
type AddItemArg = ObjectWithItemVariant<{ itemContent: NewItem }>;

export const addItem = createAsyncThunk<AddItemReturn, AddItemArg, AppThunkConfig>(
  `${ACTION_DOMAINS.ITEMS}/addItem`,
  async ({ itemVariant, itemContent }, { getState, rejectWithValue }) => {
    try {
      const { data } = await services.addItem({
        type: itemVariant,
        userID: getState().auth.userID,
        ...itemContent,
      });

      return { data, itemVariant };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

type RemoveItemReturn = ObjectWithItemVariant<{ id: string }>;
type RemoveItemArg = RemoveItemReturn;

export const removeItem = createAsyncThunk<RemoveItemReturn, RemoveItemArg, AppThunkConfig>(
  `${ACTION_DOMAINS.ITEMS}/removeItem`,
  async ({ itemVariant, id }, { rejectWithValue }) => {
    try {
      await services.removeItem(id);

      return { itemVariant, id };
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
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // eslint-disable-next-line
        // @ts-expect-error
        state[payload.itemVariant] = [...payload.data];
      })
      .addCase(addItem.fulfilled, (state, action) => {
        // eslint-disable-next-line
        // @ts-expect-error
        state[action.payload.itemVariant].push({ ...action.payload.data });
      })
      .addCase(removeItem.fulfilled, (state, { payload }) => {
        // eslint-disable-next-line
        // @ts-expect-error
        state[payload.itemVariant] = (state[payload.itemVariant] as Item[]).filter(
          (item) => item.id !== payload.id,
        );
      }),
});

export default itemsSlice.reducer;
