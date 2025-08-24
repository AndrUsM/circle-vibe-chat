import { CountryCode, PASSWORD_REGEX, UserType } from '@circle-vibe/shared';

import { object, string, date, boolean, mixed } from 'yup';

import { AccountSettingsFormValues } from '../types';

export const ACCOUNT_SETTINGS_FORM_VALIDATION_SCHEMA = object<AccountSettingsFormValues>({
  username: string(),
  firstname: string(),
  surname: string(),
  birthDate: date().notRequired(),
  isHiddenContactInfo: boolean(),
  isAllowedToSearch: boolean(),
  password: string()
    .test('password', 'Password must be at least 8 characters', (value) =>
      value ? PASSWORD_REGEX.test(value) : true,
    )
    .notRequired(),
  city: string(),
  country: mixed<CountryCode>(),
  email: string().email(),
  primaryPhone: string(),
  type: mixed<UserType>(),
});
