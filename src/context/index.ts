import React from 'react';
import { ItemVariants } from 'commonTypes';

const PageContext = React.createContext<ItemVariants | undefined>('notes');

export default PageContext;
