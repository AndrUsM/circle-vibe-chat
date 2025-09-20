import { MessageType } from '@circle-vibe/shared';

import { MessageFormValues } from '@features/messages/types';

export const getMessageType = (formValues: MessageFormValues): MessageType => {
  const file = formValues.file;

  if (!file) {
    return MessageType.TEXT;
  }

  if (file.type.includes('image')) {
    return MessageType.IMAGE;
  }

  if (file.type.includes('video')) {
    return MessageType.VIDEO;
  }

  if (file.type.includes('audio')) {
    return MessageType.AUDIO;
  }

  return MessageType.FILE;
};
