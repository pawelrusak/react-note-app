import type { RootState } from '~/store/reducers';

export const userIDSelector = ({ auth }: RootState) => auth.userID;
