import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { useBoolean } from '@circle-vibe/components';

import { useNotification } from '@core/hooks';

import { useReadFileForPreview } from '../use-read-file-for-preview';

type SetFieldValue = (field: string, value: any) => void;

export const useHandleFileUpload = () => {
  const [fileSource, setFileSource] = useState<string | undefined>(undefined);
  const { readFile, abortReadFile, readFileProgress, totalReadedMb, totalFileSize } =
    useReadFileForPreview();
  const notification = useNotification();
  const [fileLoadingForPreview, , setFileLoadingForPreview] = useBoolean(false);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, setFieldValue: SetFieldValue) => {
      const files = event?.currentTarget?.files;

      if (!files?.length) {
        return;
      }
      const file = files[0];
      const fileSizeInMb = file?.size / 1024 / 1024;

      if (fileSizeInMb > 1000) {
        setFileLoadingForPreview(false);

        notification({
          type: 'error',
          content: 'File size must be less than 1GB',
        });

        return;
      }

      if (file) {
        setFieldValue('file', file);
      }

      readFile(file)
        .then((result) => {
          setFileSource(String(result));
          setFileLoadingForPreview(false);
        })
        .catch(() => {
          setFileSource(undefined);
          setFileLoadingForPreview(false);
          notification({
            type: 'error',
            content: 'Failed to read file!',
          });
        });
    },
    [readFile, notification],
  );

  return useMemo(
    () => ({
      fileSource,
      fileLoadingForPreview,
      readFileProgress,
      totalReadedMb,
      totalFileSize,

      setFileLoadingForPreview,
      setFileSource,
      abortReadFile,
      handleFileChange,
    }),
    [fileSource, fileLoadingForPreview, readFileProgress, totalReadedMb, totalFileSize],
  );
};
