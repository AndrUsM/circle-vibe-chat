import { GenericFileServerSocketKeys } from '@circle-vibe/shared';

import { Socket } from 'socket.io-client';

async function uploadChunks(
  reader: ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>>,
  videoSocket: Socket | null,
) {
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    videoSocket?.emit<GenericFileServerSocketKeys>(GenericFileServerSocketKeys.UPLOAD_CHUNK, value);
  }

  videoSocket?.emit(GenericFileServerSocketKeys.UPLOAD_END);
}

export const handleUploadingVideoProcess = async (file: File, videoSocket: Socket) => {
  const reader = file.stream().getReader();

  await uploadChunks(reader, videoSocket);
};
