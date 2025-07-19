import { useCallback, useMemo, useRef, useState } from "react";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import * as Resizer from "@column-resizer/react";

import { composeAvatarFallback, MessageFile } from "@circle-vibe/shared";
import {
  ClusterLayout,
  StackLayout,
  Tooltip,
  Icon,
  HorizontalDivider,
  useIcons,
  Form,
  FormControl,
  FormikFormControl,
  Show,
  FormSubmitButton,
  Button,
  FormControlTextarea,
  CenteredVertialLayout,
  LoadingOverlay,
  Input,
} from "@circle-vibe/components";

import {
  TopbarLogo,
  UserAvatar,
  Modal,
  PaginationControls,
  PaginationScrollButton,
} from "@shared/components";
import { useConfirmation } from "@shared/hooks";

import {
  MESSAGE_FORM_INITIAL_VALUE,
  MESSAGE_FORM_VALIDATION_SCHEMA,
  MessageFormValues,
  useDeleteMessage,
  usePreviewFileState,
  FilePreview,
  Message,
} from "@features/messages";
import {
  useConversationGateway,
  useInitialChatSelection,
  AccountSettings,
  Chat,
  ConversationForm,
  useScrollToBlockPosition,
} from "@features/conversation";

import { TopbarActions } from "./topbar-actions";

import "./conversation.scss";

export const Conversations: React.FC = () => {
  const { t } = useTranslation();
  const confirm = useConfirmation();
  const { cilSettings, cilFile } = useIcons();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onScrollToPosition = useScrollToBlockPosition();
  const messagesRef = useRef<HTMLDivElement>(null);
  const [openAccountSettings, setOpenAccountSettings] =
    useState<boolean>(false);
  const [openChatCreationModal, setOpenChatCreationModal] =
    useState<boolean>(false);
  const deleteMessage = useDeleteMessage();
  const { toggleFileDialogVisibility, previewFile } = usePreviewFileState();

  const onScrollMessages = () => {
    if (Boolean(messagesRef?.current?.scrollTop)) {
      return;
    }

    onScrollToPosition(messagesRef, "end", "end");
  };

  const {
    user,
    chatParticipant,
    selectedChatId,
    chats,
    messages,
    isAnyChatSelected,
    messagesPage,
    chatsPage,
    chatsLoading,
    messagesLoading,
    allowToPreselectChat,
    onChatSelect,
    triggerGetPaginatedMessages,
    triggerGetPaginatedChats,
    triggerSearchChatsByName,
    handleSendMessage,
  } = useConversationGateway(onScrollMessages);

  const debouncedChatSearch = useDebouncedCallback((value) => {
    triggerSearchChatsByName(value);
  }, 1000);

  const avatarFallback = composeAvatarFallback(user);
  const openFileSelectionDialog = useCallback((e: React.SyntheticEvent) => {
    fileInputRef.current?.click();
  }, []);
  const isSavedMessagesChat = useMemo(() => {
    const selectedChat = chats?.data.find(({ id }) => id === selectedChatId);

    return Boolean(selectedChat?.isSavedMessages);
  }, [chats, selectedChatId]);

  const onDeleteMessage = useCallback(
    async (messageId: number) => {
      await confirm("Are your sure you want to delete this message?", "danger");

      deleteMessage(Number(selectedChatId), messageId, messagesPage);
    },
    [selectedChatId, messagesPage]
  );
  const onUpdateMessage = useCallback(() => {}, []);

  useInitialChatSelection(
    chats?.data ?? [],
    onChatSelect,
    allowToPreselectChat
  );

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
          <Tooltip title={t("conversations.actions.account-settings")}>
            <UserAvatar
              className="cursor-pointer"
              fallback={avatarFallback}
              onClick={() => setOpenAccountSettings(true)}
            />
          </Tooltip>

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
          className="relative flex items-center justify-center w-full"
          minSize={100}
        >
          <StackLayout className="w-full p-3 overflow-y-auto">
            <StackLayout
              space="1rem"
              justifyContent="justify-between"
              className="flex-wrap"
            >
              <FormControl className="w-full">
                <Input
                  className="p-4 rounded-2"
                  placeholder={t("input.search.placeholder")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    debouncedChatSearch(String(e.target.value));
                  }}
                />
              </FormControl>

              <Button
                size="medium"
                className="w-full"
                onClick={setOpenChatCreationModal}
              >
                {t("button.actions.create")}
              </Button>
            </StackLayout>

            {chats?.data.map((chat) => (
              <Chat
                chat={chat}
                chatParticipant={chatParticipant}
                selected={selectedChatId === chat.id}
                onClick={() => onChatSelect(chat.id)}
                key={chat.id}
              />
            ))}

            <PaginationControls
              paginatedResponse={chats}
              currentPage={chatsPage}
              onPageChange={triggerGetPaginatedChats}
            />
          </StackLayout>

          <Show.When isTrue={chatsLoading}>
            <LoadingOverlay />
          </Show.When>
        </Resizer.Section>

        <Resizer.Bar
          size={7}
          className="transition bg-secondary cursor-resize"
        />

        <Resizer.Section
          className="relative flex items-center w-full"
          minSize={100}
        >
          <StackLayout justifyContent="end" className="w-full p-3">
            <StackLayout ref={messagesRef} className="overflow-y-auto">
              {messages?.data?.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  chatParticipantId={Number(chatParticipant?.id)}
                  isSavedMessages={isSavedMessagesChat}
                  onDeleteMessage={onDeleteMessage}
                  onUpdateMessage={onUpdateMessage}
                  onOpenFile={toggleFileDialogVisibility}
                />
              ))}
            </StackLayout>

            <CenteredVertialLayout
              space="0.5rem"
              justifyContent="space-between"
            >
              <PaginationControls
                paginatedResponse={messages}
                currentPage={messagesPage}
                onPageChange={triggerGetPaginatedMessages}
              />

              <PaginationScrollButton messagesRef={messagesRef} />
            </CenteredVertialLayout>

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

          <Show.When isTrue={messagesLoading}>
            <LoadingOverlay />
          </Show.When>
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
        <StackLayout>
          <section>
            <p className="text-2xl font-semibold">
              {t("conversations.buttons.create-conversation")}
            </p>

            <HorizontalDivider color="var(--cv-bg-secondary)" />
          </section>

          <ConversationForm />
        </StackLayout>
      </Modal>

      <Modal
        isOpen={Boolean(previewFile)}
        onClose={() => toggleFileDialogVisibility()}
      >
        <FilePreview
          messageFile={previewFile as MessageFile}
          onClose={toggleFileDialogVisibility}
        />
      </Modal>
    </section>
  );
};
