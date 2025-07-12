import { ChatType } from "@circle-vibe/shared";

export interface CreateConversationFormValues {
  hidden: boolean;
  name: string;
  description: string;
  type: ChatType;
  usersLimit?: number;
}
