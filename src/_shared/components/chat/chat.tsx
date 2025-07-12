import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Chat as ChatModel, ChatParticipant } from "@circle-vibe/shared";
import {
  ExtendedReactFunctionalComponent,
  Show,
  StackLayout,
  useFormatDatetime,
  ClusterLayout,
} from "@circle-vibe/components";
import SharedEnums from "@circle-vibe/shared";

import { MessageShortPreview } from "../message-short-preview";
import { ChatActions } from "./chat-actions";

import "./chat.scss";
import { useMemo } from "react";

interface ChatProps {
  chat: ChatModel;
  chatParticipant: ChatParticipant | null;
  selected: boolean;
  onClick: VoidFunction;
}

export const Chat: ExtendedReactFunctionalComponent<ChatProps> = ({
  chat,
  chatParticipant,
  selected,
  onClick,
}) => {
  const { t } = useTranslation();
  const format = useFormatDatetime();
  const {
    name,
    readableName,
    isSavedMessages,
    lastMessage,
    hasUnreadMessages,
    empty,
    updatedAt,
  } = chat;
  const savedMessagesName = useMemo(
    () =>
      readableName.includes("saved-messages") || isSavedMessages
        ? t(name)
        : name,
    [name, readableName]
  );

  return (
    <ClusterLayout
      space="0.5rem"
      justifyContent="space-between"
      alignItems="center"
      className={classNames(
        "relative overflow-hidden chat p-2 rounded-2 cursor-pointer",
        {
          selected: selected,
          "bg-warning": hasUnreadMessages,
          "bg-tertiary": !hasUnreadMessages,
        }
      )}
      onClick={onClick}
    >
      <StackLayout>
        <span className="block text-lg font-bold">{savedMessagesName}</span>

        <span>Last seen: {format(updatedAt)}</span>

        <Show.When isTrue={Boolean(lastMessage) && !isSavedMessages}>
          <MessageShortPreview message={lastMessage as SharedEnums.Message} />
        </Show.When>

        <Show.When isTrue={Boolean(empty)}>
          <span>{t("chat.empty")}</span>
        </Show.When>
      </StackLayout>

      <Show.When isTrue={Boolean(selected && chatParticipant)}>
        <ChatActions
          chat={chat}
          chatParticipant={chatParticipant as ChatParticipant}
        />
      </Show.When>
    </ClusterLayout>
  );
};
