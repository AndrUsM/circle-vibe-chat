import { MessageType } from "@circle-vibe/shared";
import { MessageFormValues } from "@features/messages/types";
import { getMessageType } from "./get-message-type";

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
    threadId: formValues?.threadId,
    hidden: false,
    content: formValues.content ?? '',
    messageType,
  }
};
