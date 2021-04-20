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

export const stripPrefix = (str, prefix) =>
  str.startsWith(prefix) ? str.slice(prefix.length) : str;
