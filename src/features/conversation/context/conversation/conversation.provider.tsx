import { useMemo, useState } from "react";

import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";
import { ChatParticipant } from "@circle-vibe/shared";

import { ConversationContext } from "./conversation.context";
import { IConversationContext } from "./conversation.context-interface";

export const ConversationProvider: ExtendedReactFunctionalComponent = ({
  children,
}) => {
  const [participant, setParticipant] = useState<ChatParticipant | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const state = useMemo<IConversationContext>(() => ({
    selectedChatId,
    currentConversationParticipant: participant,
    setSelectedChatId: (chatId: number) => setSelectedChatId(chatId),
    setCurrentConversationParticipant: (participant: ChatParticipant) => setParticipant(participant)
  }), [selectedChatId, participant]);

  return (
    <ConversationContext.Provider value={state}>{children}</ConversationContext.Provider>
  );
};
