import classNames from "classnames";

import {
  ExtendedReactFunctionalComponent,
  Show,
  StackLayout,
} from "@circle-vibe/shared";
import { ChatModel, MessageModel } from "@core/enums";
import { Message } from "../message";

interface ChatProps {
  chat: ChatModel;
}

export const Chat: ExtendedReactFunctionalComponent<ChatProps> = ({ chat }) => {
  const { readableName, lastMessage, hasUnreadMessages, empty, updatedAt } = chat;
  return (
    <StackLayout
      space="0.5rem"
      className={classNames("p-2 rounded-2 bg-tertiary cursor-pointer", {
        "bg-warning": hasUnreadMessages,
        "bg-primary": empty,
      })}
    >
      <span className="block text-lg font-bold">{readableName}</span>

      <span>Last seen: {updatedAt}</span>

      <Show.When isTrue={Boolean(lastMessage)}>
        <Message message={lastMessage as MessageModel} />
      </Show.When>
    </StackLayout>
  );
};
