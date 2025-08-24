import { documentRegex, MessageFileType, msDocumnetRegex } from '@circle-vibe/shared';

export const getFileType = (file: File): MessageFileType => {
  const type = file.type;

  if (type.includes('video')) {
    return MessageFileType.MP4;
  }

  if (documentRegex.test(file.name)) {
    return MessageFileType.DOCUMENT;
  }

  if (msDocumnetRegex.test(file.name)) {
    return MessageFileType.MS_DOCUMENT;
  }

  return MessageFileType.DOCUMENT;
};
