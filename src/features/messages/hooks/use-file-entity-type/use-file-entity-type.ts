import { RefObject, useMemo } from 'react';

import { MessageFileEntityType } from '@circle-vibe/shared';

export const useFileEntityType = (fileInputRef: RefObject<HTMLInputElement | null>) => {
  return useMemo(() => {
    if (!fileInputRef.current?.files?.length) {
      return;
    }

    const fileType = fileInputRef.current.files[0].type;

    if (fileType.startsWith('image/')) {
      return MessageFileEntityType.IMAGE;
    }

    if (fileType.startsWith('video/')) {
      return MessageFileEntityType.VIDEO;
    }

    if (fileType.startsWith('audio/')) {
      return MessageFileEntityType.AUDIO;
    }

    return MessageFileEntityType.FILE;
  }, [fileInputRef?.current?.files]);
};
