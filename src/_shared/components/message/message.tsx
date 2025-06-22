import React, { useMemo } from "react";

import {
  CenteredVertialLayout,
  ExtendedReactFunctionalComponent,
  Show,
  StackLayout,
  MessageType,
  Message as MessageModel,
  MessageFileEntityType,
} from "@circle-vibe/shared";

import { getUserFullName } from "@shared/utils";
import { UserAvatar } from "../user-avatar/user-avatar";
import { getUserAvatarFallback } from "@shared/utils/get-user-avatar-fallback";

import './message.scss';

interface MessageProps {
  message: MessageModel;
}

export const Message: ExtendedReactFunctionalComponent<MessageProps> = ({
  message,
}) => {
  const { content, files, messageType, sender } = message;
  const avatarUrl = sender?.user.avatarUrl;
  const senderFullName = getUserFullName(sender?.user);
  const imageFallback = getUserAvatarFallback(sender?.user);

  const sortedByTypeFiles = useMemo(
    () => (files?? [])?.reduce((acc, file) => {
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
    }, {
      images: [] as typeof files,
      videos: [] as typeof files,
      files: [] as typeof files
    }),
    [files]
  );

  return (
    <StackLayout space="0.5rem" className="bg-tertiary rounded-1 p-2">
      <Show>
        <Show.When isTrue={Boolean(content)}>
          <div className="bg-light p-2 rounded-2">{content}</div>
        </Show.When>

        <Show.Else>
          <StackLayout>
            <Show.When isTrue={messageType === MessageType.VIDEO}>
              <video width={320} height={240} controls muted>
                {sortedByTypeFiles.videos?.map(({ description, type, url, id }) => (
                  <React.Fragment key={id}>
                    <source src={url} type={'video/3gpp'} />

                    <Show.When isTrue={Boolean(description)}>
                      <span>{description}</span>
                    </Show.When>
                  </React.Fragment>
                ))}
              </video>
            </Show.When>

            <Show.When isTrue={messageType === MessageType.IMAGE}>
              {/* @ts-ignore */}
              {sortedByTypeFiles.images?.map(({ description, optimizedUrl, fileName }) => (
                <img className="image-responsive message-image" src={optimizedUrl} key={fileName} alt={description} />
              ))}
            </Show.When>

            <Show.When isTrue={messageType === MessageType.FILE}>
              {sortedByTypeFiles.files?.map(({ description, url, fileName }) => (
                <a href={url} target="_blank" key={fileName} rel="noopener">
                  <StackLayout>
                    <span>{fileName}</span>

                    <Show.When isTrue={Boolean(description)}>
                      <span>{description}</span>
                    </Show.When>
                  </StackLayout>
                </a>
              ))}
            </Show.When>
          </StackLayout>
        </Show.Else>
      </Show>

      <Show.When isTrue={Boolean(sender)}>
        <CenteredVertialLayout space="0.5rem">
          <UserAvatar url={avatarUrl ?? undefined} fallback={imageFallback} />

          <div>{senderFullName}</div>
        </CenteredVertialLayout>
      </Show.When>
    </StackLayout>
  );
};
