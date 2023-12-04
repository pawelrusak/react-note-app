import { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import type { Variant } from '~/commonTypes';

const AVAILABLE_PAGE_VARIANTS = ['twitters', 'articles', 'notes'] as const;

// I intentionally use objects instead of string literals to handle all available error types
type CurrentPageVariant = {
  currentPageVariant: Variant | undefined;
};

// Export for storybook only
export const CurrentPageVariantContext = createContext<CurrentPageVariant | undefined>(undefined);

type ContextProviderProps = {
  children: React.ReactNode;
};

export const CurrentPageVariantProvider = ({ children }: ContextProviderProps) => {
  const { pathname } = useLocation();

  const [currentRootDirectory] = pathname.split('/').filter(Boolean);
  const currentPageVariant = AVAILABLE_PAGE_VARIANTS.find(
    (pageVariant) => pageVariant === currentRootDirectory,
  );

  const value: CurrentPageVariant = {
    currentPageVariant,
  };

  return (
    <CurrentPageVariantContext.Provider value={value}>
      {children}
    </CurrentPageVariantContext.Provider>
  );
};

export const useCurrentPageVariant = () => {
  const context = useContext(CurrentPageVariantContext);

  if (context === undefined) {
    throw new Error('useCurrentPageVariant must be used within a CurrentPageVariantProvider');
  }

  const { currentPageVariant } = context;

  if (currentPageVariant === undefined) {
    throw new Error(
      'useCurrentPageVariant must be used inside a URL that has a pathname ' +
        `with root sub-directory: ${AVAILABLE_PAGE_VARIANTS.join(', ')}`,
    );
  }

  return currentPageVariant;
};
