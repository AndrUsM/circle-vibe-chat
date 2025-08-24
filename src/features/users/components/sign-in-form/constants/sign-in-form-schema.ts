import { object, string } from 'yup';

export const AUTHORIZATION_FORM_SCHEMA = object({
  email: string().email().required(),
  // .matches(SHA1REGEX).required(),
  password: string()
    .max(255)
    .min(8)
    // .matches(PASSWORD_REGEX)
    .required(),
});
