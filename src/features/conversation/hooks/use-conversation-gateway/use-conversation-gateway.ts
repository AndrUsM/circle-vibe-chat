import { useEffect, useMemo, useState } from "react";
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
import { composePaginationResponse } from "@shared/utils";
import { request } from "@core/request";
import { cookiesService } from "@core/services";

/**
 * Handles the state of the conversation gateway for the current user.
 *
 * @param {VoidFunction} onScrollMessages - Function to be called when messages are received.
 *
 * @returns {{
 *   user: User,
 *   chatParticipant: ChatParticipant | null,
 *   setChatParticipant: (chatParticipant: ChatParticipant | null) => void,
 *   selectedChatId: number | null,
 *   setSelectedChatId: (selectedChatId: number | null) => void,
 *   chats: Chat[],
 *   messages: Message[],
 *   isAnyChatSelected: boolean,
 * }}
 */
export const useConversationGateway = (onScrollMessages: VoidFunction) => {
  const { user } = useCurrentUser();
  const notification = useNotification();
  const { socket } = useSocket();
  const [chatsLoading, setChatsLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesPage, setMessagesPage] = useState(1);
  const [chatsPage, setChatsPage] = useState(1);
  const [chatParticipant, setChatParticipant] =
    useState<ChatParticipant | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [chats, setChats] = useState<PaginatedResponse<Chat> | null>(null);
  const [messages, setMessages] = useState<PaginatedResponse<Message> | null>(
    null
  );
  const isAnyChatSelected = Boolean(selectedChatId);
  const isSavedMessagesSelected = useMemo(() => {
    const currentChat = chats?.data.find((chat) => chat.id === selectedChatId);

    return currentChat?.isSavedMessages;
  }, [chats, selectedChatId]);

  const resetMessagesState = () => {
    setMessagesPage(1);
    setMessages(null);
    setMessagesLoading(true);
  }

  const handleReceiveChats = (chats: PaginatedResponse<Chat>) => {
    setChatsPage(1);
    setChats(composePaginationResponse(chats));
    setChatsLoading(false);
  };

  const handleReceiveMessages = (messages: PaginatedResponse<Message>) => {
    setMessages(composePaginationResponse(messages));
    setMessagesLoading(false);

    if (!isSavedMessagesSelected) {
      socket.emit(ChatSocketCommand.RECEIVE_CHATS, chatParticipant?.chatId);
    }
  };

  const handleJoinChat = ({
    chatParticipant,
  }: {
    chatParticipant: ChatParticipant;
  }) => {
    setMessagesPage(1);
    setChatParticipant(chatParticipant);
  };

  const handleScrollToEnd = () => {
    setTimeout(() => {
      onScrollMessages();
    }, 500);
  };

  const handleNotifyNewMessage = () => {
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

  const triggerGetPaginatedChats = (page: number) => {
    if (chats?.totalItems && page === chatsPage) {
      return;
    }

    setMessagesPage(page);
    setChatsLoading(true);

    const userId = user?.id;
    const params: RequestChatsWithPaginationChatSocketParams = {
      userId,
      page,
      pageSize: DEFAULT_PAGINATION_PAGE_SIZE,
    };

    socket.emit(ChatSocketCommand.REQUEST_CHATS_WITH_PAGINATION, params);
  };

  const refreshToken = (token: string) => {
    cookiesService.set("auth-token", token);
  };

  useEffect(() => {
    triggerGetPaginatedChats(1);

    socket.on(ChatSocketCommand.REFRESH_TOKEN, refreshToken);
    socket.on(ChatSocketCommand.RECEIVE_CHATS, handleReceiveChats);
    socket.on(ChatSocketCommand.RECEIVE_MESSAGES, handleReceiveMessages);
    socket.on(ChatSocketCommand.JOIN_CHAT, handleJoinChat);
    socket.on(ChatSocketCommand.SCROLL_TO_END_OF_MESSAGES, handleScrollToEnd);
    socket.on(
      ChatSocketCommand.NOTIFY_ABOUT_NEW_MESSAGE,
      handleNotifyNewMessage
    );

    return () => {
      socket.off(ChatSocketCommand.REFRESH_TOKEN, refreshToken);
      socket.off(ChatSocketCommand.RECEIVE_CHATS, handleReceiveChats);
      socket.off(ChatSocketCommand.RECEIVE_MESSAGES, handleReceiveMessages);
      socket.off(ChatSocketCommand.JOIN_CHAT, handleJoinChat);
      socket.off(
        ChatSocketCommand.SCROLL_TO_END_OF_MESSAGES,
        handleScrollToEnd
      );
      socket.off(
        ChatSocketCommand.NOTIFY_ABOUT_NEW_MESSAGE,
        handleNotifyNewMessage
      );
    };
  }, [socket]);

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
      resetMessagesState,
      setChatParticipant,
      setSelectedChatId,
      triggerGetPaginatedChats,
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
      setChatParticipant,
      setSelectedChatId,
    ]
  );
};
