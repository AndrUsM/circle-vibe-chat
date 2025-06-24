import { use, useCallback } from "react";
import { useNotification, useSocket } from "@core/hooks";
import {
  MessageFileEntityType,
  MessageFileType,
  MessageType,
} from "@circle-vibe/shared";

const CHUNK_SIZE = 0.5 * (1024 * 1024); // 1MB chunks

interface UseSendVideoOutput {
  filePath: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useSendVideo = () => {
  const { socket, createVideoSocketConnection } = useSocket();
  const notification = useNotification();

  return useCallback(
    async (file: File, messageInputDto: any): Promise<void> => {
      if (!file) return;

      // Open a socket connection for this upload
      const videoSocket = await createVideoSocketConnection();

      return new Promise<void>((resolve, reject) => {
        videoSocket?.on("connect", async () => {
          console.log("Socket connected:", videoSocket.id);

          const reader = file.stream().getReader();

          // Send filename to server to create a temp file or identifier
          videoSocket.emit("START_VIDEO_UPLOAD", { fileName: file.name });

          // let offset = 0;

          // while (offset < file.size) {
          //   const chunk = file.slice(offset, offset + CHUNK_SIZE);
          //   const buffer = await chunk.arrayBuffer();

          //   socket.emit("UPLOAD_VIDEO_CHUNK", buffer);
          //   offset += CHUNK_SIZE;

          //   await sleep(1024 * 1024); // wait before sending the next chunk
          // }

          async function uploadChunks() {
            while (true) {
              const { value, done } = await reader.read();
              console.log(done);
              if (done) break;

              // Emit binary chunk
              videoSocket?.emit("UPLOAD_VIDEO_CHUNK", value);
            }
          // Notify server upload finished
          videoSocket?.emit("UPLOAD_VIDEO_END");
          }

          await uploadChunks();
        });

        // Listen for server confirmation
        videoSocket?.on(
          "UPLOAD_VIDEO_SUCCESS",
          ({ filePath }: UseSendVideoOutput) => {
            console.log("Upload finished successfully");
            console.log("VIDEO_UPLOADED", filePath);

            notification({
              type: "success",
              content: "Video uploaded successfully",
            });

            socket.emit("SEND_VIDEO_FILE_MESSAGE", {
              ...messageInputDto,
              fileUrl: filePath,
              optimizedUrl: filePath,
              fileMeta: {
                fileName: file.name,
                url: filePath,
                optimizedUrl: filePath,
                type: "VIDEO",
                description: messageInputDto.content,
                entityType: MessageFileEntityType.VIDEO,
                messageId: messageInputDto.messageId,
              },
            });
            videoSocket.disconnect();
            resolve();
          }
        );

        videoSocket?.on("UPLOAD_VIDEO_ERROR", (error) => {
          console.error("Upload error", error);
          videoSocket.disconnect();
          reject(error);
        });

        videoSocket?.on("disconnect", () => {
          console.log("Socket disconnected");
        });
      });
    },
    [createVideoSocketConnection, socket, notification]
  );
};
