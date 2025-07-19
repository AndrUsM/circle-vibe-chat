import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import {
  Chat,
  ChatParticipant,
  ChatSocketCommand,
  Message,
  PaginatedResponse,
  RequestChatsWithPaginationChatSocketParams,
  RequestMessagesWithPaginationChatSocketParams,
  DEFAULT_PAGINATION_PAGE_SIZE,
} from "@circle-vibe/shared";

import { useCurrentUser, useNotification, useSocket } from "@core/hooks";
import { cookiesService } from "@core/services";

import { composePaginationResponse } from "@shared/utils";

import { useSendMessage } from "@features/messages";
import { ConversationContext } from "@features/conversation";

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
  const { user } = useCurrentUser();
  const {
    currentConversationParticipant: chatParticipant,
    setCurrentConversationParticipant: setChatParticipant,
    selectedChatId,
    setSelectedChatId,
  } = useContext(ConversationContext);
  const notification = useNotification();
  const { socket } = useSocket();
  const [chatsLoading, setChatsLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesPage, setMessagesPage] = useState(1);
  const [chatsPage, setChatsPage] = useState(1);
  const [chats, setChats] = useState<PaginatedResponse<Chat> | null>(null);
  const [messages, setMessages] = useState<PaginatedResponse<Message> | null>(
    null
  );
  const isAnyChatSelected = Boolean(selectedChatId);
  const allowToPreselectChat = useMemo<boolean>(
    () => Boolean(selectedChatId || chatParticipant),
    [selectedChatId, chatParticipant]
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
    setMessagesLoading(true);
  };

  const handleSendMessage = useSendMessage(chatParticipant, selectedChatId);

  const socketListenerReceiveChats = (chats: PaginatedResponse<Chat>) => {
    setChatsPage(1);
    setChats(composePaginationResponse(chats));
    setChatsLoading(false);
  };

  const socketListenerReceiveMessages = (
    messages: PaginatedResponse<Message>
  ) => {
    setMessages(composePaginationResponse(messages));
    setMessagesLoading(false);

    socket.emit(ChatSocketCommand.RECEIVE_CHATS, chatParticipant?.chatId);
  };

  const socketListenerJoinChat = ({
    chatParticipant,
  }: {
    chatParticipant: ChatParticipant;
  }) => {
    setMessagesPage(1);
    setChatParticipant(chatParticipant);
  };

  const socketListenerScrollToEnd = () => {
    setTimeout(() => {
      onScrollMessages();
    }, 500);
  };

  const socketListenerNotifyNewMessage = () => {
    if (chatParticipant?.isMuted) {
      return;
    }

    notification({
      type: "success",
      content: "New messages received",
    });
  };

  const triggerGetPaginatedMessages = (page: number) => {
    if (!selectedChatId || page === messagesPage) {
      return;
    }

    setMessagesPage(page);

    const params: RequestMessagesWithPaginationChatSocketParams = {
      chatId: selectedChatId,
      page,
      pageSize: DEFAULT_PAGINATION_PAGE_SIZE,
    };

    setMessagesLoading(true);
    socket.emit(ChatSocketCommand.REQUEST_MESSAGES_WITH_PAGINATION, params);
  };

  const triggerGetPaginatedChats = (
    page: number,
    filters?: {
      name?: string;
    }
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

  const socketListenerRefreshToken = (token: string) => {
    cookiesService.set("auth-token", token);
  };

  useEffect(() => {
    triggerGetPaginatedChats(1);

    socket.on(ChatSocketCommand.REFRESH_TOKEN, socketListenerRefreshToken);
    socket.on(ChatSocketCommand.RECEIVE_CHATS, socketListenerReceiveChats);
    socket.on(
      ChatSocketCommand.RECEIVE_MESSAGES,
      socketListenerReceiveMessages
    );
    socket.on(ChatSocketCommand.JOIN_CHAT, socketListenerJoinChat);
    socket.on(
      ChatSocketCommand.SCROLL_TO_END_OF_MESSAGES,
      socketListenerScrollToEnd
    );
    socket.on(
      ChatSocketCommand.NOTIFY_ABOUT_NEW_MESSAGE,
      socketListenerNotifyNewMessage
    );

    return () => {
      socket.off(ChatSocketCommand.REFRESH_TOKEN, socketListenerRefreshToken);
      socket.off(ChatSocketCommand.RECEIVE_CHATS, socketListenerReceiveChats);
      socket.off(
        ChatSocketCommand.RECEIVE_MESSAGES,
        socketListenerReceiveMessages
      );
      socket.off(ChatSocketCommand.JOIN_CHAT, socketListenerJoinChat);
      socket.off(
        ChatSocketCommand.SCROLL_TO_END_OF_MESSAGES,
        socketListenerScrollToEnd
      );
      socket.off(
        ChatSocketCommand.NOTIFY_ABOUT_NEW_MESSAGE,
        socketListenerNotifyNewMessage
      );
    };
  }, [socket?.id]);

  return useMemo(
    () => ({
      user,
      messagesPage,
      chatsPage,
      chatParticipant,
      selectedChatId,
      chats,
      messages,
      isAnyChatSelected,
      chatsLoading,
      messagesLoading,
      allowToPreselectChat,
      onChatSelect,
      handleSendMessage,
      resetMessagesState,
      setChatParticipant,
      setSelectedChatId,
      triggerGetPaginatedChats,
      triggerSearchChatsByName,
      triggerGetPaginatedMessages,
    }),
    [
      user,
      chatsPage,
      messagesPage,
      chatParticipant,
      selectedChatId,
      chats,
      messages,
      isAnyChatSelected,
      chatsLoading,
      messagesLoading,
      allowToPreselectChat,
      onChatSelect,
      handleSendMessage,
      setChatParticipant,
      setSelectedChatId,
      triggerSearchChatsByName,
    ]
  );
};
