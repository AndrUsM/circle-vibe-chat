import { User } from '@circle-vibe/shared';
import { request } from '@core/request';

interface UseConversationsParticipants {
  userId: number
}

export interface ChatParticipantsWithUser {
  user: User;
  id: number;
}

export const useConversationsParticipants = () => {
  return async (options: UseConversationsParticipants) => {
    const { userId } = options;

    const response = await request<ChatParticipantsWithUser[]>({
      url: `chat/participants`,
      method: 'GET',
      params: {
        userId,
      }
    });

    return response?.data;
  };
};
