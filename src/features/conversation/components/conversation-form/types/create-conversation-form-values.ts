import { ChatType } from '@circle-vibe/shared';

export interface CreateConversationFormValues {
  name: string;
  description: string;
  type: ChatType;
  usersLimit?: number;
}
