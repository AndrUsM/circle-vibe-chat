import { CountryCode, UserType } from "@circle-vibe/shared";

export interface SignUpFormInput {
  username: string;
  firstname: string;
  surname: string;
  birthDate?: Date;
  password: string;
  passwordConfirmation: string;
  avatarUrl: string | null;
  avatar: File | null;
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
  avatarUrl: null,
  avatar: null,
  primaryPhone: "",
  isAllowedToSearch: true,
  isHiddenContactInfo: true,
  city: "",
  country: CountryCode.AD,
  email: "",
  type: UserType.PRIVATE,
};
