import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { getEarlierDateOfDay } from '~~/src/utils';

const sampleNote = {
  id: '8885d2d6-b081-4342-8232-e889affa9d93',
  title: 'My best note ever',
  created: getEarlierDateOfDay(3).toISOString(),
  content:
    'Miles Dewey Davis III (May 26, 1926 - September 28, 1991) was an American jazz trumpeter, bandleader, and composer.',
};

const middlewares = [thunk];

const mockStore = createMockStore(middlewares);
const initialState = {
  items: {
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
        twitterName: 'hello_roman',
      },
    ],
    isLoading: false,
  },
  auth: {
    userID: null,
    isLoading: false,
  },
};

const store = mockStore(initialState);

export const storybookStore = (variant) => {
  switch (variant) {
    case 'loading': {
      const loadingState = {
        ...initialState,
        items: {
          notes: [],
          articles: [],
          twitters: [],
          isLoading: true,
        },
      };
      return mockStore(loadingState);
    }
    default:
      return mockStore(initialState);
  }
};

export default store;
