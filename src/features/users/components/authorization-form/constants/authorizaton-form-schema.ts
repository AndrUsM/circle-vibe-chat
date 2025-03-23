import { object, string } from "yup";

import { PASSWORD_REGEX } from '@circle-vibe/shared';

// move to shared
const SHA1REGEX = /^[a-f0-9]{40}$/i;

export const AUTHORIZATON_FORM_SCHEMA =
  object({
    identificationKey: string().matches(SHA1REGEX).required(),
    emmail: string().email(),
    password: string()
    .required()
    .max(255)
    .min(8)
    .matches(PASSWORD_REGEX),
  });
