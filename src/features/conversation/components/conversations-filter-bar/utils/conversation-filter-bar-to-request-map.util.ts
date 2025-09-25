import { ChatType } from "@circle-vibe/shared";

import { ConversationsFilterBarFormValues } from "../types";

export const conversationFilterBarValuesToRequestMap = (filters: ConversationsFilterBarFormValues) => ({
  ...filters,
  type: filters.isPrivateChat ? ChatType.PRIVATE : undefined
})
