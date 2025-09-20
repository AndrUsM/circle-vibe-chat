import { ChatSocketCommand, ConversationBucketNameEnum, MessageFileType, MessageType } from '@circle-vibe/shared';

import { useSocket } from '@core/hooks';
import { useSendFile } from '@api/messages';

import {
  composeCreateMessageFileParams,
  UseSendMessageInput,
} from '@features/messages/utils';
// getFileType, TODO: check and remove


interface IFileUrl {
  filePath: string;
  optimisedFilePath?: string;
}
type UseMessageTypeToUploadingMethodMapOutput = (messageType: MessageType) => (file: File, bucket: ConversationBucketNameEnum) => Promise<IFileUrl>

const useMessageTypeToUploadingMethodMap = (): UseMessageTypeToUploadingMethodMapOutput => {
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

export const useSendFileMessage = () => {
  const getMessageTypeToUploadingMethodMap = useMessageTypeToUploadingMethodMap();
  const { socket } = useSocket();

  return async (file: File, messageInputDto: UseSendMessageInput) => {
    const uploadingMethod = getMessageTypeToUploadingMethodMap(messageInputDto.messageType);
    const fileUrl: IFileUrl = await uploadingMethod(file, ConversationBucketNameEnum.CONVERSATIONS);

    const payload = composeCreateMessageFileParams(
      messageInputDto,
      fileUrl?.filePath,
      fileUrl?.optimisedFilePath ?? fileUrl?.filePath,
      file,
    );

    socket.emit(ChatSocketCommand.SEND_FILE_MESSAGE, payload);
  };
};
