import React, { useCallback, useRef } from 'react';

import { MessageFile } from '@circle-vibe/shared';

import { Show } from '@circle-vibe/components';

import { VIDEO_MIME_TYPE } from '@shared/constants';

import { isVideoHasAudioTrack } from '@features/messages/utils';

interface VideoPreviewProps {
  videos: MessageFile[];
  isMuted?: boolean;
  onOpenFile: (file: MessageFile) => void;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  videos,
  isMuted = false,
  onOpenFile,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onMouseOver = useCallback(() => {
    if (!videoRef.current) {
      return;
    }

    if (isVideoHasAudioTrack(videoRef.current)) {
      videoRef.current.muted = isMuted;
    }

    videoRef.current.play();
  }, []);

  const onMouseLeave = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className='message-video rounded-2'
      width={320}
      height={240}
      controls
      muted
      onClick={(e) => {
        e.preventDefault();
        onOpenFile(videos[0]);
      }}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {videos?.map(({ description, id, optimizedUrl }) => (
        <React.Fragment key={id}>
          <source src={optimizedUrl} type={VIDEO_MIME_TYPE} />

          <Show.When isTrue={Boolean(description)}>
            <span className='white-space-pre-wrap message-description'>{description}</span>
          </Show.When>
        </React.Fragment>
      ))}
    </video>
  );
};
