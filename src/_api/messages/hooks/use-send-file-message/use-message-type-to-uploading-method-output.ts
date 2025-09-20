import { ConversationBucketNameEnum, MessageType } from '@circle-vibe/shared';

import { useSendFile } from '@api/messages';
import { UseMessageTypeToUploadingMethodMapOutput } from './types';

export const useMessageTypeToUploadingMethodMap = (): UseMessageTypeToUploadingMethodMapOutput => {
  const { uploadFile, uploadImage, uploadVideo, uploadAudio } = useSendFile();

  return (messageType: MessageType) => {
    switch (messageType) {
      case MessageType.IMAGE:
        return async (file: File, bucket: ConversationBucketNameEnum) => {
          const response = await uploadImage(file, bucket);
          return { filePath: response.filePath, optimisedFilePath: response.optimisedFilePath };
        };
      case MessageType.VIDEO:
        return async (file: File, bucket: ConversationBucketNameEnum) => {
          const response = await uploadVideo(file, bucket);
          return { filePath: response.filePath, optimisedFilePath: response.optimisedFilePath };
        };
      case MessageType.AUDIO:
        return async (file: File, bucket: ConversationBucketNameEnum) => {
          const response = await uploadAudio(file, bucket);
          return { filePath: response.filePath, optimisedFilePath: response.filePath };
        };
      default:
        return async (file: File, bucket: ConversationBucketNameEnum) => {
          const response = await uploadFile(file, bucket);
          return { filePath: response.filePath, optimisedFilePath: response.filePath };
        };
    }
  };
};
