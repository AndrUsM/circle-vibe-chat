import classNames from "classnames";
import { useTranslation } from "react-i18next";

import {
  ExtendedReactFunctionalComponent,
  Show,
  StackLayout,
  Chat as ChatModel,
  useFormatDatetime,
} from "@circle-vibe/shared";
import SharedEnums from "@circle-vibe/shared";

import { MessageShortPreview } from "../message-short-preview";

import "./chat.scss";

interface ChatProps {
  chat: ChatModel;
  selected: boolean;
  onClick: VoidFunction;
}

export const Chat: ExtendedReactFunctionalComponent<ChatProps> = ({
  chat,
  selected,
  onClick,
}) => {
  const { t } = useTranslation();
  const format = useFormatDatetime();
  const { readableName, isSavedMessages, lastMessage, hasUnreadMessages, empty, updatedAt } =
    chat;

  return (
    <StackLayout
      space="0.5rem"
      className={classNames("relative overflow-hidden chat p-2 rounded-2 cursor-pointer", {
        selected: selected,
        "bg-warning": hasUnreadMessages,
        "bg-tertiary": !hasUnreadMessages,
      })}
      onClick={onClick}
    >
      <span className="block text-lg font-bold">
        {readableName === "saved-messages" || isSavedMessages ? t(readableName) : readableName}
      </span>

      <span>Last seen: {format(updatedAt)}</span>

      <Show.When isTrue={Boolean(lastMessage) && !isSavedMessages}>
        <MessageShortPreview message={lastMessage as SharedEnums.Message} />
      </Show.When>

      <Show.When isTrue={Boolean(empty)}>
        <span>{t("chat.empty")}</span>
      </Show.When>
    </StackLayout>
  );
};
