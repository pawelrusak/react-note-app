import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import PageContext from 'context';
import { theme } from 'theme/mainTheme';
import { useCurrentPageType } from 'hooks';

export type MainTemplateProps = {
  readonly children: JSX.Element;
};

const MainTemplate = ({ children }: MainTemplateProps) => {
  const currentPageType = useCurrentPageType();

  return (
    <div>
      <PageContext.Provider value={currentPageType}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </PageContext.Provider>
    </div>
  );
};

export default MainTemplate;
