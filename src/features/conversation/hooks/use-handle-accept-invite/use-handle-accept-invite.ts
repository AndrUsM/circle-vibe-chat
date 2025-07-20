import { useCallback } from "react";

import { useNotification } from "@core/hooks";
import { useAcceptInvite } from "@api/conversations";

import { AcceptInviteFormValues } from "../../types";

export const useHandleAcceptInvite = () => {
  const acceptInvite = useAcceptInvite();
  const notification = useNotification();

  return useCallback(async (formValues: AcceptInviteFormValues) => {
    const { token } = formValues;

    const response = await acceptInvite(token);

    if (response) {
      notification({
        type: "success",
        content: "Successfully accepted invite!",
      })

      return;
    }

    notification({
      type: "error",
      content: "Failed to accept invite!",
    })
  }, []);
};