import { ConversationContext } from "@features/conversation/context";
import { useContext, useMemo } from "react";

export const useActiveConversation = () => {
  const {
    selectedChatId,
    currentConversationParticipant,
    setSelectedChatId,
    setCurrentConversationParticipant,
  } = useContext(ConversationContext);

  return useMemo(
    () => ({
      selectedChatId,
      currentConversationParticipant,
      setSelectedChatId,
      setCurrentConversationParticipant,
    }),
    [currentConversationParticipant, selectedChatId]
  );
};
