import React from 'react';

import type { ItemVariants } from '~/commonTypes';

const PageContext = React.createContext<ItemVariants | undefined>('notes');

export default PageContext;
