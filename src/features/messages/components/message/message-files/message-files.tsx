import React, { Suspense } from 'react';

import { MessageFile, MessageType } from '@circle-vibe/shared';

import {
  Button,
  CenteredVertialLayout,
  Icon,
  LoadingOverlay,
  Show,
  StackLayout,
  Tooltip,
  useIcons,
} from '@circle-vibe/components';

import {
  useSortedByTypeFiles,
  openFileForPreview,
  NATIVE_BROWSER_EXTENSIONS_REGEXP,
} from '@features/messages';

import { VideoPreview } from '../video-preview';

interface MessageFilesProps {
  onOpenFile: (file: MessageFile) => void;
  files: MessageFile[];
  messageType: MessageType;
}

export const MessageFiles: React.FC<MessageFilesProps> = ({ files, messageType, onOpenFile }) => {
  const icons = useIcons();
  const sortedByTypeFiles = useSortedByTypeFiles(files);
  const isNativeBrowserPreview = (file: string) => {
    const extension = file.split('.').pop();

    return extension ? NATIVE_BROWSER_EXTENSIONS_REGEXP.test(extension) : false;
  };

  return (
    <StackLayout>
      <Show.When isTrue={messageType === MessageType.VIDEO}>
        <div className='mx-auto'>
          <VideoPreview videos={sortedByTypeFiles.videos} onOpenFile={onOpenFile} />
        </div>
      </Show.When>

      <Show.When isTrue={messageType === MessageType.IMAGE}>
        {sortedByTypeFiles.images?.map(
          ({ description, optimizedUrl, fileName, id }, messageFileIndex) => (
            <React.Fragment key={id}>
              <div className='mx-auto'>
                <Suspense fallback={<LoadingOverlay />}>
                  <img
                    className='image-responsive image-rendering-pixelated message-image rounded-2'
                    src={optimizedUrl}
                    key={fileName}
                    alt={description}
                    loading='lazy'
                    onClick={() => onOpenFile(sortedByTypeFiles.images[messageFileIndex])}
                  />
                </Suspense>
              </div>

              <Show.When isTrue={Boolean(description)}>
                <span className='white-space-pre-wrap message-description bg-light italic'>
                  {description}
                </span>
              </Show.When>
            </React.Fragment>
          ),
        )}
      </Show.When>

      <Show.When isTrue={messageType === MessageType.AUDIO}>
        {sortedByTypeFiles.audios?.map(({ description, optimizedUrl, fileName }, fileTypeIndex) => (
          <React.Fragment key={`audio-${fileName}-${fileTypeIndex}`}>
            <div className='ml-auto'>
              <Suspense fallback={<LoadingOverlay />}>
                <StackLayout
                  space='0.5rem'
                  justifyContent='space-between'
                  className='w-full'
                >
                  <audio src={optimizedUrl} controls className='w-full min-w-20'></audio>

                  <a href={optimizedUrl} target='_blank' rel='noopener noreferrer' className='rounded-4 bg-light text-link italic truncate text-xs p-2'>{fileName}</a>
                </StackLayout>
              </Suspense>
            </div>

            <Show.When isTrue={Boolean(description)}>
              <span className='white-space-pre-wrap message-description bg-light italic'>
                {description}
              </span>
            </Show.When>
          </React.Fragment>
        ))}
      </Show.When>

      <Show.When isTrue={messageType === MessageType.FILE}>
        {sortedByTypeFiles.files?.map(({ description, url, fileName }, fileTypeIndex) => (
          <CenteredVertialLayout
            key={fileName}
            space='2rem'
            justifyContent='space-between'
            className='w-full'
          >
            <Tooltip title={'Open file'}>
              <span
                onClick={() => {
                  if (!isNativeBrowserPreview(fileName)) {
                    openFileForPreview(sortedByTypeFiles.files[fileTypeIndex]);
                    return;
                  }

                  onOpenFile(sortedByTypeFiles.files[fileTypeIndex]);
                }}
                className='text-link'
              >
                {fileName}
              </span>
            </Tooltip>

            <Show.When isTrue={Boolean(description)}>
              <span className='white-space-pre-wrap message-description'>{description}</span>
            </Show.When>

            <a href={url} target='_blank' key={fileName} rel='noopener'>
              <Button color='secondary' size='small'>
                <Icon name={icons.cilCloudUpload} color='var(--cv-light)' size={14} />
              </Button>
            </a>
          </CenteredVertialLayout>
        ))}
      </Show.When>
    </StackLayout>
  );
};
