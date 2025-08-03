import { Suspense, useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import * as Resizer from "@column-resizer/react";
import { useDebouncedCallback } from "use-debounce";

import {
  StackLayout,
  HorizontalDivider,
  useIcons,
  FormControl,
  Show,
  Button,
  CenteredVertialLayout,
  LoadingOverlay,
  Input,
  Modal,
  useBoolean,
  Icon,
} from "@circle-vibe/components";

import { useDeleteMessage } from "@api/messages";
import { PaginationControls, PaginationScrollButton } from "@shared/components";
import { useConfirmation, useScrollToBlockPosition } from "@shared/hooks";

import {
  usePreviewFileState,
  Message,
  useUpdateMessageState,
  MessageUpdateDialog,
  MessageUpdateFormValues,
  MessageForm,
} from "@features/messages";
import {
  useConversationGateway,
  useInitialChatSelection,
  Chat,
} from "@features/conversation";

import { ConversationModals } from "./conversation-modals";

import "./conversation.scss";

export const Conversations: React.FC = () => {
  const { t } = useTranslation();
  const confirm = useConfirmation();
  const { cilKeyboard } = useIcons();
  const onScrollToPosition = useScrollToBlockPosition();
  const deleteMessage = useDeleteMessage();
  const messagesRef = useRef<HTMLDivElement>(null);

  const [
    openChatCreationModal,
    toggleOpenChatCreationModal,
    setOpenChatCreationModal,
  ] = useBoolean(false);
  const { toggleFileDialogVisibility, previewFile } = usePreviewFileState();
  const {
    openMessageUpdateDialog,
    onCloseMessageUpdateDialog,
    onOpenMessageUpdateDialog,
    messageUpdateDialogState,
  } = useUpdateMessageState();

  const onScrollMessages = () => {
    if (Boolean(messagesRef?.current?.scrollTop)) {
      return;
    }

    onScrollToPosition(messagesRef, "end", "end");
  };

  const {
    allowToPreselectChat,
    chats,
    chatParticipant,
    chatsPage,
    chatsLoading,
    isAnyChatSelected,
    messages,
    messagesPage,
    messagesLoading,
    selectedChatId,
    user,
    isAnyoneTyping,
    triggerStartTypingNotification,
    triggerStopTypingNotification,
    handleRefreshMessages,
    handleSendMessageWithThread,
    onChatSelect,
    triggerGetPaginatedMessages,
    triggerGetPaginatedChats,
    triggerSearchChatsByName,
    handleSendMessage,
  } = useConversationGateway(onScrollMessages);

  const debouncedChatSearch = useDebouncedCallback((value) => {
    triggerSearchChatsByName(value);
  }, 1000);

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
  const onUpdateMessage = useCallback(
    (messageId: number) => {
      onOpenMessageUpdateDialog({
        chatId: Number(selectedChatId),
        messageId,
      });
    },
    [selectedChatId]
  );

  useInitialChatSelection(
    chats?.data ?? [],
    onChatSelect,
    allowToPreselectChat
  );

  return (
    <>
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
                onClick={toggleOpenChatCreationModal}
              >
                {t("button.actions.create")}
              </Button>
            </StackLayout>

            {chats?.data.map((chat) => (
              <Chat
                key={chat.id}
                chat={chat}
                chatParticipant={chatParticipant}
                selected={selectedChatId === chat.id}
                onClick={() => onChatSelect(chat.id)}
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
              {(messages?.data ?? [])?.map((message) => (
                <Suspense key={message.id} fallback={<LoadingOverlay />}>
                  <Message
                    message={message}
                    isSavedMessages={isSavedMessagesChat}
                    onStopTyping={triggerStopTypingNotification}
                    onStartTyping={triggerStartTypingNotification}
                    chatParticipantId={Number(chatParticipant?.id)}
                    onDeleteMessage={onDeleteMessage}
                    onUpdateMessage={onUpdateMessage}
                    onOpenFile={toggleFileDialogVisibility}
                    onReplyMessage={handleSendMessageWithThread}
                  />
                </Suspense>
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

              <Show.When isTrue={isAnyoneTyping}>
                <Icon
                  className="typing-indicator"
                  name={cilKeyboard}
                  color="var(--cv-primary)"
                  size={32}
                />
              </Show.When>

              <div>
                <PaginationScrollButton messagesRef={messagesRef} />
              </div>
            </CenteredVertialLayout>

            <Show.When isTrue={isAnyChatSelected}>
              <MessageForm
                onStopTyping={triggerStopTypingNotification}
                onStartTyping={triggerStartTypingNotification}
                onCreateMessage={handleSendMessage}
              />
            </Show.When>
          </StackLayout>

          <Show.When isTrue={messagesLoading}>
            <LoadingOverlay />
          </Show.When>
        </Resizer.Section>
      </Resizer.Container>

      <ConversationModals
        openChatCreationModal={openChatCreationModal}
        setOpenChatCreationModal={setOpenChatCreationModal}
        previewFile={previewFile}
        toggleFileDialogVisibility={toggleFileDialogVisibility}
      />

      <Modal
        isOpen={openMessageUpdateDialog}
        onClose={onCloseMessageUpdateDialog}
      >
        <MessageUpdateDialog
          chatId={Number(messageUpdateDialogState?.chatId)}
          messageId={Number(messageUpdateDialogState?.messageId)}
          initialValues={
            messageUpdateDialogState?.initialValues as MessageUpdateFormValues
          }
          onSuccess={() => {
            handleRefreshMessages();
            onCloseMessageUpdateDialog();
          }}
        />
      </Modal>
    </>
  );
};
