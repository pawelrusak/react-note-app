import { renderHook } from '@testing-library/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { getPairOfPathsAndPageTypes } from 'testUtils';

import { useCurrentPageVariant, CurrentPageVariantProvider } from '../currentPageVariant';
import { ROUTES_PATHS } from '~/constants';

const renderCurrentPageVariantHook = (path: string) => {
  window.history.pushState({}, 'Test page', path);

  const wrapper: React.FC = ({ children }) => (
    <BrowserRouter>
      <CurrentPageVariantProvider>{children}</CurrentPageVariantProvider>
    </BrowserRouter>
  );

  return {
    ...renderHook(() => useCurrentPageVariant(), {
      wrapper,
    }),
  };
};

const NO_VARIANTS_ROUTES_PATHS = [ROUTES_PATHS.home, ROUTES_PATHS.login, ROUTES_PATHS.register];

describe('CurrentPageVariant Context', () => {
  it('if Current Page Variant Hook is used without <CurrentPageVariantProvider/> then throw error', () => {
    window.history.pushState({}, 'Test page', '/');

    const wrapper: React.FC = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

    const { result } = renderHook(() => useCurrentPageVariant(), { wrapper });

    expect(result.error).toEqual(
      Error('useCurrentPageVariant must be used within a CurrentPageVariantProvider'),
    );
  });

  it.each(NO_VARIANTS_ROUTES_PATHS)(
    'If the Current Page Variant Hook is used outside of variant URLs, it should throw an error',
    (path) => {
      const { result } = renderCurrentPageVariantHook(path);

      expect(result.error).toEqual(
        Error(
          'useCurrentPageVariant must be used inside a URL that has a pathname with root sub-directory: twitters, articles, notes',
        ),
      );
    },
  );

  it.each(getPairOfPathsAndPageTypes())(
    'the Current Page Variant Hook should return from %s URL the corresponding %s page variant',
    (path, variant) => {
      const { result } = renderCurrentPageVariantHook(path);

      expect(result.current).toBe(variant);
    },
  );
});
