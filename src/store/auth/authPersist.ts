const AUTH_PERSIST_USER_ID = 'auth-user-id';

const authPersist = {
  setUserID: (id: string) => localStorage.setItem(AUTH_PERSIST_USER_ID, id),
  getUserID: () => localStorage.getItem(AUTH_PERSIST_USER_ID),
  removeUserID: () => localStorage.removeItem(AUTH_PERSIST_USER_ID),
};

export default authPersist;
