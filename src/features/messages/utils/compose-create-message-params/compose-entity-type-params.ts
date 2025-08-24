import { MessageFileEntityType } from '@circle-vibe/shared';

export const getEntityType = (file: File): MessageFileEntityType => {
  const type = file.type;

  if (type.includes('image')) {
    return MessageFileEntityType.IMAGE;
  }

  if (type.includes('video')) {
    return MessageFileEntityType.VIDEO;
  }

  return MessageFileEntityType.FILE;
};
