import { useMemo, useState } from "react";
import { Chat, Message, PaginatedResponse } from "@circle-vibe/shared";

export const useConversationGatewayState = () => {
  const [chatsLoading, setChatsLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesPage, setMessagesPage] = useState(1);
  const [chatsPage, setChatsPage] = useState(1);
  const [chats, setChats] = useState<PaginatedResponse<Chat> | null>(null);
  const [messages, setMessages] = useState<PaginatedResponse<Message> | null>(
    null
  );

  return useMemo(() => {
    return {
      chatsLoading,
      messagesLoading,
      messagesPage,
      chatsPage,
      chats,
      messages,
      setChatsLoading,
      setMessagesLoading,
      setMessagesPage,
      setChatsPage,
      setChats,
      setMessages,
    };
  }, [
    chatsLoading,
    messagesLoading,
    messagesPage,
    chatsPage,
    chats,
    messages,
    setChatsLoading,
    setMessagesLoading,
    setMessagesPage,
    setChatsPage,
    setChats,
    setMessages,
  ]);
};
