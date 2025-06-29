import { MessageFormValues } from "@features/messages/types";
import { getMessageType } from "./get-message-type";
import { MessageType } from "@circle-vibe/shared";

export interface UseSendMessageInput {
  chatId: number,
  senderId: number;
  threadId?: number;
  hidden: boolean;
  content: string;
  messageType: MessageType;
}

export const composeUseSendMessageInput = (
  chatParticipant: number,
  selectedChatId: number,
  formValues: MessageFormValues
): UseSendMessageInput => {
  const messageType = getMessageType(formValues);

  return {
    chatId: selectedChatId,
    senderId: chatParticipant,
    threadId: undefined,
    hidden: false,
    content: formValues.content ?? '',
    messageType,
  }
};
