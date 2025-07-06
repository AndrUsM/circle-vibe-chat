import { Socket } from "socket.io-client";
import { FileVideoServerSocketKeys, FileVideoSocketErrorOutput } from "@circle-vibe/shared";

async function uploadChunks(reader: ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>>, videoSocket: Socket | null) {
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    videoSocket?.emit<FileVideoSocketErrorOutput>(FileVideoServerSocketKeys.UPLOAD_VIDEO_CHUNK, value);
  }

  videoSocket?.emit(FileVideoServerSocketKeys.UPLOAD_VIDEO_END);
}

export const handleUploadingVideoProcess = async (file: File, videoSocket: Socket) => {
  const reader = file.stream().getReader();

  await uploadChunks(reader, videoSocket);
};
