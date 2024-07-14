import { string } from "yup";
import { BASE_AUTHORIZATON_FORM_SCHEMA } from "./base-authorization-form-schema";

export const AUTHORIZATON_FORM_BY_PRIMARY_PHONE_SCHEMA =
  BASE_AUTHORIZATON_FORM_SCHEMA.clone().shape({
    primaryPhone: string().min(4).max(12).required(),
  });
