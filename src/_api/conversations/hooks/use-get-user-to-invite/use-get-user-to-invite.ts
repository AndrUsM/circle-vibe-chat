import { User } from "@circle-vibe/shared";
import { useNotification } from "@core/hooks";
import { request } from "@core/request";
import { AxiosError } from "axios";
import { useState } from "react";

export const useGetUserToInvite = () => {
  const [loading, setLoading] = useState(false);
  const notification = useNotification();

  const getUserToInvite = async (
    conversationId: number,
    chatParticipantId: number,
    username: string,
    personalTargetUserToken?: string
  ) => {
    setLoading(true);

    try {
      const response = await request<User>({
        url: `chat/${conversationId}/user-to-invite`,
        method: "GET",
        params: {
          chatParticipantId,
          username,
          personalTargetUserToken,
        },
      });

      return response?.data;
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        notification({
          type: "error",
          content: "Failed to get user to invite",
        });

        return;
      }

      if (error.response?.status === 400) {
        notification({
          type: "error",
          content: "User already invited",
        });

        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return { getUserToInvite, loading };
};
