import { useEffect, useMemo, useState } from "react";
import {
  Chat,
  ChatParticipant,
  ChatSocketCommand,
  Message,
} from "@circle-vibe/shared";
import { useCurrentUser, useSocket } from "@core/hooks";

export const useConversationGateway = () => {
  const { user } = useCurrentUser();
  const { socket } = useSocket();
  const [chatParticipant, setChatParticipant] =
    useState<ChatParticipant | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const isAnyChatSelected = Boolean(selectedChatId);

  useEffect(() => {
    socket.emit(ChatSocketCommand.REFRESH_CHATS);
  }, []);

  socket.on(ChatSocketCommand.REFRESH_CHATS, (chats) => {
    setChats(chats);
  });

  socket.on(ChatSocketCommand.RECEIVE_MESSAGES, (messages) => {
    setMessages(messages.data);
  });

  socket.on(ChatSocketCommand.JOIN_CHAT, ({ chatParticipant }) => {
    setChatParticipant(chatParticipant);
  });

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
