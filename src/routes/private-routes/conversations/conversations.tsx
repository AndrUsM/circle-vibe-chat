import { ClusterLayout } from "@circle-vibe/shared";

import * as Resizer from "@column-resizer/react";

import { SectionHeader, HorizontalDivider } from "@shared/components";

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

      <Resizer.Container className="h-full">
        <Resizer.Section
          className="flex items-center justify-center w-full"
          minSize={100}
        >
          <section className="flex-auto">
            <ClusterLayout space="1rem">
              {/* Chats */}
            </ClusterLayout>
          </section>
        </Resizer.Section>
        <Resizer.Bar
          size={7}
          className="transition bg-secondary cursor-resize"
        />

        <Resizer.Section
          className="flex items-center justify-center"
          minSize={100}
        >
          {/* Messages */}
        </Resizer.Section>
      </Resizer.Container>
    </section>
  );
};
