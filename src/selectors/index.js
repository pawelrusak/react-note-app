export const itemByTypeAndIDSelector = (itemType, itemID) => (store) =>
  store?.[itemType]?.find((item) => item.id === itemID);

export const userIDSelector = ({ userID }) => userID;
