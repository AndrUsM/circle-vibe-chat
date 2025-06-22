import { ChatParticipant, MessageFileEntityType, MessageFileType } from "@circle-vibe/shared";
import { MessageFormValues } from "@features/messages/types";

import { getMessageType } from "./get-message-type";

const msDocumnetRegex = /\.(docx?|xlsx?|pptx?)$/i;
const documentRegex = /\.(pdf|odt|ods|odp|rtf|txt)$/i;

const getFileType = (file: File): MessageFileType => {
  const type = file.type;

  if (type.includes("video")) {
    return type as MessageFileType;
  }

  if (documentRegex.test(file.name)) {
    return MessageFileType.DOCUMENT;
  }

  if (msDocumnetRegex.test(file.name)) {
    return MessageFileType.MS_DOCUMENT;
  }

  return MessageFileType.DOCUMENT;
}

const getEntityType = (file: File): MessageFileEntityType => {
  const type = file.type;

  if (type.includes("image")) {
    return MessageFileEntityType.IMAGE;
  }

  if (type.includes('video')) {
    return MessageFileEntityType.VIDEO;
  }

  return MessageFileEntityType.FILE;
}

const composeFileInputDto = (file: File, description: string) => ({
    fileName: file.name,
    description,
    type: getFileType(file),
    fileType: file.type,
    entityType: getEntityType(file)
})

export const composeCreateMessageParams = (
  chatParticipant: ChatParticipant,
  selectedChatId: number,
  formValues: MessageFormValues
) => {
  const messageType = getMessageType(formValues);
  return {
    content: formValues.content,
    chatId: selectedChatId,
    senderId: chatParticipant?.id,
    threadId: null,
    hidden: false,
    messageType,
  };
};

export const composeCreateMessageFileParams = (
  chatParticipant: ChatParticipant,
  selectedChatId: number,
  formValues: MessageFormValues
) => {
  const messageType = getMessageType(formValues);
  const message =  {
    content: formValues.content,
    chatId: selectedChatId,
    senderId: chatParticipant?.id,
    threadId: null,
    hidden: false,
    messageType,
    fileMeta: composeFileInputDto(formValues.file as File, formValues.content),
  };

  return {
    message,
    file: formValues.file?.arrayBuffer(),
  };
};
