import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useCurrentPageType = () => {
  const [pageType, setPageType] = useState('notes');
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTypes = ['twitters', 'articles', 'notes'];

    const [currentPage] = pageTypes.filter((page) => pathname.includes(page));

    setPageType(currentPage);
  }, [pathname]);

  return pageType;
};
