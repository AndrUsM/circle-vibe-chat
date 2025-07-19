import { createContext } from "react";

import { ChatParticipant } from "@circle-vibe/shared";
import { noop } from "@circle-vibe/components";

import { IConversationContext } from "./conversation.context-interface";

export const ConversationContext = createContext<IConversationContext>({
  selectedChatId: null,
  setSelectedChatId: noop,
  currentConversationParticipant: {} as ChatParticipant,
  setCurrentConversationParticipant: noop
});
