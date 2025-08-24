import { object, string } from 'yup';

import { AccountConfirmationFormValues } from '../types';

export const ACCOUNT_CONFIRMATION_FORM_VALIDATION_SCHEMA = object<AccountConfirmationFormValues>({
  email: string().email().required(),
  code: string().max(6).min(6).required(),
});
