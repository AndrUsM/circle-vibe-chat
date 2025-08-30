import { CountryCode, User } from '@circle-vibe/shared';

import { FormatDateTime, formatDateTime } from '@circle-vibe/components';

import { AccountSettingsFormValues } from '../../types';

export const composeAccountSettingsFormValues = (user: User): AccountSettingsFormValues => {
  return {
    username: user.username,
    firstname: user.firstname,
    surname: user.surname,
    avatarUrl: user.avatarUrl,
    birthDate: user.birthDate
      ? formatDateTime(user.birthDate, FormatDateTime.DATE_INPUT)
      : undefined,
    password: '',
    isHiddenContactInfo: user.isHiddenContactInfo,
    isAllowedToSearch: user.isAllowedToSearch,
    city: user.city,
    country: user.country as CountryCode,
    email: user.email,
    primaryPhone: user.primaryPhone,
    type: user.type,
  };
};
