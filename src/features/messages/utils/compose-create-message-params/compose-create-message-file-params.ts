import { SendFileMessageChatSocketParams } from '@circle-vibe/shared';

import { composeFileMetaInputDto } from './compose-file-meta-params';
import { UseSendMessageInput } from './compose-use-send-file-message-input';

export const composeCreateMessageFileParams = (
  messageInputDto: UseSendMessageInput,
  filePath: string,
  optimizedFilePath: string,
  file: File,
): SendFileMessageChatSocketParams => {
  const { content } = messageInputDto;
  const message = {
    ...messageInputDto,
    fileUrl: filePath,
    optimizedUrl: optimizedFilePath ?? filePath,
    fileMeta: composeFileMetaInputDto(file as File, content),
  };

  return message;
};
