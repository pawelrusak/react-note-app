import 'redux-thunk';
import type { Action } from 'redux';
import type { RootState } from '~/store';

declare module 'redux-thunk' {
  export type AppThunk<A extends Action, S = RootState, R = void, E = unknown> = ThunkAction<
    R,
    S,
    E,
    A
  >;
}
