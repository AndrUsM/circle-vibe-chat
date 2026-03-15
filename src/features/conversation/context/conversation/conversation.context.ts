import { createContext } from 'react';

import { ChatParticipant } from '@circle-vibe/shared';

import { noop } from '@circle-vibe/components';

import { IConversationContext } from '@features/conversation';

export const ConversationContext = createContext<IConversationContext>({
  selectedChatId: null,
  bucket: null,
  setSelectedChatId: noop,
  currentConversationParticipant: {} as ChatParticipant,
  setCurrentConversationParticipant: noop,
  setBucketName: noop,
});
