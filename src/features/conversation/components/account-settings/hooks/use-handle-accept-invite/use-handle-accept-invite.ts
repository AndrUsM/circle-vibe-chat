import { useAcceptInvite } from "@features/conversation/hooks";
import { useCallback } from "react";
import { AcceptInviteFormValues } from "../../types";
import { useNotification } from "@core/hooks";

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