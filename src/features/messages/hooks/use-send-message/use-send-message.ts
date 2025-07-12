import { FormikHelpers } from "formik";
import { useCallback } from "react";

import {
  ChatParticipant,
  ChatSocketCommand,
  MessageType,
  SendMessageChatSocketParams,
} from "@circle-vibe/shared";
import { useSocket } from "@core/hooks";
import { MessageFormValues } from "@features/messages/types";
import {
  composeCreateMessageParams,
  composeUseSendMessageInput,
  getMessageType,
} from "@features/messages/utils";

import { useSendVideo } from "../use-send-video";
import { useSendFileMessage } from "../use-send-file-message/use-file-message";

export const useSendMessage = (
  chatParticipant: ChatParticipant | null,
  selectedChatId: number | null,
) => {
  const { socket } = useSocket();
  const sendVideo = useSendVideo();
  const sendFileMessage = useSendFileMessage();

  return useCallback(
    async (
      formValues: MessageFormValues,
      { resetForm }: FormikHelpers<MessageFormValues>
    ) => {
      const hasContent = Boolean(formValues.content || formValues.file);

      if (!hasContent) {
        return;
      }

      if (!chatParticipant || !selectedChatId) {
        return;
      }

      if (formValues.file) {
        const messageType = getMessageType(formValues);

        if (messageType === MessageType.VIDEO) {
          const messageInputDto: SendMessageChatSocketParams =
            composeCreateMessageParams(
              chatParticipant,
              selectedChatId,
              formValues
            );

          await sendVideo(formValues.file, messageInputDto);

          resetForm();
          return;
        }

        const createMessageInput = composeUseSendMessageInput(
          chatParticipant.id,
          selectedChatId,
          formValues
        );

        await sendFileMessage(formValues.file, createMessageInput);
        resetForm();
      } else {
        const messageDto: SendMessageChatSocketParams =
          composeCreateMessageParams(
            chatParticipant,
            selectedChatId,
            formValues
          );

        socket.emit(ChatSocketCommand.SEND_MESSAGE, messageDto);
      }

      resetForm();
    },
    [socket, chatParticipant, selectedChatId]
  );
};
