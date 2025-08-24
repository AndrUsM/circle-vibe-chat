import { MessageFile } from '@circle-vibe/shared';

export const openFileForPreview = (messageFile: MessageFile) => {
  window.open(messageFile.url, '_blank');
};
