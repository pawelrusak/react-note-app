import { renderWithRouter, screen, getPairOfPathsAndPageTypes } from 'testUtils';

import MainTemplate from '../MainTemplate/MainTemplate';
import PageContext from '~/context';
import { RoutesPaths } from '~/routes';

const FakeContextPage = () => (
  <PageContext.Consumer>
    {(value) => <span data-testid="FakeContextPage">{value}</span>}
  </PageContext.Consumer>
);

const renderMainTemplate = (path: RoutesPaths) =>
  renderWithRouter(
    <MainTemplate>
      <FakeContextPage />
    </MainTemplate>,
    { path },
  );

describe('<MainTemplate />', () => {
  it.each(getPairOfPathsAndPageTypes())(
    'parse the %s URL path and pass "%s" value to the page context consumer',
    (path, pageType) => {
      renderMainTemplate(path);

      expect(screen.getByTestId('FakeContextPage')).toHaveTextContent(pageType);
    },
  );
});
