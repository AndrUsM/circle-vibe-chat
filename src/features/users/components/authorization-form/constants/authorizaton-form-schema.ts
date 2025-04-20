import { object, string } from "yup";

import {
	PASSWORD_REGEX,
	SHA1REGEX
} from '@circle-vibe/shared';

export const AUTHORIZATION_FORM_SCHEMA =
  object({
    identificationKey: string().matches(SHA1REGEX).required(),
    email: string().email(),
    password: string()
    .max(255)
    .min(8)
    .matches(PASSWORD_REGEX)
    .required(),
  })
