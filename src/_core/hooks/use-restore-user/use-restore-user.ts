import { useCallback, useEffect } from "react";
import { cookiesService } from "@core/services";
import { request } from "@core/request";
import { User } from "@circle-vibe/shared";

import { useCurrentUser } from "../use-current-user";

export const useRestoreUser = () => {
    const user = localStorage.getItem("user");
  const { setUser } = useCurrentUser();
  const token = cookiesService.get("auth-token");

  useEffect(() => {
    if (user !== null) {
      return;
    }

    if (token) {
      loadUser();
    }
  }, [user, token]);

  const loadUser = useCallback(() => {
    request<User>({
      method: "GET",
      url: `user/by-token/${token}`,
    }).then((response) => {
      setUser(response.data);
    });
  }, [token]);
}