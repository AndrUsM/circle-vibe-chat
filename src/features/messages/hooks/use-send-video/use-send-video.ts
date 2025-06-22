import { use, useCallback } from "react";
import { useNotification, useSocket } from "@core/hooks";
import { Socket } from "socket.io-client";
import { MessageFileEntityType, MessageFileType, MessageType } from "@circle-vibe/shared";

interface UseSendVideoOutput {
  filePath: string;
}

export const useSendVideo = () => {
  const { socket, createVideoSocketConnection } = useSocket();
  const notification = useNotification();

  return useCallback(async (file: File, messageInputDto: any): Promise<UseSendVideoOutput | void> => {
    if (!file) return;

    const videoSocket = (await createVideoSocketConnection(
      file.name
    )) as Socket<any, any>;
    videoSocket.connect();

    videoSocket.on("VIDEO_UPLOADED", ({ filePath }: { filePath: string }) => {
      console.log("VIDEO_UPLOADED", filePath);

      notification({
        type: "success",
        content: "Video uploaded successfully",
      })

      socket.emit('SEND_VIDEO_FILE_MESSAGE', {
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
          messageId: messageInputDto.messageId
        }
      });
    });

    const stream = file.stream();
    const reader = stream.getReader();

    async function uploadVideo() {
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();


        if (value) {
          videoSocket.emit("UPLOAD_VIDEO_CHUNK", value);
        }

        done = streamDone;

        if (streamDone) {
          videoSocket.emit("UPLOAD_VIDEO_END");
        }
      }
    }

    await uploadVideo();
  }, []);
};
