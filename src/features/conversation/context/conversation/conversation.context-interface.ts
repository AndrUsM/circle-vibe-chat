import { ChatParticipant } from '@circle-vibe/shared';

export interface IConversationContext {
  selectedChatId: number | null;
  setSelectedChatId: (chatId: number) => void;
  currentConversationParticipant: ChatParticipant | null;
  setCurrentConversationParticipant: (participants: ChatParticipant) => void;
}
