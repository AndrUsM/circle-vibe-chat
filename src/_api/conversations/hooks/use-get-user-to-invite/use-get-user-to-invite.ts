import { User } from "@circle-vibe/shared";
import { request } from "@core/request";
import { useState } from "react";

export const useGetUserToInvite = () => {
  const [loading, setLoading] = useState(false);
  const getUserToInvite = async (
    conversationId: number,
    chatParticipantId: number,
    username: string,
    personalTargetUserToken?: string,
  ) => {
    setLoading(true);

    const response = await request<User>({
      url: `chat/${conversationId}/user-to-invite`,
      method: "GET",
      params: {
        chatParticipantId,
        username,
        personalTargetUserToken,
      },
    });

    setLoading(false);

    return response?.data;
  };

  return { getUserToInvite, loading };
};
