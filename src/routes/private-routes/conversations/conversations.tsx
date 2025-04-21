import { ClusterLayout, StackLayout } from "@circle-vibe/shared";

import * as Resizer from "@column-resizer/react";

import { SectionHeader, HorizontalDivider } from "@shared/components";
import { Message } from "@shared/components/message";
import { MESSAGES_MOCK } from "@shared/components/message/message-mock";

import "./conversation.scss";
import { CHATS_MOCK } from "@shared/components/chat/chat.mock-data";
import { Chat } from "@shared/components/chat/chat";

export const Conversations: React.FC = () => {
  return (
    <section className="h-full">
      <ClusterLayout>
        {/* <SectionHeader>Chat Name</SectionHeader> */}
        {/* <UserAvatar /> */}
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
            {CHATS_MOCK.map((chat) => (
              <Chat chat={chat} key={chat._id} />
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
            {MESSAGES_MOCK.map((message) => (
              <Message message={message} key={message.id} />
            ))}
          </StackLayout>
        </Resizer.Section>
      </Resizer.Container>
    </section>
  );
};
