import { useMemo } from 'react';

import { MessageFile, MessageFileEntityType } from '@circle-vibe/shared';

export const useSortedByTypeFiles = (files: MessageFile[]) => {
  return useMemo(
    () =>
      (files ?? [])?.reduce(
        (acc, file) => {
          console.log(file.entityType)
          if (file.entityType === MessageFileEntityType.IMAGE) {
            acc.images.push(file);

            return acc;
          }

          if (file.entityType === MessageFileEntityType.VIDEO) {
            acc.videos.push(file);

            return acc;
          }

          if (file.entityType === MessageFileEntityType.AUDIO) {
            acc.audios.push(file);

            return acc;
          }

          acc.files.push(file);

          return acc;
        },
        {
          images: [] as typeof files,
          videos: [] as typeof files,
          files: [] as typeof files,
          audios: [] as typeof files,
        },
      ),
    [files],
  );
};
