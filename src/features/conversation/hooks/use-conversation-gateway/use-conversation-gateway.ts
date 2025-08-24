import { useCallback, useMemo } from 'react';

import {
  Chat,
  ChatParticipant,
  ChatSocketCommand,
  Message,
  PaginatedResponse,
  RequestChatsWithPaginationChatSocketParams,
  RequestMessagesWithPaginationChatSocketParams,
  DEFAULT_PAGINATION_PAGE_SIZE,
} from '@circle-vibe/shared';

import { FormikHelpers } from 'formik';

import { composePaginationResponse } from '@shared/utils';

import { useCurrentUser, useNotification, useSocket } from '@core/hooks';

import { useActiveConversation, useIsSavedMessagesChat } from '@features/conversation';
import { MessageFormValues } from '@features/messages';

import { useSendMessage } from '@api/messages';
import { useCreateThread } from '@api/threads';

import { useConversationGatewayState } from './use-conversation-gateway-state';
import { useChatSocketLogicInitialization } from './use-conversation-socket-intialization';

/**
 * A custom React hook that manages the conversation gateway logic, handling chat and message interactions.
 *
 * @param {VoidFunction} onScrollMessages - A callback function to handle scrolling messages.
 * @returns {object} - An object containing various state variables, handlers, and trigger functions for chat and message management.
 *
 * The hook:
 * - Initializes and maintains state for chats, messages, pagination, and loading indicators.
 * - Sets up socket listeners for chat and message events, including receiving chats and messages,
 *   joining a chat, scrolling to the end of messages, and notifying about new messages.
 * - Handles chat and message selection, sending, and pagination logic.
 * - Provides functions to trigger chat and message retrieval with pagination and search functionality.
 * - Manages user authentication token refresh through socket events.
 */

