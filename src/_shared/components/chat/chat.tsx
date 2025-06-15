import classNames from "classnames";

import {
  ExtendedReactFunctionalComponent,
  Show,
  StackLayout,
  Chat as ChatModel,
  useFormatDatetime,
} from "@circle-vibe/shared";
import SharedEnums from "@circle-vibe/shared";
import { Message } from "../message";
import { useTranslation } from "react-i18next";

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
  const { readableName, lastMessage, hasUnreadMessages, empty, updatedAt } =
    chat;

  return (
    <StackLayout
      space="0.5rem"
      className={classNames("relative overflow-hidden chat p-2 rounded-2 cursor-pointer", {
        selected: selected,
        "bg-warning": hasUnreadMessages,
        "bg-tertiary": !hasUnreadMessages,
      })}
    >
      <span className="block text-lg font-bold" onClick={onClick}>
        {/* add flag on BE */}
        {readableName === "saved-messages" ? t(readableName) : readableName}
      </span>

      <span>Last seen: {format(updatedAt)}</span>

      <Show.When isTrue={Boolean(lastMessage)}>
        <Message message={lastMessage as SharedEnums.Message} />
      </Show.When>

      <Show.When isTrue={Boolean(empty)}>
        <span>{t("chat.empty")}</span>
      </Show.When>
    </StackLayout>
  );
};
