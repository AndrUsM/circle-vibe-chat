import { CountryCode, UserType } from "@circle-vibe/shared";

export interface AccountSettingsFormValues {
  username?: string;
  firstname?: string;
  surname?: string;
  avatarUrl?: string;
  birthDate?: string;
  password?: string;
  isHiddenContactInfo?: boolean;
  isAllowedToSearch?: boolean;
  city?: string;
  country?: CountryCode;
  email?: string;
  primaryPhone?: string;
  type?: UserType;
}
