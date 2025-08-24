import { useContext, useMemo } from 'react';

import { ConversationContext } from '@features/conversation/context';

export const useActiveConversation = () => {
  const {
    selectedChatId,
    currentConversationParticipant,
    setSelectedChatId,
    setCurrentConversationParticipant,
  } = useContext(ConversationContext);

  return {
    selectedChatId,
    currentConversationParticipant,
    setSelectedChatId,
    setCurrentConversationParticipant,
  };
};
