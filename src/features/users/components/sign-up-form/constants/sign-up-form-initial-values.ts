import { File, User, UserType } from "@circle-vibe/shared";

export type SignUpFormInput = Omit<
  User,
  "_id" | "avatarUrl" | "birthDate" | "privateToken" | "privateKey"
> & {
  birthDate?: Date;
  avatar?: File;
  passwordConfirmation: string;
};

export const SIGN_UP_FORM_INITIAL_VALUES: SignUpFormInput = {
  username: "",
  surname: "",
  birthDate: undefined,
  password: "",
  passwordConfirmation: "",
  avatar: undefined,
  isHiddenContactInfo: true,
  city: "",
  country: "",
  email: "",
  type: UserType.PRIVATE,
};
