import { ThemeProvider } from 'styled-components';

import { CurrentPageVariantProvider } from '~/context';
import GlobalStyle from '~/theme/GlobalStyle';
import { theme } from '~/theme/mainTheme';

export type MainTemplateProps = {
  readonly children: JSX.Element;
};

const MainTemplate = ({ children }: MainTemplateProps) => (
  <div>
    <CurrentPageVariantProvider>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CurrentPageVariantProvider>
  </div>
);

export default MainTemplate;
