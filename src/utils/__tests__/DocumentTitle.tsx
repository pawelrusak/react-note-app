import { rtlRender, waitFor } from 'testUtils';

import { DocumentTitle } from '../components';

describe('<DocumentTitle /> utils', () => {
  it('display correct document title ', async () => {
    const DOCUMENT_TITLE = 'notes';

    rtlRender(<DocumentTitle>{DOCUMENT_TITLE}</DocumentTitle>);

    await waitFor(() => expect(document.title).toBe(DOCUMENT_TITLE));
  });

  it('capitalize first letter in document title', async () => {
    rtlRender(<DocumentTitle capitalize>articles</DocumentTitle>);

    await waitFor(() => expect(document.title).toBe('Articles'));
  });
});
