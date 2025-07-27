import React, { Suspense } from "react";

import {
  Button,
  CenteredVertialLayout,
  Icon,
  LoadingOverlay,
  Show,
  StackLayout,
  Tooltip,
  useIcons,
} from "@circle-vibe/components";
import { MessageFile, MessageType } from "@circle-vibe/shared";

import { useSortedByTypeFiles } from "@features/messages/hooks";

import { VideoPreview } from "../video-preview";

interface MessageFilesProps {
  onOpenFile: (file: MessageFile) => void;
  files: MessageFile[];
  messageType: MessageType;
}

export const MessageFiles: React.FC<MessageFilesProps> = ({
  files,
  messageType,
  onOpenFile,
}) => {
  const icons = useIcons();
  const sortedByTypeFiles = useSortedByTypeFiles(files);

  const onOpenFileForPreview = (messageFile: MessageFile) => {
    window.open(messageFile.url, "_blank");
  };

  return (
    <StackLayout>
      <Show.When isTrue={messageType === MessageType.VIDEO}>
        <div className="mx-auto">
          <VideoPreview
            videos={sortedByTypeFiles.videos}
            onOpenFile={onOpenFile}
          />
        </div>
      </Show.When>

      <Show.When isTrue={messageType === MessageType.IMAGE}>
        {sortedByTypeFiles.images?.map(
          ({ description, optimizedUrl, fileName, id }, messageFileIndex) => (
            <React.Fragment key={id}>
              <div className="mx-auto">
                <Suspense fallback={<LoadingOverlay />}>
                  <img
                    className="image-responsive message-image rounded-2"
                    src={optimizedUrl}
                    key={fileName}
                    alt={description}
                    loading="lazy"
                    onClick={() =>
                      onOpenFile(sortedByTypeFiles.images[messageFileIndex])
                    }
                  />
                </Suspense>
              </div>

              <Show.When isTrue={Boolean(description)}>
                <span className="white-space-pre-wrap message-description bg-light italic">
                  {description}
                </span>
              </Show.When>
            </React.Fragment>
          )
        )}
      </Show.When>

      <Show.When isTrue={messageType === MessageType.FILE}>
        {sortedByTypeFiles.files?.map(
          ({ description, url, fileName }, fileTypeIndex) => (
            <CenteredVertialLayout
              key={fileName}
              space="2rem"
              justifyContent="space-between"
              className="w-full"
            >
              <Tooltip title={"Open file"}>
                <span
                  onClick={() =>
                    onOpenFileForPreview(sortedByTypeFiles.files[fileTypeIndex])
                  }
                  className="text-link"
                >
                  {fileName}
                </span>
              </Tooltip>

              <Show.When isTrue={Boolean(description)}>
                <span className="white-space-pre-wrap message-description">
                  {description}
                </span>
              </Show.When>

              <a href={url} target="_blank" key={fileName} rel="noopener">
                <Button color="secondary" size="small">
                  <Icon
                    name={icons.cilCloudUpload}
                    color="var(--cv-light)"
                    size={14}
                  />
                </Button>
              </a>
            </CenteredVertialLayout>
          )
        )}
      </Show.When>
    </StackLayout>
  );
};
