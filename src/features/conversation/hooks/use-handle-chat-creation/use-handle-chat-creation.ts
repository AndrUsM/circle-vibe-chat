import { useCallback } from "react";

import { ChatSocketCommand, CreateChatSocketParams } from "@circle-vibe/shared";
import { CreateConversationFormValues } from "@features/conversation/components/conversation-form/types";

import { useSocket } from "@core/hooks";

export const useHandleChatCreation = () => {
  const { socket } = useSocket();
  const handleChatCreation = useCallback(
    async (formValues: CreateConversationFormValues) => {
      const payload: CreateChatSocketParams = formValues;

      socket.emit(ChatSocketCommand.CREATE_CHAT, payload);
    },
    []
  );

  return handleChatCreation;
};
