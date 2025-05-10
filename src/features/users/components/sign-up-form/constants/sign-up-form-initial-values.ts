import { File, User, UserType } from "@circle-vibe/shared";

type SignUpFormInput = Omit<
  User,
  "_id" | "avatar" | "birthDate" | "privateToken"
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
  address: "",
  city: "",
  country: "",
  phones: [],
  zipCode: "",
  email: "",
  secret: false,
  type: UserType.PRIVATE,
};
