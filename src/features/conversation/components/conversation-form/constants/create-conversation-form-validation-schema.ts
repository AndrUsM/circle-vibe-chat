import { ChatType } from '@circle-vibe/shared';

import { mixed, number, object, string } from 'yup';

import { CreateConversationFormValues } from '../types';

export const CREATE_CONVERSATION_FORM_VALIDATION_SCHEMA = object<CreateConversationFormValues>({
  name: string().required(),
  description: string().max(1000).required(),
  type: mixed<ChatType>().required(),
  usersLimit: number().max(100).required(),
});
