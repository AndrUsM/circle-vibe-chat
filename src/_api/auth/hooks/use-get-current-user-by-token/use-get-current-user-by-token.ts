import { useCallback } from "react";

import { User } from "@circle-vibe/shared";
import { request } from "@core/request";

import { useRefreshToken } from "../use-refresh-token";
import { cookiesService, localStorageService } from "@core/services";
import { useCurrentSessionCredentials } from "@core/hooks";

export const useGetCurrentUserByToken = () => {
  const refreshToken = useRefreshToken();
  const { setCurrentUser, token } = useCurrentSessionCredentials();

  return useCallback(async () => {
    request<User>({
      url: "auth/current",
      method: "GET",
    })
      .then((response) => {
        if (response?.data?.id) {
          setCurrentUser(response.data);

          return;
        }

        return response;
      })
      .catch((error) => {
        if (error.status === 403 && token) {
          refreshToken();
          window.location.reload();
        }
      });
  }, [refreshToken]);
};
