import { mixed, object, string } from "yup";

export const MESSAGE_FORM_VALIDATION_SCHEMA = object({
  content: string(),
  file: mixed<File>().nullable(),
});
