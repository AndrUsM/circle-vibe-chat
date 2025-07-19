import { ChatParticipant, SendMessageChatSocketParams } from "@circle-vibe/shared";
import { MessageFormValues } from "@features/messages/types";

import { getMessageType } from "./get-message-type";
import { encodeBase64 } from "@core/utils";

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
    threadId: undefined,
    hidden: false,
    messageType,
  };
};
