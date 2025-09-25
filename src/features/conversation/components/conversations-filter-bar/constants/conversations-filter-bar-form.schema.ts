import { object, boolean, number } from 'yup';

import { ConversationsFilterBarFormValues } from '../types';

export const CONVERSATIONS_FILTER_BAR_FORM_SCHEMA = object<ConversationsFilterBarFormValues>({
  userId: number().notRequired(),
  empty: boolean().notRequired(),
  isPublic: boolean().notRequired(),
  removed: boolean().notRequired(),
});
