import { useCallback } from "react";

import { ChatParticipant, UserChatRole } from "@circle-vibe/shared";

import { request } from "@core/request";

interface UseUpdateConversationParticipantInput {
  chatRole?: UserChatRole;
  isMuted?: boolean;
  chatId: number;
  participantId: number;
}

export const useUpdateConversationParticipant = () => {
  return useCallback(async (params: UseUpdateConversationParticipantInput) => {
    const { chatId, participantId, ...requestParams } = params;

    const resonse = await request<ChatParticipant>({
      url: `chat/${chatId}/participants/${participantId}`,
      method: "PUT",
      data: requestParams,
    });

    return resonse?.data;
  }, []);
};
