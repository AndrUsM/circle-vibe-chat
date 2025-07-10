import { request } from "@core/request";
import { ChatParticipant } from "@circle-vibe/shared";

export const useGetChatParticipants = () => {
  return async (conversationId: number) => {
    const response = await request<ChatParticipant[]>({
      url: `chat/${conversationId}/participants`,
      method: "GET",
    });

    return response?.data ?? [];
  };
};
