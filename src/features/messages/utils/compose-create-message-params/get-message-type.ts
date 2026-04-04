import { MessageType } from '@circle-vibe/shared';

export const getMessageType = (formValues: {
  file: File | null;
  uploadAs?: MessageType;
}): MessageType => {
  const file = formValues.file;

  if (!file) {
    return MessageType.TEXT;
  }

  if (formValues?.uploadAs) {
    return formValues?.uploadAs;
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
