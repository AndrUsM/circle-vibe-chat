import React, { Suspense, useCallback, useRef } from 'react';

import {
  Button,
  CenteredVertialLayout,
  ClusterLayout,
  FormControl,
  Icon,
  Input,
  LoadingOverlay,
  Modal,
  Show,
  StackLayout,
  useBoolean,
  useIcons,
} from '@circle-vibe/components';
import { DEFAULT_PAGINATION_PAGE } from '@circle-vibe/shared';

import * as Resizer from '@column-resizer/react';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';

import { Filters, PaginationControls, PaginationScrollButton } from '@shared/components';
import { useConfirmation, useScrollToBlockPosition } from '@shared/hooks';

import {
  Chat,
  useConversationGateway,
  useInitialChatSelection,
  ConversationsFilterBar,
  ConversationsFilterBarFormValues,
  CONVERSATOINS_FILTER_BAR_FORM_INITIAL_VALUES,
  conversationFilterBarValuesToRequestMap,
} from '@features/conversation';
import {
  Message,
  MessageForm,
  MESSAGES_FILTER_BAR_FORM_INITIAL_VALUES,
  MessagesFilterBar,
  MessagesFilterBarFormValues,
  MessageUpdateDialog,
  MessageUpdateFormValues,
  usePreviewFileState,
  useUpdateMessageState,
} from '@features/messages';

import { useDeleteMessage } from '@api/messages';

import { ConversationModals } from './conversation-modals';

import './conversation.scss';

