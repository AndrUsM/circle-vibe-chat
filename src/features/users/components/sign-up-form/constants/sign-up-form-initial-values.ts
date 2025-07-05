import { CountryCode, File, User, UserRole, UserType } from "@circle-vibe/shared";

export interface SignUpFormInput {
  username: string;
  firstname: string;
  surname: string;
  birthDate?: Date;
  password: string;
  passwordConfirmation: string;
  avatar: File;
  isHiddenContactInfo: boolean;
  isAllowedToSearch: boolean;
  city: string;
  country?: CountryCode;
  email: string;
  primaryPhone: string;
  type: UserType;
}

export const SIGN_UP_FORM_INITIAL_VALUES: SignUpFormInput = {
  username: "",
  firstname: "",
  surname: "",
  birthDate: undefined,
  password: "",
  passwordConfirmation: "",
  avatar: undefined,
  primaryPhone: "",
  isAllowedToSearch: true,
  isHiddenContactInfo: true,
  city: "",
  country: CountryCode.AD,
  email: "",
  type: UserType.PRIVATE,
};
