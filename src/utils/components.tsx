import { Helmet } from 'react-helmet';

import { capitalize as capitalizeUtils, join } from '~/utils';

type DocumentTitleProps = {
  readonly capitalize?: boolean;
  readonly children: string | string[];
};

export const DocumentTitle = ({ capitalize, children }: DocumentTitleProps) => (
  <Helmet>
    <title>{capitalize ? capitalizeUtils(join(children)) : children}</title>
  </Helmet>
);

DocumentTitle.defaultProps = {
  capitalize: false,
};
