import { useCallback } from "react";

import { User } from "@circle-vibe/shared";

import { request } from "@core/request";
import { useCurrentUser, useNotification } from "@core/hooks";

import { AccountSettingsFormValues } from "@features/users/components/account-settings-form/types"
import { composeUpdateUserPayload } from "@api/user/utils";

export const useUpdateUserSettings = () => {
  const notification = useNotification();
  const {setUser} = useCurrentUser();

  return useCallback(async (userId: number, data: AccountSettingsFormValues) => {
    const updatedUser = await request<User>({
      method: "PUT",
      url: `user/${userId}`,
      data: composeUpdateUserPayload(data),
    });

    if (!updatedUser?.data) {
      notification({
        type: "error",
        content: "Failed to update user settings"
      });

      return;
    }

    notification({
      type: "success",
      content: "User settings successfully updated!"
    });

    setUser(updatedUser.data);

    return updatedUser;
  }, []);
}