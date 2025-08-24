import { useCallback } from 'react';

import {
  FileSocketStartUploadParams,
  FileSocketSuccessOutput,
  GenericFileServerSocketKeys,
} from '@circle-vibe/shared';

import { useNotification, useSocket } from '@core/hooks';

import { handleUploadingVideoProcess } from './utils';

export const useSaveFileAsChunk = () => {
  const { createFileSocketConnection } = useSocket();
  const notification = useNotification();

  return useCallback(
    async (file: File): Promise<string | undefined> => {
      if (!file) {
        notification({
          type: 'error',
          content: `Please select file to upload`,
        });

        return;
      }

      const fileSocket = await createFileSocketConnection();

      return new Promise<string>((resolve, reject) => {
        fileSocket?.on('connect', () => {
          const startVideoUploadPayload: FileSocketStartUploadParams = {
            fileName: file.name,
            type: GenericFileServerSocketKeys,
          };

          fileSocket.emit(GenericFileServerSocketKeys.START_UPLOAD, startVideoUploadPayload);

          notification({
            type: 'success',
            content: `Started uploading file ${file.name}`,
          });

          handleUploadingVideoProcess(file, fileSocket);
        });

        fileSocket?.on(
          GenericFileServerSocketKeys.UPLOAD_SUCCESS,
          ({ filePath }: FileSocketSuccessOutput) => {
            notification({
              type: 'success',
              content: 'File uploaded successfully',
            });

            fileSocket.disconnect();
            resolve(filePath);
          },
        );

        fileSocket?.on(GenericFileServerSocketKeys.UPLOAD_ERROR, (error: string) => {
          notification({
            type: 'error',
            content: 'Something went wrong on file uploading',
          });
          fileSocket.disconnect();

          reject(error);
        });
      });
    },
    [createFileSocketConnection, notification],
  );
};
