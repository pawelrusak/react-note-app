import type { RootState } from '~/store';

export const userIDSelector = ({ auth }: RootState) => auth.userID;
