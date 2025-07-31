import { CountryCode, User } from "@circle-vibe/shared"
import { AccountSettingsFormValues } from "../../types"

export const composeAccountSettingsFormValues = (user: User): AccountSettingsFormValues => {
  return {
    username: user.username,
    firstname: user.firstname,
    surname: user.surname,
    avatarUrl: user.avatarUrl,
    birthDate: user.birthDate,
    password: "",
    passwordConfirmation: "",
    isHiddenContactInfo: user.isHiddenContactInfo,
    isAllowedToSearch: user.isAllowedToSearch,
    city: user.city,
    country: user.country as CountryCode,
    email: user.email,
    primaryPhone: user.primaryPhone,
    type: user.type,
  }
}