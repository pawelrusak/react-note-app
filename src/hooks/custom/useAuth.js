import { useSelector, useDispatch } from 'react-redux';
import { authenticate as authenticateAction } from 'actions';
import { userIDSelector } from 'selectors';

export const useAuth = () => {
  const userID = useSelector(userIDSelector);
  const dispatch = useDispatch();

  const authenticate = (email, password) => {
    dispatch(authenticateAction(email, password));
  };

  return {
    userID,
    authenticate,
  };
};
