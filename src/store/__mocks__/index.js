import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const sampleNote = {
  id: '8885d2d6-b081-4342-8232-e889affa9d93',
  title: 'My best note ever',
  created: '3 days',
  content:
    'Miles Dewey Davis III (May 26, 1926 - September 28, 1991) was an American jazz trumpeter, bandleader, and composer.',
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
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
};
const store = mockStore(initialState);

export default store;
