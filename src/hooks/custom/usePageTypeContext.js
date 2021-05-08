import { useContext } from 'react';
import PageContext from 'context';

export const usePageTypeContext = (initialValue = 'notes') => {
  const pageType = useContext(PageContext);

  return pageType ?? initialValue;
};
