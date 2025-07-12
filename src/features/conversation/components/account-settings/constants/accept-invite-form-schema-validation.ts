import { object, string } from "yup";

import { AcceptInviteFormValues } from "../types";

export const ACCEPT_INVITE_FORM_SCHEMA_VALIDATION =
  object<AcceptInviteFormValues>({
    token: string().required(),
  });
