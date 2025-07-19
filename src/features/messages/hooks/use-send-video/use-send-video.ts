import { useCallback } from "react";
import { useNotification, useSocket } from "@core/hooks";
import {
  ChatSocketCommand,
  FileVideoSocketStartUploadParams,
  FileVideoSocketSuccessOutput,
  SendMessageChatSocketParams,
} from "@circle-vibe/shared";
import {
  composeSendVideoFileMessageParams,
  handleUploadingVideoProcess,
} from "./utils";

export const useSendVideo = () => {
  const { socket, createVideoSocketConnection } = useSocket();
  const notification = useNotification();

  return useCallback(
    async (
      file: File,
      messageInputDto: SendMessageChatSocketParams
    ): Promise<void> => {
      if (!file) {
        notification({
          type: "error",
          content: `Please select video to upload`,
        });

        return;
      }

      const videoSocket = await createVideoSocketConnection();

      return new Promise<void>((resolve, reject) => {
        videoSocket?.on("connect", () => {
          const startVideoUploadPayload: FileVideoSocketStartUploadParams = {
            fileName: file.name,
          };

          videoSocket.emit("START_VIDEO_UPLOAD", startVideoUploadPayload);

          notification({
            type: "success",
            content: `Started uploading video ${file.name}`,
          });

          handleUploadingVideoProcess(file, videoSocket);
        });

        videoSocket?.on(
          "UPLOAD_VIDEO_SUCCESS",
          ({ filePath }: FileVideoSocketSuccessOutput) => {
            notification({
              type: "success",
              content: "Video uploaded successfully",
            });

            socket.emit(
              ChatSocketCommand.SEND_VIDEO_FILE_MESSAGE,
              composeSendVideoFileMessageParams(messageInputDto, filePath, file)
            );

            videoSocket.disconnect();
            resolve();
          }
        );

        videoSocket?.on("UPLOAD_VIDEO_ERROR", (error: string) => {
          notification({
            type: "error",
            content: "Something went wrong on video uploading",
          });
          videoSocket.disconnect();
          reject(error);
        });
      });
    },
    [createVideoSocketConnection, socket, notification]
  );
};
