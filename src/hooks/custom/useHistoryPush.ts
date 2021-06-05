import { useHistory } from 'react-router-dom';

export const useHistoryPush = (initialPath: string) => {
  const history = useHistory();

  return () => history.push(initialPath);
};
