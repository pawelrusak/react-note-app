import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ACTION_DOMAINS } from '~/constants';

import type { Variants } from '~/commonTypes';

export type SearchState = {
  notes: string;
  articles: string;
  twitters: string;
};

const initialState: SearchState = {
  notes: '',
  articles: '',
  twitters: '',
};

type SearchItemsPayloadAction = PayloadAction<{
  variant: Variants;
  value: string;
}>;

const searchSlice = createSlice({
  name: ACTION_DOMAINS.SEARCH,
  initialState,
  reducers: {
    searchItems: (state, { payload }: SearchItemsPayloadAction) => {
      state[payload.variant] = payload.value;
    },
  },
});

export const { searchItems } = searchSlice.actions;

export default searchSlice.reducer;
