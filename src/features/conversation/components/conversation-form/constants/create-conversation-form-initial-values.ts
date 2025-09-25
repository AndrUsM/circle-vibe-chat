import { ChatType } from '@circle-vibe/shared';

import { CreateConversationFormValues } from '../types';

export const CREATE_CONVERSATION_FORM_INITIAL_VALUES: CreateConversationFormValues = {
  name: '',
  description: '',
  type: ChatType.PRIVATE,
  usersLimit: 2,
};
