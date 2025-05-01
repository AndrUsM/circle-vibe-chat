import React from "react";

import {
  CenteredVertialLayout,
  ExtendedReactFunctionalComponent,
  Show,
  StackLayout,
  MessageType,
  Message as MessageModel,
} from "@circle-vibe/shared";

import { getUserFullName } from "@shared/utils";
import { UserAvatar } from "../user-avatar/user-avatar";
import { getUserAvatarFallback } from "@shared/utils/get-user-avatar-fallback";

interface MessageProps {
  message: MessageModel;
}

export const Message: ExtendedReactFunctionalComponent<MessageProps> = ({
  message,
}) => {
  const { content, images, files, videos, messageType, sender } = message;
  const avatarUrl = sender?.avatar.url;
  const imageFallback = getUserAvatarFallback(sender);

  return (
    <StackLayout space="0.5rem" className="bg-tertiary rounded-1 p-2">
      <Show>
        <Show.When
          isTrue={messageType === MessageType.TEXT || Boolean(content)}
        >
          <div className="bg-light p-2 rounded-2">{content}</div>
        </Show.When>

        <Show.Else>
          <StackLayout>
            <Show.When isTrue={messageType === MessageType.VIDEO}>
              <video width={320} height={240} controls muted>
                {videos.map(({ description, type, url, id }) => (
                  <React.Fragment key={id}>
                    <source src={url} type={type} />

                    <Show.When isTrue={Boolean(description)}>
                      <span>{description}</span>
                    </Show.When>
                  </React.Fragment>
                ))}
              </video>
            </Show.When>

            <Show.When isTrue={messageType === MessageType.IMAGE}>
              {images.map(({ description, url, fileName }) => (
                <img src={url} key={fileName} alt={description} />
              ))}
            </Show.When>

            <Show.When isTrue={messageType === MessageType.FILE}>
              {files.map(({ description, url, fileName }) => (
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

          <div>{getUserFullName(sender)}</div>
        </CenteredVertialLayout>
      </Show.When>
    </StackLayout>
  );
};
