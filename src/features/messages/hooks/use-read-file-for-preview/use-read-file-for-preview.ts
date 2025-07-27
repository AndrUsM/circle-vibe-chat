import { useMemo, useState } from "react";

export const useReadFileForPreview = () => {
  const [fileReader, setFileReader] = useState<FileReader | null>(null);
  const [progress, setProgress] = useState(0);
  const [totalReadedMb, setTotalReadedMb] = useState(0);
  const [totalFileSize, setTotalFileSize] = useState(0);

  const abortReadFile = () => {
    fileReader?.abort();
    setProgress(0);
    setTotalReadedMb(0);
    setTotalFileSize(0);

    setFileReader(null);
  }

  const clearState = () => {
    setFileReader(null);
    setProgress(0);
    setTotalReadedMb(0);
    setTotalFileSize(0);
  }

  const readFile = async (file: File) => {
    if (!file) {
    }

    const reader = new FileReader();
    setFileReader(reader);

    return new Promise((resolve, reject) => {
      if (!file) {
        reject();

        return;
      }

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentLoaded = Math.round((event.loaded / event.total) * 100);
          setProgress(percentLoaded);
          setTotalReadedMb(event.loaded / 1024 / 1024);
          setTotalFileSize(event.total / 1024 / 1024);
        }
      };

      reader.onload = () => {
        resolve(reader.result);
        clearState();
      };
      reader.readAsDataURL(file);
    });
  };

  return useMemo(
    () => ({
      readFile,
      abortReadFile,
      readFileProgress: progress,
      totalReadedMb,
      totalFileSize
    }),
    [totalFileSize, totalReadedMb, progress]
  );
};
