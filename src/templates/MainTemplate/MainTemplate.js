import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import PageContext from 'context';
import { theme } from 'theme/mainTheme';
import { useLocation } from 'react-router-dom';

const MainTemplate = ({ children }) => {
  const [pageType, setPageType] = useState('notes');
  const { pathname } = useLocation();

  useEffect(() => {
    // set current page type
    const pageTypes = ['twitters', 'articles', 'notes'];

    const [currentPage] = pageTypes.filter((page) => pathname.includes(page));

    setPageType(currentPage);
  }, [pathname]);

  return (
    <div>
      <PageContext.Provider value={pageType}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </PageContext.Provider>
    </div>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
