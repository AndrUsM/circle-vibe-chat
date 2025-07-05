import React, { useMemo } from "react";

import {
  CenteredVertialLayout,
  ExtendedReactFunctionalComponent,
  Show,
  StackLayout,
  MessageType,
  Message as MessageModel,
  MessageFileEntityType,
  MessageFile,
  getUserFullName,
  composeAvatarFallback
} from "@circle-vibe/shared";

import { UserAvatar } from "../user-avatar/user-avatar";

import "./message.scss";

interface MessageProps {
  message: MessageModel;
  isSavedMessages?: boolean;
}

export const Message: ExtendedReactFunctionalComponent<MessageProps> = ({
  message,
  isSavedMessages = false,
}) => {
  const { content, files, messageType, sender } = message;
  const avatarUrl = sender?.user?.avatarUrl;
  const senderFullName = getUserFullName(sender?.user);
  const imageFallback = composeAvatarFallback(sender?.user);
  const VIDEO_MIME_TYPE = "video/mp4";

  const sortedByTypeFiles = useMemo(
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
        }
      ),
    [files]
  );

  return (
    <StackLayout space="0.5rem" className="bg-tertiary rounded-1 p-2 rounded-2">
      <Show.When isTrue={Boolean(content) && !files?.length}>
        <div className="bg-light p-2 rounded-2 white-space-pre-wrap">
          {content}
        </div>
      </Show.When>

      <Show.When isTrue={Boolean(files?.length)}>
        <StackLayout>
          <Show.When isTrue={messageType === MessageType.VIDEO}>
            <div className="mx-auto">
              <video width={320} height={240} controls muted>
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
              ({ description, optimizedUrl, fileName, id }) => (
                <React.Fragment key={id}>
                  <div className="mx-auto">
                    <img
                      className="image-responsive message-image rounded-2"
                      src={optimizedUrl}
                      key={fileName}
                      alt={description}
                    />
                  </div>

                  <Show.When isTrue={Boolean(description)}>
                    <span className="white-space-pre-wrap message-description">
                      {description}
                    </span>
                  </Show.When>
                </React.Fragment>
              )
            )}
          </Show.When>

          <Show.When isTrue={messageType === MessageType.FILE}>
            {sortedByTypeFiles.files?.map(({ description, url, fileName }) => (
              <a href={url} target="_blank" key={fileName} rel="noopener">
                <StackLayout>
                  <span>{fileName}</span>

                  <Show.When isTrue={Boolean(description)}>
                    <span className="white-space-pre-wrap message-description">
                      {description}
                    </span>
                  </Show.When>
                </StackLayout>
              </a>
            ))}
          </Show.When>
        </StackLayout>
      </Show.When>

      <Show.When isTrue={Boolean(sender) && !isSavedMessages}>
        <CenteredVertialLayout space="0.5rem">
          <UserAvatar url={avatarUrl ?? undefined} fallback={imageFallback} />

          <div>{senderFullName}</div>
        </CenteredVertialLayout>
      </Show.When>
    </StackLayout>
  );
};
