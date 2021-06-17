import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { getEarlierDateOfDay } from '~/utils';

import type { AnyAction } from 'redux';
import type { RootState } from '~/reducers';

const sampleNote = {
  id: '8885d2d6-b081-4342-8232-e889affa9d93',
  title: 'My best note ever',
  created: getEarlierDateOfDay(3),
  content:
    'Miles Dewey Davis III (May 26, 1926 - September 28, 1991) was an American jazz trumpeter, bandleader, and composer.',
};

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];

const mockStore = createMockStore<RootState, DispatchExts>(middlewares);
const initialState: RootState = {
  notes: [
    {
      ...sampleNote,
    },
  ],
  articles: [
    {
      ...sampleNote,
      articleUrl: 'https://youtube.com/helloroman',
    },
  ],
  twitters: [
    {
      ...sampleNote,
      twitterName: 'hello_romans',
    },
  ],
  userID: null,
  isLoading: false,
};

const store = mockStore(initialState);

export default store;
