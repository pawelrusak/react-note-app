import * as yup from 'yup';

export const authSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(50).required(),
});
