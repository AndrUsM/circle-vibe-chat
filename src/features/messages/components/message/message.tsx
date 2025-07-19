import React, { Suspense, useCallback, useMemo } from "react";

import {
  MessageType,
  Message as MessageModel,
  getUserFullName,
  composeAvatarFallback,
  MessageFile,
  MessageFileEntityType,
} from "@circle-vibe/shared";
import {
  Button,
  CenteredVertialLayout,
  ClusterLayout,
  ExtendedReactFunctionalComponent,
  FormatDateTime,
  Icon,
  LoadingOverlay,
  Show,
  StackLayout,
  Tooltip,
  useFormatDatetime,
  useIcons,
} from "@circle-vibe/components";
import { useSortedByTypeFiles } from "@features/messages";

import { UserAvatar } from "../../../../_shared/components/user-avatar/user-avatar";

import "./message.scss";

interface MessageProps {
  message: MessageModel;
  chatParticipantId: number;
  isSavedMessages?: boolean;
  onDeleteMessage: (messageId: number) => void;
  onUpdateMessage: (messageId: number) => void;
  onOpenFile: (file: MessageFile) => void;
}

export const Message: ExtendedReactFunctionalComponent<MessageProps> = ({
  message,
  chatParticipantId,
  isSavedMessages = false,
  onDeleteMessage,
  onUpdateMessage,
  onOpenFile,
}) => {
  const messageFileLimit = 500;
  const [contentSplitNumber, setContentSplitNumber] =
    React.useState(messageFileLimit);
  const { content, files, messageType, sender, updatedAt } = message;
  const avatarUrl = sender?.user?.avatarUrl;
  const icons = useIcons();
  const formatDateTime = useFormatDatetime();
  const senderFullName = getUserFullName(sender?.user);
  const imageFallback = composeAvatarFallback(sender?.user);
  const VIDEO_MIME_TYPE = "video/mp4";

  const isContentTooLong = useMemo(
    () => content.length > messageFileLimit,
    [content, contentSplitNumber]
  );
  const messageContent = useMemo(() => {
    return content.length < contentSplitNumber
      ? content
      : `${content.slice(0, contentSplitNumber)}...`;
  }, [content, contentSplitNumber]);

  const sortedByTypeFiles = useSortedByTypeFiles(files);
  const toggleIconIcon = useMemo(
    () =>
      contentSplitNumber === messageFileLimit
        ? icons.cilExpandDown
        : icons.cilExpandUp,
    [contentSplitNumber, icons.cilExpandDown, icons.cilExpandUp]
  );
  const toggleOfTooLongMessage = useCallback(() => {
    const updatedLimit =
      contentSplitNumber === messageFileLimit
        ? content.length
        : messageFileLimit;
    setContentSplitNumber(updatedLimit);
  }, [contentSplitNumber, messageFileLimit, content.length]);
  const onOpenFileForPreview = useCallback((messageFile: MessageFile) => {
    window.open(messageFile.url, "_blank");
  }, []);

  return (
    <StackLayout space="0.5rem" className="bg-tertiary rounded-1 p-2 rounded-2">
      <Show.When isTrue={Boolean(content) && !files?.length}>
        <StackLayout space="0.5rem" justifyContent="space-between">
          <div className="bg-light p-2 rounded-2 white-space-pre-wrap">
            {messageContent}
          </div>

          <Show.When isTrue={isContentTooLong}>
            <Button color="primary" onClick={toggleOfTooLongMessage}>
              <Icon name={toggleIconIcon} size={16} color="white" />
            </Button>
          </Show.When>
        </StackLayout>
      </Show.When>

      <Show.When isTrue={Boolean(files?.length)}>
        <StackLayout>
          <Show.When isTrue={messageType === MessageType.VIDEO}>
            <div className="mx-auto">
              <video
                width={320}
                height={240}
                controls
                muted
                onClick={(e) => {
                  e.preventDefault();
                  onOpenFile(sortedByTypeFiles.videos[0]);
                }}
              >
                {sortedByTypeFiles.videos?.map(({ description, url, id }) => (
                  <React.Fragment key={id}>
                    <source src={url} type={VIDEO_MIME_TYPE} />

                    <Show.When isTrue={Boolean(description)}>
                      <span className="white-space-pre-wrap message-description">
                        {description}
                      </span>
                    </Show.When>
                  </React.Fragment>
                ))}
              </video>
            </div>
          </Show.When>

          <Show.When isTrue={messageType === MessageType.IMAGE}>
            {sortedByTypeFiles.images?.map(
              (
                { description, optimizedUrl, fileName, id },
                messageFileIndex
              ) => (
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
      </Show.When>

      <ClusterLayout
        space="0.5rem"
        alignItems="center"
        justifyContent="space-between"
        className="flex-wrap"
      >
        <ClusterLayout space="0.5rem" alignItems="center">
          <Show.When isTrue={Boolean(sender) && !isSavedMessages}>
            <UserAvatar url={avatarUrl ?? undefined} fallback={imageFallback} />

            <div className="italic">{senderFullName}</div>
          </Show.When>
          <div>{formatDateTime(updatedAt, FormatDateTime.DATE_TIME)}</div>
        </ClusterLayout>

        <Show.When isTrue={isSavedMessages || sender.id === chatParticipantId}>
          <ClusterLayout space="0.5rem">
            <Show.When isTrue={message.messageType === MessageType.TEXT}>
              <Button
                color="secondary"
                size="small"
                onClick={() => onUpdateMessage(message.id)}
              >
                <Icon color="var(--cv-light)" name={icons.cilPen} size={14} />
              </Button>
            </Show.When>

            <Button
              color="secondary"
              size="small"
              onClick={() => onDeleteMessage(message.id)}
            >
              <Icon color="var(--cv-light)" name={icons.cilDelete} size={14} />
            </Button>
          </ClusterLayout>
        </Show.When>
      </ClusterLayout>
    </StackLayout>
  );
};
