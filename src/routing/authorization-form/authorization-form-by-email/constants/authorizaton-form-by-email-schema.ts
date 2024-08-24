import { string } from "yup";
import { BASE_AUTHORIZATON_FORM_SCHEMA } from "../../_shared/constants/base-authorization-form-schema";

export const AUTHORIZATON_FORM_BY_EMAIL_SCHEMA =
  BASE_AUTHORIZATON_FORM_SCHEMA.clone().shape({
    email: string().email().required(),
    password: string().min(8).max(255).required(),
  });
