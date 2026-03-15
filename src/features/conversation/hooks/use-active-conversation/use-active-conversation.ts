import { useContext } from 'react';

import { ConversationContext } from '@features/conversation/context';

export const useActiveConversation = () => {
  const {
    selectedChatId,
    bucket,
    currentConversationParticipant,
    setSelectedChatId,
    setBucketName,
    setCurrentConversationParticipant,
  } = useContext(ConversationContext);

  return {
    bucket,
    selectedChatId,
    currentConversationParticipant,
    setBucketName,
    setSelectedChatId,
    setCurrentConversationParticipant,
  };
};
