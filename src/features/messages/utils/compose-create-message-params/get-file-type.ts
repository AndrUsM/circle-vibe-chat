import { documentRegex, MessageFileType, msDocumnetRegex } from '@circle-vibe/shared';

export const getFileType = (file: File): MessageFileType => {
  const type = file.type;

  if (type.includes('video')) {
    return MessageFileType.MP4;
  }

  if (type.includes('image')) {
    return MessageFileType.IMAGE;
  }

  if (type.includes('audio')) {
    return MessageFileType.MP3_AUDIO;
  }

  if (documentRegex.test(file.name)) {
    return MessageFileType.DOCUMENT;
  }

  if (msDocumnetRegex.test(file.name)) {
    return MessageFileType.MS_DOCUMENT;
  }

  return MessageFileType.DOCUMENT;
};
