import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';

import { routes } from './index';
import { useAuth } from '~/hooks';

type PrivateRouteProps = RouteProps;

const PrivateRoute = (props: PrivateRouteProps) => {
  const { userID } = useAuth();
  const location = useLocation();

  if (userID === null) {
    return (
      <Redirect
        to={{
          pathname: routes.login,
          state: {
            from: location,
          },
        }}
      />
    );
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} />;
};

export default PrivateRoute;
