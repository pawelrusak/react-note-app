import { nanoid } from '@reduxjs/toolkit';

import { Status } from '~/commonTypes';
import { getEarlierDateOfDay } from '~/utils';

import type { RootState } from '~/store';

const dayEarlier = getEarlierDateOfDay(1).toISOString();
const fiveDaysEarlier = getEarlierDateOfDay(5).toISOString();
const tenDaysEarlier = getEarlierDateOfDay(10).toISOString();

type FakeItemsData = Omit<RootState['items'], 'status'>;

export const fakeItemsData: FakeItemsData = {
  twitters: [
    {
      id: '1',
      title: 'Hello Roman',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
      created: dayEarlier,
      twitterName: 'hello_roman',
    },
    {
      id: '2',
      title: 'Redux guy',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
      created: dayEarlier,
      twitterName: 'dan_abramov',
    },
    {
      id: '3',
      title: 'React router stuff',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
      created: fiveDaysEarlier,
      twitterName: 'mjackson',
    },
    {
      id: '4',
      title: 'Super animacje!',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
      created: tenDaysEarlier,
      twitterName: 'sarah_edo',
    },
  ],
  articles: [
    {
      id: '1',
      title: 'React on my mind',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
      articleUrl: 'https://youtube.com/helloroman',
      created: dayEarlier,
    },
    {
      id: '2',
      title: 'Wish you React',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
      articleUrl: 'https://youtube.com/helloroman',
      created: dayEarlier,
    },
    {
      id: '3',
      title: 'You gave React a bad name',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
      articleUrl: 'https://youtube.com/helloroman',
      created: fiveDaysEarlier,
    },
    {
      id: '4',
      title: 'Is it React you looking for?',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
      articleUrl: 'https://youtube.com/helloroman',
      created: tenDaysEarlier,
    },
  ],
  notes: [
    {
      id: '1',
      title: 'Wake me up when Vue ends',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
      created: dayEarlier,
    },
    {
      id: '2',
      title: 'Como es An Gular?',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
      created: dayEarlier,
    },
    {
      id: '3',
      title: 'Du bist Reactish',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
      created: fiveDaysEarlier,
    },
    {
      id: '4',
      title: 'Reactuj się kto moze!',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
      created: tenDaysEarlier,
    },
  ],
};

export const fakeStateWithData: RootState = {
  items: {
    ...fakeItemsData,
    status: Status.Succeeded,
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

export const fakeStateWithDataAndLoggedInUser: RootState = {
  ...fakeStateWithData,
  auth: {
    ...fakeStateWithData.auth,
    userID: nanoid(),
  },
};

export const fakeStateWithoutData: RootState = {
  items: {
    notes: [],
    twitters: [],
    articles: [],
    status: Status.Succeeded,
  },
  auth: {
    ...fakeStateWithData.auth,
  },
  search: {
    ...fakeStateWithData.search,
  },
};

export const fakeStateWithNotLoggedInUser = fakeStateWithoutData;
