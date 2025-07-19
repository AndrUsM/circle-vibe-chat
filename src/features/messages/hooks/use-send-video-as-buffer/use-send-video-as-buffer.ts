import { useCallback } from "react";
import { useSendFile } from "../use-send-file";
import {
  ChatSocketCommand,
  SendMessageChatSocketParams,
} from "@circle-vibe/shared";
import { useNotification, useSocket } from "@core/hooks";
import { composeSendVideoFileMessageParams } from "../use-send-video/utils";

export const useSendVideoAsBuffer = () => {
  const { socket } = useSocket();
  const { uploadVideo } = useSendFile();
  const notification = useNotification();

  return useCallback(
    async (file: File, messageInputDto: SendMessageChatSocketParams) => {
      if (!file) {
        notification({
          type: "error",
          content: `Please select video to upload`,
        });

        return;
      }

      notification({
        type: "success",
        content: `Started uploading video ${file.name}`,
      });

      const video = await uploadVideo(file);
      const { filePath, optimisedFilePath } = video;

      socket.emit(
        ChatSocketCommand.SEND_VIDEO_FILE_MESSAGE,
        composeSendVideoFileMessageParams(
          messageInputDto,
          filePath,
          optimisedFilePath,
          file
        )
      );

      notification({
        type: "success",
        content: "Video uploaded successfully",
      });

      return video;
    },
    [socket, uploadVideo]
  );
};
