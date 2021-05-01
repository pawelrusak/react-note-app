import { renderWithRouter, screen, getPairOfPathsAndPageTypes } from 'testUtils';
import PageContext from 'context';
import MainTemplate from '../MainTemplate/MainTemplate';

const TestPageContextComponent = () => (
  <PageContext.Consumer>
    {(value) => <span data-testid="page-context">{value}</span>}
  </PageContext.Consumer>
);

describe('<MainTemplate />', () => {
  it.each(getPairOfPathsAndPageTypes())(
    'parse the %s URL path and pass "%s" value to the page context consumer',
    (path, pageType) => {
      renderWithRouter(
        <MainTemplate>
          <TestPageContextComponent />
        </MainTemplate>,
        { path },
      );

      expect(screen.getByTestId('page-context')).toHaveTextContent(pageType);
    },
  );
});
