import { ChatParticipant } from '@circle-vibe/shared';

import { request } from '@core/request';

export const useGetChatParticipants = () => {
  return async (conversationId: number) => {
    const response = await request<ChatParticipant[]>({
      url: `chat/${conversationId}/participants`,
      method: 'GET',
    });

    return response?.data ?? [];
  };
};
