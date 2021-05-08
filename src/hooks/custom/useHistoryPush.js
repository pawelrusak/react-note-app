import { useHistory } from 'react-router-dom';

export const useHistoryPush = (initialPath) => {
  const history = useHistory();

  return () => history.push(initialPath);
};
