import { string } from "yup";
import { BASE_AUTHORIZATON_FORM_SCHEMA } from "./base-authorization-form-schema";

export const AUTHORIZATON_FORM_BY_EMAIL_SCHEMA =
  BASE_AUTHORIZATON_FORM_SCHEMA.clone().shape({
    email: string().email().required(),
  });
