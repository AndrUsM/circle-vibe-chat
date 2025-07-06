import { useSendFile } from "../use-send-file/use-send-file";
import { useSocket } from "@core/hooks";
import { ChatSocketCommand } from "@circle-vibe/shared";
import {
  composeCreateMessageFileParams,
  getFileType,
  UseSendMessageInput,
} from "@features/messages/utils";

export const useSendFileMessage = () => {
  const { uploadFile, uploadImage } = useSendFile();
  const { socket } = useSocket();

  return async (file: File, messageInputDto: UseSendMessageInput) => {
    const fileType = getFileType(file);

    const fileUrl = await (fileType === "IMAGE"
      ? uploadImage(file)
      : uploadFile(file));
    const payload = composeCreateMessageFileParams(
      messageInputDto,
      fileUrl.filePath,
      // @ts-ignore
      fileUrl.optimisedFilePath,
      file
    );

    socket.emit(ChatSocketCommand.SEND_FILE_MESSAGE, payload);
  };
};
