import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fakeItemsData } from '~~/src/testUtils/fakers';
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
    status: 'idle',
  },
  auth: {
    userID: null,
  },
  search: {
    notes: '',
    articles: '',
    twitters: '',
  },
};

const store = mockStore(initialState);

export const storybookStore = (state) => {
  switch (state) {
    case 'loading': {
      const loadingState = {
        ...initialState,
        items: {
          notes: [],
          articles: [],
          twitters: [],
          status: 'loading',
        },
      };
      return mockStore(loadingState);
    }
    case 'many': {
      const manyState = {
        ...initialState,
        items: {
          ...fakeItemsData,
          status: 'succeeded',
        },
      };
      return mockStore(manyState);
    }
    case 'search': {
      const searchState = {
        ...initialState,
        items: {
          ...fakeItemsData,
          status: 'succeeded',
        },
        search: {
          notes: 'e',
          articles: 'e',
          twitters: 'e',
        },
      };

      return mockStore(searchState);
    }
    default:
      return mockStore(initialState);
  }
};

export default store;
