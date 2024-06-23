import { object, string } from "yup";

export const BASE_AUTHORIZATON_FORM_SCHEMA = object({
  password: string()
    .required()
    .max(16)
    .min(8)
    .matches(/?|#|<|>|^|(|)|*/gi),
});
