import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ClusterLayout,
  StackLayout,
  Tooltip,
  Icon,
  HorizontalDivider,
  useIcons,
  ChatSocketCommand,
  Form,
  FormControlInput,
  FormControl,
  FormikFormControl,
  Show,
  CenteredVertialLayout,
  FormSubmitButton,
  Button,
} from "@circle-vibe/shared";
import * as Resizer from "@column-resizer/react";

import {
  MESSAGE_FORM_INITIAL_VALUE,
  MESSAGE_FORM_VALIDATION_SCHEMA,
  MessageFormValues,
  composeAvatarFallback,
  useSendMessage,
} from "@features/messages";
import {
  useConversationGateway,
  useInitialChatSelection,
} from "@features/conversation";

import { useNotification, useSocket } from "@core/hooks";
import { TopbarLogo, Message, UserAvatar, Chat } from "@shared/components";

import { TopbarActions } from "./topbar-actions";

import "./conversation.scss";
import { useCallback, useRef } from "react";
import { Field, Formik, FormikHelpers } from "formik";

export const Conversations: React.FC = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const notification = useNotification();
  const { socket } = useSocket();
  const { cilSettings, cilFile } = useIcons();
  const {
    user,
    chatParticipant,
    selectedChatId,
    setSelectedChatId,
    chats,
    messages,
    isAnyChatSelected,
  } = useConversationGateway();

  const allowToPreselectChat = Boolean(selectedChatId || chatParticipant);

  const handleJoinChat = (chatId: number) => {
    setSelectedChatId(chatId);
    socket.emit(ChatSocketCommand.JOIN_CHAT, { chatId });
  };

  const handleSendMessage = useSendMessage(chatParticipant, selectedChatId);
  const avatarFallback = composeAvatarFallback(user);
  const openFileSelectionDialog = useCallback((e: React.SyntheticEvent) => {
    fileInputRef.current?.click();
  }, []);

  useInitialChatSelection(chats, handleJoinChat, allowToPreselectChat);

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
          <UserAvatar fallback={avatarFallback} />

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
                enableReinitialize={false}
                onSubmit={handleSendMessage}
                validationSchema={MESSAGE_FORM_VALIDATION_SCHEMA}
                initialValues={MESSAGE_FORM_INITIAL_VALUE}
              >
                {({ setFieldValue }: FormikHelpers<MessageFormValues>) => (
                  <CenteredVertialLayout space="0.5rem">
                    <FormikFormControl
                      formFieldName="content"
                      className="w-full"
                    >
                      <FormControlInput
                        className="p-3 rounded-1"
                        placeholder={t("conversations.send.input.placeholder")}
                      />
                    </FormikFormControl>

                    <Button type="button" onClick={openFileSelectionDialog}>
                      <Icon size={18} color="var(--cv-light)" name={cilFile} />

                      <input
                        type="file"
                        ref={fileInputRef}
                        hidden
                        onChange={(event) => {
                          event.currentTarget.files &&
                            setFieldValue("file", event.currentTarget.files[0]);
                        }}
                      />
                    </Button>

                    <FormSubmitButton color="primary" size="large">
                      {t("conversations.send.button")}
                    </FormSubmitButton>
                  </CenteredVertialLayout>
                )}
              </Form>
            </Show.When>
          </StackLayout>
        </Resizer.Section>
      </Resizer.Container>
    </section>
  );
};
