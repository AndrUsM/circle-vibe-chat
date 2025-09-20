import { ChatSocketCommand, ConversationBucketNameEnum } from '@circle-vibe/shared';

import { useSocket } from '@core/hooks';
import { composeCreateMessageFileParams, UseSendMessageInput } from '@features/messages/utils';

import { IFileUrl } from './types';
import { useMessageTypeToUploadingMethodMap } from './use-message-type-to-uploading-method-output';

export const useSendFileMessage = () => {
  const { socket } = useSocket();
  const getMessageTypeToUploadingMethodMap = useMessageTypeToUploadingMethodMap();

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
