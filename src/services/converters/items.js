export const convertQuerySnapshotItem = (item) => {
  const { userID, created, ...rest } = item.data();
  return {
    id: item.id,
    created: new Date(created.seconds).getTime(),
    ...rest,
  };
};

export const convertQuerySnapshot = (querySnapshot) =>
  querySnapshot.docs.map(convertQuerySnapshotItem);