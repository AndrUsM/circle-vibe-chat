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

import { useSendFileMessage } from "../use-send-file-message/use-file-message";
import { useSendVideoAsBuffer } from "../use-send-video-as-buffer";

export const useSendMessage = (
  chatParticipant: ChatParticipant | null,
  selectedChatId: number | null,
  setMessagesLoading: (loading: boolean) => void
) => {
  const { socket } = useSocket();
  const sendVideo = useSendVideoAsBuffer();
  const sendFileMessage = useSendFileMessage();

  return useCallback(
    async (
      formValues: MessageFormValues,
      { resetForm, setFieldValue }: FormikHelpers<MessageFormValues>
    ) => {
      setMessagesLoading(true);

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
          try {
            const messageInputDto: SendMessageChatSocketParams =
              composeCreateMessageParams(
                chatParticipant,
                selectedChatId,
                formValues
              );

            await sendVideo(formValues.file, messageInputDto);

            resetForm();
            setMessagesLoading(false);
          } catch (error) {
            setMessagesLoading(false);
          }

          return;
        }

        const createMessageInput = composeUseSendMessageInput(
          chatParticipant.id,
          selectedChatId,
          formValues
        );

        await sendFileMessage(formValues.file, createMessageInput);

        resetForm();
        setMessagesLoading(false);
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
      setMessagesLoading(false);
    },
    [socket, chatParticipant, selectedChatId]
  );
};
