import { ThemeProvider } from 'styled-components';

import PageContext, { CurrentPageVariantProvider } from '~/context';
import { useCurrentPageType } from '~/hooks';
import GlobalStyle from '~/theme/GlobalStyle';
import { theme } from '~/theme/mainTheme';

export type MainTemplateProps = {
  readonly children: JSX.Element;
};

const MainTemplate = ({ children }: MainTemplateProps) => {
  const currentPageType = useCurrentPageType();

  return (
    <div>
      <PageContext.Provider value={currentPageType}>
        <CurrentPageVariantProvider>
          <GlobalStyle />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CurrentPageVariantProvider>
      </PageContext.Provider>
    </div>
  );
};

export default MainTemplate;
