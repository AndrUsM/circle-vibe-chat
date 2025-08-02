import { useCallback } from "react"

import { useNotification } from "@core/hooks";
import { request } from "@core/request";
import { getAuthToken, setAuthToken } from "@core/utils";

export const useRefreshToken = () => {
  const notification = useNotification();

  return useCallback(async () => {
    const token = getAuthToken();

    const response = await request<{
      token: string;
    }>({
      url: "auth/refresh-token",
      method: "POST",
      data: {
        token,
      }
    });

    if (response?.data?.token) {
      setAuthToken(String(response.data.token));

      return response.data.token;
    }

    notification({
      type: "warning",
      content: "You are not logged in!",
    });
  }, [notification]);
}