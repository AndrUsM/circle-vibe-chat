import { useEffect, useMemo, useState } from "react";
import {
  Chat,
  ChatParticipant,
  ChatSocketCommand,
  Message,
} from "@circle-vibe/shared";
import { useCurrentUser, useNotification, useSocket } from "@core/hooks";

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
  const [chatParticipant, setChatParticipant] =
    useState<ChatParticipant | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const isAnyChatSelected = Boolean(selectedChatId);
  const isSavedMessagesSelected = useMemo(() => {
    const currentChat = chats.find((chat) => chat.id === selectedChatId);

    return currentChat?.isSavedMessages;
  }, [chats, selectedChatId]);

  const handleRefreshChats = (chats: Chat[]) => {
    setChats(chats);
  };

  const handleReceiveMessages = (messages: { data: Message[] }) => {
    setMessages(messages.data);

    if (!isSavedMessagesSelected) {
      socket.emit(ChatSocketCommand.REFRESH_CHATS, chatParticipant?.chatId);
    }
  };

  const handleJoinChat = ({
    chatParticipant,
  }: {
    chatParticipant: ChatParticipant;
  }) => {
    setChatParticipant(chatParticipant);
  };

  const handleScrollToEnd = () => {
    setTimeout(() => {
      onScrollMessages();
    }, 500);
  };

  const handleNotifyNewMessage = () => {
    if (chatParticipant?.isMuted) {
      return
    }

    notification({
      type: "success",
      content: "New messages received",
    });
  };

  useEffect(() => {
    socket.emit(ChatSocketCommand.REFRESH_CHATS);

    socket.on(ChatSocketCommand.REFRESH_CHATS, handleRefreshChats);
    socket.on(ChatSocketCommand.RECEIVE_MESSAGES, handleReceiveMessages);
    socket.on(ChatSocketCommand.JOIN_CHAT, handleJoinChat);
    socket.on(ChatSocketCommand.SCROLL_TO_END_OF_MESSAGES, handleScrollToEnd);
    socket.on(
      ChatSocketCommand.NOTIFY_ABOUT_NEW_MESSAGE,
      handleNotifyNewMessage
    );


    return () => {
      socket.off(ChatSocketCommand.REFRESH_CHATS, handleRefreshChats);
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
      chatParticipant,
      setChatParticipant,
      selectedChatId,
      setSelectedChatId,
      chats,
      messages,
      isAnyChatSelected,
    }),
    [
      user,
      chatParticipant,
      setChatParticipant,
      selectedChatId,
      setSelectedChatId,
      chats,
      messages,
      isAnyChatSelected,
    ]
  );
};
