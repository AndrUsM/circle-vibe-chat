import { useCallback } from "react";
import { User } from "@circle-vibe/shared";

import { useCurrentSessionCredentials, useNotification } from "@core/hooks";
import { request } from "@core/request";
import { useNavigate } from "react-router-dom";
import { PrivatePagesEnum } from "@core/navigation";

interface RestorePasswordInput {
  email: string;
  password: string;
}

interface RestorePasswordOutput {
  token: string;
  user: User;
}

export const useRestorePassword = () => {
  const notification = useNotification();
  const navigate = useNavigate();
  const { setCurrentUser, setToken } = useCurrentSessionCredentials();

  return useCallback(async (data: RestorePasswordInput) => {
    const response = await request<RestorePasswordOutput>({
      url: "auth/restore-password",
      method: "PUT",
      data,
    });

    if (!response?.data) {
      notification({
        type: "error",
        content: "Failed to restore password",
      });

      return;
    }

    const { user, token } = response.data;

    setCurrentUser(user);
    setToken(token);

    void navigate(`/app/${PrivatePagesEnum.CONVERSATIONS}`);

    notification({
      type: "success",
      content: "Password has been restored",
    });
  }, []);
};
