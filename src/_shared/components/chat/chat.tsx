import classNames from "classnames";

import {
  ExtendedReactFunctionalComponent,
  Show,
  StackLayout,
  Chat as ChatModel,
} from "@circle-vibe/shared";
import SharedEnums from "@circle-vibe/shared";
import { Message } from "../message";
import { useFormatDatetime } from "@shared/hooks";

interface ChatProps {
  chat: ChatModel;
}

export const Chat: ExtendedReactFunctionalComponent<ChatProps> = ({ chat }) => {
  const format = useFormatDatetime();
  const { readableName, lastMessage, hasUnreadMessages, empty, updatedAt } =
    chat;

  return (
    <StackLayout
      space="0.5rem"
      className={classNames("p-2 rounded-2 bg-tertiary cursor-pointer", {
        "bg-warning": hasUnreadMessages,
        "bg-primary": empty,
      })}
    >
      <span className="block text-lg font-bold">{readableName}</span>

      <span>Last seen: {format(updatedAt)}</span>

      <Show.When isTrue={Boolean(lastMessage)}>
        <Message message={lastMessage as SharedEnums.Message} />
      </Show.When>
    </StackLayout>
  );
};