export const useConversationGateway = (onScrollMessages: VoidFunction) => {
  const notification = useNotification();
  const { user } = useCurrentUser();
  const {
    chatsLoading,
    setChatsLoading,
    messagesLoading,
    setMessagesLoading,
    messagesPage,
    setMessagesPage,
    chatsPage,
    setChatsPage,
    chats,
    setChats,
    messages,
    setMessages,
    isAnyoneTyping,
    setIsAnyoneTyping: onSetTypingStatus,
  } = useConversationGatewayState();
  const createThread = useCreateThread();
  const {
    currentConversationParticipant: chatParticipant,
    setCurrentConversationParticipant: setChatParticipant,
    selectedChatId,
    setSelectedChatId,
  } = useActiveConversation();
  const { socket } = useSocket();
  const isAnyChatSelected = Boolean(selectedChatId);
  const allowToPreselectChat = useMemo<boolean>(
    () => Boolean(selectedChatId || chatParticipant),
    [selectedChatId, chatParticipant],
  );

  const onChatSelect = (chatId: number) => {
    if (selectedChatId === chatId) {
      return;
    }

    resetMessagesState();
    setSelectedChatId(chatId);

    socket.emit(ChatSocketCommand.JOIN_CHAT, { chatId });
  };

  const resetMessagesState = () => {
    setMessagesPage(1);
    setMessages(null);
  };

  const handleSendMessage = useSendMessage(chatParticipant, selectedChatId, setMessagesLoading);

  const isSavedMessagesChat = useIsSavedMessagesChat(chats, selectedChatId);

  const handleSendMessageWithThread = useCallback(
    async (formValues: MessageFormValues, formikUtils: FormikHelpers<MessageFormValues>) => {
      if (!formValues.threadId) {
        const { parentMessageId } = formValues;
        const thread = await createThread({
          chatId: Number(selectedChatId),
          parentMessageId: Number(parentMessageId),
        });
        const payload: MessageFormValues = {
          ...formValues,
          threadId: thread?.id,
        };

        return handleSendMessage(payload, formikUtils);
      }

      return handleSendMessage(formValues, formikUtils);
    },
    [selectedChatId, chatParticipant],
  );

  const handleRefreshMessages = useCallback(() => {
    if (!selectedChatId) {
      return;
    }

    triggerGetPaginatedMessages(messagesPage, {
      force: true,
    });
  }, [selectedChatId, messagesPage]);

  const socketListenerReceiveChats = (chats: PaginatedResponse<Chat>) => {
    setChatsPage(1);
    setChats(composePaginationResponse(chats));
    setChatsLoading(false);
  };

  const socketListenerReceiveMessages = (updatedMessages: PaginatedResponse<Message>) => {
    setMessages(composePaginationResponse(updatedMessages));
    setMessagesLoading(false);

    socket.emit(ChatSocketCommand.RECEIVE_CHATS, chatParticipant?.chatId);
  };

  const socketListenerJoinChat = useCallback(
    ({ chatParticipant }: { chatParticipant: ChatParticipant }) => {
      setMessagesPage(1);
      setChatParticipant(chatParticipant);
    },
    [setChatParticipant],
  );

  const socketListenerNotifyNewMessage = () => {
    if (chatParticipant?.isMuted) {
      return;
    }

    notification({
      type: 'success',
      content: 'New messages received',
    });
  };

  const triggerGetPaginatedMessages = useCallback(
    (
      page: number,
      options?: {
        force?: boolean;
      },
      filters?: {
        content?: string;
        senderIds?: number[];
      },
    ) => {
      const isSamePage = options?.force ? false : page === messagesPage;

      if (!selectedChatId || isSamePage) {
        return;
      }

      setMessagesPage(page);

      const params: RequestMessagesWithPaginationChatSocketParams = {
        chatId: selectedChatId,
        page,
        threadId: undefined,
        ...(filters ?? {}),
        pageSize: DEFAULT_PAGINATION_PAGE_SIZE,
      };

      setMessagesLoading(true);
      socket.emit(ChatSocketCommand.REQUEST_MESSAGES_WITH_PAGINATION, params);
    },
    [selectedChatId, messagesPage],
  );

  const triggerGetPaginatedChats = (
    page: number,
    filters?: {
      name?: string;
    },
  ) => {
    setMessagesPage(page);
    setChatsLoading(true);

    const userId = user?.id;
    const params: RequestChatsWithPaginationChatSocketParams = {
      userId,
      page,
      pageSize: DEFAULT_PAGINATION_PAGE_SIZE,
      name: filters?.name,
    };

    socket.emit(ChatSocketCommand.REQUEST_CHATS_WITH_PAGINATION, params);
  };

  const triggerSearchChatsByName = (name: string) => {
    triggerGetPaginatedChats(1, { name });
  };

  const triggerStartTypingNotification = useCallback(() => {
    socket.emit(ChatSocketCommand.MESSAGE_TYPE_START_TYPING, {
      chatId: selectedChatId,
    });
  }, [selectedChatId]);

  const triggerStopTypingNotification = useCallback(() => {
    socket.emit(ChatSocketCommand.MESSAGE_TYPE_STOP_TYPING, {
      chatId: selectedChatId,
    });
  }, [selectedChatId]);

  useChatSocketLogicInitialization({
    socketListenerJoinChat,
    socketListenerNotifyNewMessage,
    socketListenerReceiveMessages,
    socketListenerReceiveChats,
    triggerGetPaginatedChats,
    onScrollMessages,
    onSetTypingStatus,
  });

  return useMemo(
    () => ({
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
      triggerStopTypingNotification,
      triggerStartTypingNotification,
      handleSendMessageWithThread,
      handleRefreshMessages,
      isSavedMessagesChat,
      onChatSelect,
      triggerGetPaginatedChats,
      triggerSearchChatsByName,
      triggerGetPaginatedMessages,
      handleSendMessage,
    }),
    [
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
      user,
      isSavedMessagesChat,
    ],
  );
};
