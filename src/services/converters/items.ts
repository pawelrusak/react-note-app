/* eslint-disable  */

// @ts-ignore
export const convertQuerySnapshotItem = (item) => {
  const { userID, created, ...rest } = item.data();
  return {
    id: item.id,
    created: new Date(created.seconds).getTime(),
    ...rest,
  };
};

// @ts-ignore
export const convertQuerySnapshot = (querySnapshot) =>
  querySnapshot.docs.map(convertQuerySnapshotItem);
