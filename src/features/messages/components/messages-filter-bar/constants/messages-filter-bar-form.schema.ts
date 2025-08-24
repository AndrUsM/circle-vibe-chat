import { array, object, string } from 'yup';

import { MessagesFilterBarFormValues } from '../types';

export const MESSAGES_FILTER_BAR_FORM_SCHEMA = object<MessagesFilterBarFormValues>({
  content: string().notRequired(),
  senderIds: array().notRequired(),
});
