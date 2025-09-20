import { useState } from 'react';

import { ChatParticipant } from '@circle-vibe/shared';

import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

import { ConversationContext } from './conversation.context';
import { IConversationContext } from './conversation.context-interface';

export const ConversationProvider: ExtendedReactFunctionalComponent = ({ children }) => {
  const [participant, setParticipant] = useState<ChatParticipant | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const state: IConversationContext = {
    selectedChatId,
    currentConversationParticipant: participant,
    setSelectedChatId: (chatId: number) => setSelectedChatId(chatId),
    setCurrentConversationParticipant: setParticipant,
  };

  return <ConversationContext.Provider value={state}>{children}</ConversationContext.Provider>;
};
