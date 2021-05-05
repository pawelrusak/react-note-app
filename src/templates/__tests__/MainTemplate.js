import { renderWithRouter, screen, getPairOfPathsAndPageTypes } from 'testUtils';
import PageContext from 'context';
import MainTemplate from '../MainTemplate/MainTemplate';

const FakeContextPage = () => (
  <PageContext.Consumer>
    {(value) => <span data-testid="fake-context-page">{value}</span>}
  </PageContext.Consumer>
);

const renderMainTemplate = (path) =>
  renderWithRouter(
    <MainTemplate>
      <FakeContextPage />
    </MainTemplate>,
    { path },
  );

const getByFakeContextPage = () => screen.getByTestId('fake-context-page');

describe('<MainTemplate />', () => {
  it.each(getPairOfPathsAndPageTypes())(
    'parse the %s URL path and pass "%s" value to the page context consumer',
    (path, pageType) => {
      renderMainTemplate(path);

      expect(getByFakeContextPage()).toHaveTextContent(pageType);
    },
  );
});
