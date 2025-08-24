import { ChatParticipant, SendMessageChatSocketParams } from '@circle-vibe/shared';

import { encodeBase64 } from '@core/utils';

import { MessageFormValues } from '@features/messages/types';

import { getMessageType } from './get-message-type';

export const composeCreateMessageParams = (
  chatParticipant: ChatParticipant,
  selectedChatId: number,
  formValues: MessageFormValues,
): SendMessageChatSocketParams => {
  const messageType = getMessageType(formValues);
  return {
    content: encodeBase64(formValues.content ?? ''),
    chatId: selectedChatId,
    senderId: chatParticipant?.id,
    threadId: formValues?.threadId,
    hidden: false,
    messageType,
  };
};
