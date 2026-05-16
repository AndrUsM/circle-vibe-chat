import { ChatSocketCommand } from '@circle-vibe/shared';

import { useSocket } from '@/core/hooks';
import { parseSocketPayload } from '@/shared/utils';

import { composeCreateMessageFileParams, UseSendMessageInput } from '@/features/messages/utils';
import { useActiveConversation } from '@/features/conversation';

import { IFileUrl } from './types/index.js';
import { useMessageTypeToUploadingMethodMap } from './use-message-type-to-uploading-method-output.js';

export const useSendFileMessage = () => {
  const { socket } = useSocket();
  const { bucket } = useActiveConversation();
  const getMessageTypeToUploadingMethodMap = useMessageTypeToUploadingMethodMap();

  return async (file: File, messageInputDto: UseSendMessageInput) => {
    const uploadingMethod = getMessageTypeToUploadingMethodMap(messageInputDto.messageType);
    const fileUrl: IFileUrl = await uploadingMethod(file, String(bucket));

    const payload = composeCreateMessageFileParams(
      messageInputDto,
      fileUrl?.filePath,
      fileUrl?.optimisedFilePath ?? fileUrl?.filePath,
      file,
    );

    console.log(payload);

    socket.emit(ChatSocketCommand.SEND_FILE_MESSAGE, parseSocketPayload(payload));
  };
};
