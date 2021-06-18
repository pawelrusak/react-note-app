import type { RootState } from '~/reducers';

export const userIDSelector = ({ auth }: RootState) => auth.userID;
