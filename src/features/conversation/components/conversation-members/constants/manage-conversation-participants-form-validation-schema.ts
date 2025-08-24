import { string, object } from 'yup';

import { ManageConversationParticipantsFormValue } from '../types';

export const MANAGE_CONVERSATION_PARTICIPANTS_VALIDATION_SCHEMA =
  object<ManageConversationParticipantsFormValue>({
    username: string().nullable(),
    personalToken: string().nullable(),
  });
