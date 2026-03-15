import { ChatParticipant } from '@circle-vibe/shared';

export interface IConversationContext {
  bucket: string | null;
  selectedChatId: number | null;
  setSelectedChatId: (chatId: number) => void;
  currentConversationParticipant: ChatParticipant | null;
  setBucketName: (bucket: string) => void;
  setCurrentConversationParticipant: (participants: ChatParticipant) => void;
}
