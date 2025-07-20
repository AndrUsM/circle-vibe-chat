import { useMemo, useState } from "react";

import { useBoolean } from "@circle-vibe/components";
import { MESSAGE_UPDATE_FORM_INITIAL_VALUE } from "@features/messages/constants";
import { MessageUpdateFormValues } from "@features/messages/types";
import { useFindMessageById } from "@api/messages";

interface MessageUpdateDialogState {
  chatId: number;
  messageId: number;
  initialValues?: MessageUpdateFormValues;
}

export const useUpdateMessageState = () => {
  const findMessageById = useFindMessageById();
  const [openMessageUpdateDialog, toggleOpenMessageUpdateDialog] =
    useBoolean(false);
  const [state, setState] = useState<MessageUpdateDialogState | null>(null);

  const onOpenMessageUpdateDialog = async (options: MessageUpdateDialogState) => {
    const response = await findMessageById(options?.chatId, options?.messageId);
    const initialValues = response?.id ? {
      content: response?.content,
    }:MESSAGE_UPDATE_FORM_INITIAL_VALUE;

    setState({
      ...options,
      initialValues,
    });
    toggleOpenMessageUpdateDialog();
  };

  const onCloseMessageUpdateDialog = () => {
    setState(null);
    toggleOpenMessageUpdateDialog();
  };

  return useMemo(
    () => ({
      openMessageUpdateDialog,
      messageUpdateDialogState: state,
      onOpenMessageUpdateDialog,
      onCloseMessageUpdateDialog,
    }),
    [
      openMessageUpdateDialog,
      state,
      onOpenMessageUpdateDialog,
      onCloseMessageUpdateDialog,
    ]
  );
};
