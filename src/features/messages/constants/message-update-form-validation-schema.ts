import { object, string } from "yup";

export const MESSAGE_UPDATE_FORM_VALIDATION_SCHEMA = object({
  content: string().required(),
});
