import { useMemo } from 'react';

import { MessageFile, MessageFileEntityType } from '@circle-vibe/shared';

export const useSortedByTypeFiles = (files: MessageFile[]) => {
  return useMemo(
    () =>
      (files ?? [])?.reduce(
        (acc, file) => {
          if (file.entityType === MessageFileEntityType.IMAGE) {
            acc.images.push(file);

            return acc;
          }

          if (file.entityType === MessageFileEntityType.VIDEO) {
            acc.videos.push(file);

            return acc;
          }

          acc.files.push(file);

          return acc;
        },
        {
          images: [] as MessageFile[],
          videos: [] as typeof files,
          files: [] as typeof files,
        },
      ),
    [files],
  );
};
