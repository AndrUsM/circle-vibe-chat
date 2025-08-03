import { object, string } from "yup";

import { PASSWORD_REGEX } from "@circle-vibe/shared";

import { RestorePasswordFormValues } from "../types";

export const RESTORE_PASSWORD_FORM_VALIDATION_SCHEMA = object<RestorePasswordFormValues>({
  email: string().email().required(),
  password: string()
    .max(255)
    .min(8)
    // .matches(PASSWORD_REGEX)
    .required(),
});
