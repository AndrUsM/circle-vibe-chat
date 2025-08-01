import { object, string, date, boolean, mixed } from "yup";
import { CountryCode, UserType } from "@circle-vibe/shared";
import { AccountSettingsFormValues } from "../types";

export const ACCOUNT_SETTINGS_FORM_VALIDATION_SCHEMA = object<AccountSettingsFormValues>({
  username: string(),
  firstname: string(),
  surname: string(),
  birthDate: date().notRequired(),
  isHiddenContactInfo: boolean(),
  isAllowedToSearch: boolean(),
  city: string(),
  country: mixed<CountryCode>(),
  email: string().email(),
  primaryPhone: string(),
  type: mixed<UserType>(),
})
