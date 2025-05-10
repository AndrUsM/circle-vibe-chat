import { Link } from "react-router-dom";
import {
  ClusterLayout,
  StackLayout,
  Tooltip,
Icon,
  useIcons,
} from "@circle-vibe/shared";
import io from "socket.io-client";

import * as Resizer from "@column-resizer/react";

import {
  HorizontalDivider,
  TopbarLogo,
  Message,
  Chat,
  UserAvatar,
} from "@shared/components";

import { TopbarActions } from "./topbar-actions";

import "./conversation.scss";

export const Conversations: React.FC = () => {
  const socket = io("http://localhost:8080");
  socket.connect();

  const { cilSettings } = useIcons();

  return (
    <section className="h-full">
      <ClusterLayout
        className="p-2"
        alignItems="center"
        justifyContent="space-between"
        space="1rem"
      >
        <TopbarLogo />

        <ClusterLayout space="1.15rem">
          <UserAvatar fallback="US" />

          <Link to={"/settings"}>
            <Tooltip title="Settings">
              <Icon size={28} name={cilSettings} />
            </Tooltip>
          </Link>

          <TopbarActions />
        </ClusterLayout>
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
