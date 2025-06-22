import { FormikHelpers } from "formik";
import { useCallback } from "react";

import { ChatParticipant, ChatSocketCommand, MessageType } from "@circle-vibe/shared";
import { useSocket } from "@core/hooks";
import { MessageFormValues } from "@features/messages/types";
import {
  composeCreateMessageFileParams,
  composeCreateMessageParams,
} from "@features/messages/utils";
import { useSendVideo } from "../use-send-video";

export const useSendMessage = (
  chatParticipant: ChatParticipant | null,
  selectedChatId: number | null
) => {
  const { socket } = useSocket();
  const sendVideo = useSendVideo();

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

        const fileMessageDto = composeCreateMessageFileParams(
          chatParticipant,
          selectedChatId,
          formValues
        );

        if (fileMessageDto.message.messageType === MessageType.VIDEO) {
          const messageInputDto = composeCreateMessageParams(
            chatParticipant,
            selectedChatId,
            formValues,
          );

          await sendVideo(formValues.file, messageInputDto);

          resetForm();
          return
        }

        socket.emit("SEND_FILE_MESSAGE", fileMessageDto);
      } else {
        const messageDto = composeCreateMessageParams(
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
