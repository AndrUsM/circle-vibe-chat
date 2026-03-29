import { useCallback } from 'react';

import {
  ChatParticipant,
  ChatSocketCommand,
  MessageType,
  SendMessageChatSocketParams,
} from '@circle-vibe/shared';

import { FormikHelpers } from 'formik';

import { useNotification, useSocket } from '@core/hooks';

import { MessageFormValues } from '@features/messages/types';
import {
  composeCreateMessageParams,
  composeUseSendMessageInput,
  getMessageType,
} from '@features/messages/utils';

import { useSendFileMessage, useSendVideoAsBuffer } from '@api/messages';
import { useActiveConversation } from '@features/conversation';


export const useSendMessage = (
  chatParticipant: ChatParticipant | null,
  selectedChatId: number | null,
  setMessagesLoading: (_loading: boolean) => void,
) => {
  const { socket } = useSocket();
  const { bucket } = useActiveConversation();
  const notification = useNotification();
  const sendVideo = useSendVideoAsBuffer();
  const sendFileMessage = useSendFileMessage()

  return useCallback(
    async (formValues: MessageFormValues, { resetForm }: FormikHelpers<MessageFormValues>) => {
      const hasContent = Boolean(formValues.content || formValues.file);

      if (!hasContent || !chatParticipant || !selectedChatId || !bucket) {
        notification({
          type: 'error',
          content: 'Failed to send message',
        });

        return;
      }

      setMessagesLoading(true);

      if (formValues.file) {
        const messageType = getMessageType(formValues);

        if (messageType === MessageType.VIDEO) {
          try {
            const messageInputDto: SendMessageChatSocketParams = composeCreateMessageParams(
              chatParticipant,
              selectedChatId,
              formValues,
            );

            await sendVideo(formValues.file, messageInputDto, String(bucket));

            resetForm();
            setMessagesLoading(false);
          } catch {
            setMessagesLoading(false);
          }

          return;
        }

        const createMessageInput = composeUseSendMessageInput(
          chatParticipant.id,
          selectedChatId,
          formValues,
        );

        await sendFileMessage(formValues.file, createMessageInput);

        resetForm();
        setMessagesLoading(false);
      } else {
        const messageDto: SendMessageChatSocketParams = composeCreateMessageParams(
          chatParticipant,
          selectedChatId,
          formValues,
        );

        socket.emit(ChatSocketCommand.SEND_MESSAGE, messageDto);
      }

      resetForm();
      setMessagesLoading(false);
    },
    [socket, JSON.stringify(chatParticipant), selectedChatId],
  );
};
