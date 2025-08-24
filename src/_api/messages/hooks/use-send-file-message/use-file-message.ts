import { ChatSocketCommand, ConversationBucketNameEnum } from "@circle-vibe/shared";

import { useSendFile } from "@api/messages";
import { useSocket } from "@core/hooks";

import {
  composeCreateMessageFileParams,
  getFileType,
  UseSendMessageInput,
} from "@features/messages/utils";

interface IFileUrl {
  filePath: string;
  optimisedFilePath?: string
}

export const useSendFileMessage = () => {
  const { uploadFile, uploadImage } = useSendFile();
  const { socket } = useSocket();

  return async (file: File, messageInputDto: UseSendMessageInput) => {
    const fileType = getFileType(file);

    const fileUrl: IFileUrl = await (fileType === "IMAGE"
      ? uploadImage(file, ConversationBucketNameEnum.CONVERSATIONS)
      : uploadFile(file, ConversationBucketNameEnum.CONVERSATIONS));

    const payload = composeCreateMessageFileParams(
      messageInputDto,
      fileUrl?.filePath,
      fileUrl?.optimisedFilePath ?? fileUrl?.filePath,
      file
    );

    socket.emit(ChatSocketCommand.SEND_FILE_MESSAGE, payload);
  };
};
