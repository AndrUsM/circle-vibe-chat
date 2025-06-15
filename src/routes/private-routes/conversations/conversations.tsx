import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ClusterLayout,
  StackLayout,
  Tooltip,
  Icon,
  HorizontalDivider,
  Chat as ChatModel,
  useIcons,
  ChatSocketCommand,
  Message as MessageModel,
  Input,
  Form,
  FormControlInput,
  FormControl,
  FormikFormControl,
  Show,
  Button,
  CenteredVertialLayout,
  MessageStatus,
  MessageType,
  SubmitButton,
  FormSubmitButton,
} from "@circle-vibe/shared";
import * as Resizer from "@column-resizer/react";

import { TopbarLogo, Message, UserAvatar, Chat } from "@shared/components";

import { TopbarActions } from "./topbar-actions";

import "./conversation.scss";
import { useCurrentUser, useSocket } from "@core/hooks";
import { object, string } from "yup";

export const Conversations: React.FC = () => {
  const { cilSettings } = useIcons();
  const {user} = useCurrentUser();
  const { socket } = useSocket();
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [chats, setChats] = useState<ChatModel[]>([]);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const isAnyChatSelected = Boolean(selectedChatId);
  const MESSAGE_FORM_VALIDATION_SCHEMA = object({
    message: string().required(),
  });
  const MESSAGE_FORM_INITIAL_VALUE = {
    message: "",
  };

  useEffect(() => {
    socket.emit(ChatSocketCommand.REFRESH_CHATS);
  }, []);

  socket.on(ChatSocketCommand.REFRESH_CHATS, (chats) => {
    setChats(chats);
  });

  socket.on(ChatSocketCommand.RECEIVE_MESSAGES, (messages) => {
    console.log(messages);
    setMessages(messages);
  });

  const handleJoinChat = (chatId: number) => {
    setSelectedChatId(chatId);
    socket.emit(ChatSocketCommand.JOIN_CHAT, { chatId });
  };

  const handleSendMessage = ({ message: content }: { message: string }) => {
    const messageDto = {
      content,
      chatId: selectedChatId,
      senderId: user.id,
      threadId: null,
      hidden: false,
      messageType: MessageType.TEXT,
      files: [],
    };

    socket.emit(ChatSocketCommand.SEND_MESSAGE, {
      message: messageDto,
      chatId: selectedChatId,
    });
  };

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
            <FormControl>
              <FormControlInput
                className="p-4 rounded-2"
                placeholder="Search..."
              />
            </FormControl>

            {chats.map((chat) => (
              <Chat
                chat={chat}
                selected={selectedChatId === chat.id}
                onClick={() => handleJoinChat(chat.id)}
                key={chat.id}
              />
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
          <StackLayout
            justifyContent="end"
            className="w-full p-3 overflow-y-auto"
          >
            {messages.map((message) => (
              <Message message={message} key={message.id} />
            ))}

            <Show.When isTrue={isAnyChatSelected}>
              <Form
                onSubmit={handleSendMessage}
                validationSchema={MESSAGE_FORM_VALIDATION_SCHEMA}
                initialValues={MESSAGE_FORM_INITIAL_VALUE}
              >
                <CenteredVertialLayout space="0.5rem">
                  <FormikFormControl formFieldName="message" className="w-full">
                    <FormControlInput
                      className="p-3 rounded-1"
                      placeholder="Type your message..."
                    />
                  </FormikFormControl>

                  <FormSubmitButton color="primary" size="large">
                    Send
                  </FormSubmitButton>
                </CenteredVertialLayout>
              </Form>
            </Show.When>
          </StackLayout>
        </Resizer.Section>
      </Resizer.Container>
    </section>
  );
};
