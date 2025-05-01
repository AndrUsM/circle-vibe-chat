import { ClusterLayout, StackLayout } from "@circle-vibe/shared";
import io from "socket.io-client";

import * as Resizer from "@column-resizer/react";

import { SectionHeader, HorizontalDivider } from "@shared/components";
import { Message } from "@shared/components/message";
import { MESSAGES_MOCK } from "@shared/components/message/message-mock";

import "./conversation.scss";
import { Chat } from "@shared/components/chat/chat";
import { UserAvatar } from "@shared/components/user-avatar";
import { UserActions } from "./topbar-user-actions/topbar-user-actions";

export const Conversations: React.FC = () => {
  const socket = io("http://localhost:8080");
  socket.connect();

  return (
    <section className="h-full">
      <ClusterLayout className="p-2">
        <UserAvatar fallback="US" />
        <UserActions />
        {/* <Actions */}
        {/* <Settings */}
      </ClusterLayout>

      <HorizontalDivider height="5px" />

      <Resizer.Container className="conversations">
        <Resizer.Section
          className="flex items-center justify-center w-full"
          minSize={100}
        >
          <StackLayout className="w-full p-3 overflow-y-auto">
            {[].map((chat) => (
              <Chat chat={chat} key={chat} />
            ))}
          </StackLayout>
        </Resizer.Section>

        <Resizer.Bar
          size={7}
          className="transition bg-secondary cursor-resize"
        />

        <Resizer.Section
          className="flex items-center justify-center w-full"
          minSize={100}
        >
          <StackLayout className="w-full p-3 overflow-y-auto">
            {[].map((message) => (
              <Message message={message} key={message} />
            ))}
          </StackLayout>
        </Resizer.Section>
      </Resizer.Container>
    </section>
  );
};
