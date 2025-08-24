import { formatDateTimeForBackend } from '@circle-vibe/components';

import { AccountSettingsFormValues } from '@features/users/components/account-settings-form/types';

export interface IComposeUpdateUserPayload {
  username?: string;
  firstname?: string;
  surname?: string;
  avatarUrl?: string;
  birthDate?: string;
  password?: string;
  isHiddenContactInfo?: boolean;
  isAllowedToSearch?: boolean;
  city?: string;
  country?: string;
  email?: string;
  primaryPhone?: string;
  type?: string;
}

export const composeUpdateUserPayload = (
  user: AccountSettingsFormValues,
): IComposeUpdateUserPayload => {
  return {
    username: user.username,
    firstname: user.firstname,
    surname: user.surname,
    avatarUrl: user.avatarUrl,
    birthDate: user.birthDate ? formatDateTimeForBackend(new Date(user.birthDate)) : undefined,
    password: user.password?.length ? user.password : undefined,
    isHiddenContactInfo: user.isHiddenContactInfo,
    isAllowedToSearch: user.isAllowedToSearch,
    city: user.city,
    country: user.country,
    email: user.email,
    primaryPhone: user.primaryPhone,
    type: user.type,
  };
};
