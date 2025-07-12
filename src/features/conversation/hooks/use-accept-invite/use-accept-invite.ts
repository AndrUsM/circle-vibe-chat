import { request } from "@core/request";

export const useAcceptInvite = () => {
  const acceptInvite = async (token: string) => {
    const response = await request({
      url: "chat/accept-invite-token",
      method: "GET",
      params: {
        token,
      },
    });

    return response?.data;
  };

  return acceptInvite;
};
