import { useCallback, useMemo, useRef, useState } from "react";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ChatSocketCommand, composeAvatarFallback } from "@circle-vibe/shared";
import {
  ClusterLayout,
  StackLayout,
  Tooltip,
  Icon,
  HorizontalDivider,
  useIcons,
  Form,
  FormControlInput,
  FormControl,
  FormikFormControl,
  Show,
  FormSubmitButton,
  Button,
  FormControlTextarea,
  CenteredVertialLayout,
} from "@circle-vibe/components";
import * as Resizer from "@column-resizer/react";

import {
  MESSAGE_FORM_INITIAL_VALUE,
  MESSAGE_FORM_VALIDATION_SCHEMA,
  MessageFormValues,
  useSendMessage,
} from "@features/messages";
import {
  useConversationGateway,
  useInitialChatSelection,
} from "@features/conversation";

import { useSocket } from "@core/hooks";
import {
  TopbarLogo,
  Message,
  UserAvatar,
  Chat,
  Modal,
} from "@shared/components";
import {
  AccountSettings,
  ConversationForm,
} from "@features/conversation/components";
import { useScrollToBlockPosition } from "@features/conversation/hooks";

import { TopbarActions } from "./topbar-actions";

import "./conversation.scss";

export const Conversations: React.FC = () => {
  const { t } = useTranslation();
  const { socket } = useSocket();
  const { cilSettings, cilFile } = useIcons();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onScrollToPosition = useScrollToBlockPosition();
  const messagesRef = useRef<HTMLDivElement>(null);
  const onScrollMessages = () => {
    if (Boolean(messagesRef?.current?.scrollTop)){
      return;
    }

    onScrollToPosition(messagesRef, "end", "end");
  };
  const {
    user,
    chatParticipant,
    selectedChatId,
    setSelectedChatId,
    chats,
    messages,
    isAnyChatSelected,
  } = useConversationGateway(onScrollMessages);

  const allowToPreselectChat = Boolean(selectedChatId || chatParticipant);

  const handleJoinChat = (chatId: number) => {
    if (selectedChatId === chatId) {
      return;
    }

    setSelectedChatId(chatId);
    socket.emit(ChatSocketCommand.JOIN_CHAT, { chatId });
  };

  const [openAccountSettings, setOpenAccountSettings] =
    useState<boolean>(false);
  const [openChatCreationModal, setOpenChatCreationModal] =
    useState<boolean>(false);
  const handleSendMessage = useSendMessage(chatParticipant, selectedChatId);
  const avatarFallback = composeAvatarFallback(user);
  const openFileSelectionDialog = useCallback((e: React.SyntheticEvent) => {
    fileInputRef.current?.click();
  }, []);
  const isSavedMessagesChat = useMemo(() => {
    const selectedChat = chats.find(({ id }) => id === selectedChatId);

    return Boolean(selectedChat?.isSavedMessages);
  }, [chats, selectedChatId]);

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
          <UserAvatar
            fallback={avatarFallback}
            onClick={() => setOpenAccountSettings(true)}
          />

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
            <CenteredVertialLayout
              space="1rem"
              justifyContent="justify-between"
            >
              <FormControl className="w-full">
                <FormControlInput
                  className="p-4 rounded-2"
                  placeholder="Search..."
                />
              </FormControl>

              <Button size="medium" onClick={setOpenChatCreationModal}>
                Create
              </Button>
            </CenteredVertialLayout>

            {chats.map((chat) => (
              <Chat
                chat={chat}
                chatParticipant={chatParticipant}
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

        <Resizer.Section className="flex items-center w-full" minSize={100}>
          <StackLayout justifyContent="end" className="w-full p-3">
            <StackLayout ref={messagesRef} className="overflow-y-auto">
              {messages.map((message) => (
                <Message
                  message={message}
                  isSavedMessages={isSavedMessagesChat}
                  key={message.id}
                />
              ))}
            </StackLayout>

            <Show.When isTrue={isAnyChatSelected}>
              <Form
                enableReinitialize={false}
                onSubmit={handleSendMessage}
                validationSchema={MESSAGE_FORM_VALIDATION_SCHEMA}
                initialValues={MESSAGE_FORM_INITIAL_VALUE}
              >
                {({ setFieldValue }: FormikProps<MessageFormValues>) => (
                  <ClusterLayout space="0.5rem" alignItems="flex-start">
                    <FormikFormControl
                      formFieldName="content"
                      className="w-full"
                    >
                      <FormControlTextarea
                        className="resize-vertical min-h-10 p-3"
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
                  </ClusterLayout>
                )}
              </Form>
            </Show.When>
          </StackLayout>
        </Resizer.Section>
      </Resizer.Container>

      <Modal
        isOpen={openAccountSettings}
        onClose={() => setOpenAccountSettings(false)}
      >
        <AccountSettings />
      </Modal>

      <Modal
        isOpen={openChatCreationModal}
        onClose={() => setOpenChatCreationModal(false)}
      >
        <ConversationForm />
      </Modal>
    </section>
  );
};