export const Conversations: React.FC = () => {
  const { t } = useTranslation();
  const confirm = useConfirmation();
  const chatsSectionRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { cilKeyboard, cilFilter, cilArrowThickToRight, cilLineWeight, cilLineStyle } = useIcons();
  const onScrollToPosition = useScrollToBlockPosition();
  const deleteMessage = useDeleteMessage();
  const [isFiltersBarVisible, triggerFiltersBarVisibility, setFilterBarVisibility] =
    useBoolean(false);
  const [isChatsFiltersBarVisible, triggerChatsFiltersBarVisibility] = useBoolean(false);
  const { toggleFileDialogVisibility, previewFile } = usePreviewFileState();

  const [openChatCreationModal, toggleOpenChatCreationModal, setOpenChatCreationModal] =
    useBoolean(false);
  const [openMessageControls, toggleMessageControls] = useBoolean(false);
  const {
    openMessageUpdateDialog,
    onCloseMessageUpdateDialog,
    onOpenMessageUpdateDialog,
    messageUpdateDialogState,
  } = useUpdateMessageState();

  const onScrollMessages = () => {
    if (messagesRef?.current?.scrollTop) {
      return;
    }

    onScrollToPosition(messagesRef, 'end', 'end');
  };

  const onExpandChats = () => {
    if (!chatsSectionRef?.current) {
      return;
    }

    chatsSectionRef.current.style.flexGrow = '1';
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
    isAnyoneTyping,
    triggerStartTypingNotification,
    triggerStopTypingNotification,
    handleRefreshMessages,
    handleSendMessageWithThread,
    triggerGetPaginatedMessages,
    handleSendMessage,
    isSavedMessagesChat,
    onChatSelect,
    triggerGetPaginatedChats,
    triggerSearchChatsByName,
  } = useConversationGateway(onScrollMessages);

  const debouncedChatSearch = useDebouncedCallback(triggerSearchChatsByName, 1000);

  const onDeleteMessage = useCallback(
    async (messageId: number) => {
      await confirm('Are your sure you want to delete this message?', 'danger');
      deleteMessage(Number(selectedChatId), messageId, messagesPage);
    },
    [selectedChatId, messagesPage],
  );
  const onUpdateMessage = useCallback(
    (messageId: number) => {
      onOpenMessageUpdateDialog({
        chatId: Number(selectedChatId),
        messageId,
      });
    },
    [selectedChatId],
  );

  useInitialChatSelection(chats?.data ?? [], onChatSelect, allowToPreselectChat);

  return (
    <>
      <Resizer.Container className='conversations'>
        <Resizer.Section
          ref={chatsSectionRef}
          className='relative flex items-center justify-center w-full messages-resizer-section bg-light rounded-tr-2 rounded-br-2'
          minSize={30}
        >
          <Button
            className='toggle-chats-section-button'
            color='secondary'
            borderRadius={{
              topLeft: false,
              bottomLeft: false,
              topRight: true,
              bottomRight: true,
            }}
            onClick={onExpandChats}
          >
            <Icon name={cilArrowThickToRight} color='var(--cv-light)' size={16} />
          </Button>

          <StackLayout className='w-full p-3 overflow-x-hidden'>
            <Filters
              onChange={(filters) => {
                triggerGetPaginatedChats(
                  DEFAULT_PAGINATION_PAGE,
                  conversationFilterBarValuesToRequestMap(
                    filters as ConversationsFilterBarFormValues,
                  ),
                );
              }}
              initialValue={CONVERSATOINS_FILTER_BAR_FORM_INITIAL_VALUES}
            >
              {({ isActive, setFilter }) => (
                <StackLayout
                  space='1rem'
                  justifyContent='justify-between'
                  className='flex-wrap chats-section_desktop-only-content'
                >
                  <FormControl className='w-full'>
                    <Input
                      className='p-4 rounded-2'
                      placeholder={t('input.search.placeholder')}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFilter('name', e.target.value as never);
                      }}
                    />
                  </FormControl>

                  <Show.When isTrue={isChatsFiltersBarVisible}>
                    <ConversationsFilterBar />
                  </Show.When>

                  <ClusterLayout space='0.75rem'>
                    <Button size='medium' className='w-full' onClick={toggleOpenChatCreationModal}>
                      {t('button.actions.create')}
                    </Button>

                    <Show.When isTrue={Number(chats?.totalItems) > 0}>
                      <Button
                        size='medium'
                        className='w-10'
                        color={isActive ? 'primary' : 'secondary'}
                        onClick={triggerChatsFiltersBarVisibility}
                      >
                        <Icon name={cilFilter} color='var(--cv-light)' size={16} />
                      </Button>
                    </Show.When>
                  </ClusterLayout>
                </StackLayout>
              )}
            </Filters>

            <StackLayout className='overflow-y-container-no-gutter'>
              {chats?.data.map((chat) => (
                <Chat
                  key={chat.id}
                  chat={chat}
                  chatParticipant={chatParticipant}
                  selected={selectedChatId === chat.id}
                  onClick={() => {
                    if (chat.id !== selectedChatId) {
                      onChatSelect(chat.id);
                      setFilterBarVisibility(false);
                    }
                  }}
                />
              ))}
            </StackLayout>

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

        <Resizer.Bar size={10} className='transition bg-tertiary cursor-resize' />

        <Resizer.Section
          className='relative flex items-center w-full rounded-tl-2 rounded-bl-2'
          minSize={175}
        >
          <StackLayout
            space='0.625rem'
            justifyContent='space-between'
            className='w-full overflow-x-hidden'
          >
            <Filters initialValue={MESSAGES_FILTER_BAR_FORM_INITIAL_VALUES}>
              {({ isActive, filters }) => (
                <>
                  <Show.When isTrue={isFiltersBarVisible && Boolean(selectedChatId)}>
                    <section className='bg-light p-3 rounded-tl-2 rounded-bl-2'>
                      <MessagesFilterBar
                        initialValues={filters as MessagesFilterBarFormValues}
                        conversationId={Number(selectedChatId)}
                        onClose={triggerFiltersBarVisibility}
                        onSubmit={(filter) => {
                          triggerGetPaginatedMessages(chatsPage, { force: true }, filter);
                        }}
                      />
                    </section>
                  </Show.When>

                  <StackLayout
                    space='1rem'
                    className='overflow-y-auto bg-light p-3 rounded-tl-2 rounded-bl-2'
                  >
                    <StackLayout
                      ref={messagesRef}
                      className='overflow-y-container overflow-x-hidden'
                    >
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

                      <Show.When isTrue={!messagesLoading && !messages?.totalItems}>
                        <span className='text-md text-truncate'>{t('message.empty')}</span>
                      </Show.When>
                    </StackLayout>
                  </StackLayout>

                  <StackLayout space='1rem' className=' bg-light p-3 rounded-tl-2 rounded-bl-2'>
                    <Show.When isTrue={openMessageControls}>
                      <CenteredVertialLayout space='0.5rem' justifyContent='space-between'>
                        <PaginationControls
                          paginatedResponse={messages}
                          currentPage={messagesPage}
                          onPageChange={triggerGetPaginatedMessages}
                        />

                        <Show>
                          <Show.When isTrue={isAnyoneTyping}>
                            <Icon
                              className='typing-indicator'
                              name={cilKeyboard}
                              color='var(--cv-primary)'
                              size={32}
                            />
                          </Show.When>
                          <Show.Else>
                            <div />
                          </Show.Else>
                        </Show>

                        <CenteredVertialLayout space='0.5rem'>
                          <Button
                            className='messages-filter-button'
                            color={isActive || isFiltersBarVisible ? 'primary' : 'secondary'}
                            onClick={triggerFiltersBarVisibility}
                          >
                            <Icon color='var(--cv-light)' name={cilFilter} size={15} />
                          </Button>

                          <PaginationScrollButton messagesRef={messagesRef} />
                        </CenteredVertialLayout>
                      </CenteredVertialLayout>
                    </Show.When>

                    <Show.When isTrue={isAnyChatSelected && Boolean(chatParticipant?.id)}>
                      <MessageForm
                        onStopTyping={triggerStopTypingNotification}
                        onStartTyping={triggerStartTypingNotification}
                        onCreateMessage={handleSendMessage}
                      >
                        <Button color='secondary' type='button' onClick={toggleMessageControls}>
                          <Icon
                            color='var(--cv-light)'
                            name={openMessageControls ? cilLineStyle : cilLineWeight}
                            size={15}
                          />
                        </Button>
                      </MessageForm>
                    </Show.When>
                  </StackLayout>
                </>
              )}
            </Filters>
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

      <Modal.Root isOpen={openMessageUpdateDialog} onClose={onCloseMessageUpdateDialog}>
        <Modal.Header onClose={onCloseMessageUpdateDialog}>Update Message</Modal.Header>

        <Modal.Body>
          <MessageUpdateDialog
            chatId={Number(messageUpdateDialogState?.chatId)}
            messageId={Number(messageUpdateDialogState?.messageId)}
            initialValues={messageUpdateDialogState?.initialValues as MessageUpdateFormValues}
            onSuccess={() => {
              handleRefreshMessages();
              onCloseMessageUpdateDialog();
            }}
          />
        </Modal.Body>
      </Modal.Root>
    </>
  );
};
