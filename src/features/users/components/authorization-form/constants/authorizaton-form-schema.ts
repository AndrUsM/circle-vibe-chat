import { object, string } from "yup";

export const AUTHORIZATON_FORM_SCHEMA =
  object({
    email: string().email().required(),
    password: string()
    .required()
    .max(255)
    .min(8)
    .matches(/?|#|<|>|^|(|)|*/gi),
  });
