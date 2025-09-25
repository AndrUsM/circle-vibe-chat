import { ChatType } from "@circle-vibe/shared";

export interface ConversationsFilterBarFormValues {
  userId?: number;
  empty?: boolean;
  removed?: boolean;
  name?: string;
  isPrivateChat?: boolean;
}
