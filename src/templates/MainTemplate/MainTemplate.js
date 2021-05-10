import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import PageContext from 'context';
import { theme } from 'theme/mainTheme';

const MainTemplate = ({ children, location: { pathname } }) => {
  const [pageType, setPageType] = useState('notes');

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
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(MainTemplate);
