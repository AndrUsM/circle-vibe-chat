import { request } from '@core/request';

interface UseGenerateConversationInviteOptions {
  conversationId: number;
  targetUserId: number;
  fromChatParticipantId: number;
}

export const useGenerateConversationInvite = () => {
  return async (options: UseGenerateConversationInviteOptions) => {
    const { conversationId, targetUserId, fromChatParticipantId } = options;

    const response = await request<string>({
      url: `chat/${conversationId}/invite`,
      method: 'POST',
      data: {
        targetUserId,
        fromChatParticipantId,
      },
    });

    return response?.data;
  };
};
