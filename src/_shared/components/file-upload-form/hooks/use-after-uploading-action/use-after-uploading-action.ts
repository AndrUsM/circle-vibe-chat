import { useCallback } from 'react';

import { ConversationBucketNameEnum } from '@circle-vibe/shared';

import { useConfirmation } from '@shared/hooks';

import { useNotification } from '@core/hooks';

import { useSendFile } from '@api/messages';

import { ComposedFileUploadResponse } from '../../types';

type Callback = (output: ComposedFileUploadResponse) => void;

export const useAfterUploadingAction = (callback: Callback, bucket: ConversationBucketNameEnum) => {
  const { uploadImage } = useSendFile();
  const notification = useNotification();
  const confirmation = useConfirmation();

  return useCallback(async (file: File) => {
    await confirmation('Are you sure you want to upload image?');

    try {
      const response = await uploadImage(file, bucket);

      notification({
        type: 'success',
        content: 'Avatar successfully uploaded',
      });

      if (!response) {
        return;
      }

      callback(response);
    } catch {
      notification({
        type: 'error',
        content: 'An error occurred while uploading image',
      });
    }
  }, []);
};
