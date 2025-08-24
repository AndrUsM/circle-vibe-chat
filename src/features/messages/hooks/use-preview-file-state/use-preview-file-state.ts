import { useMemo, useState } from 'react';

import { MessageFile } from '@circle-vibe/shared';

export const usePreviewFileState = () => {
  const [previewFile, setPreviewFile] = useState<MessageFile | null>(null);

  const toggleFileDialogVisibility = (file?: MessageFile) => {
    if (previewFile) {
      setPreviewFile(null);
      return;
    }

    setPreviewFile(file as MessageFile);
  };

  return useMemo(
    () => ({
      previewFile,
      toggleFileDialogVisibility,
    }),
    [toggleFileDialogVisibility, previewFile],
  );
};
