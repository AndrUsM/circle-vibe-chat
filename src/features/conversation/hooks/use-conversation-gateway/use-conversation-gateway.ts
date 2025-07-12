import { useEffect, useMemo, useState } from "react";
import {
  Chat,
  ChatParticipant,
  ChatSocketCommand,
  Message,
} from "@circle-vibe/shared";
import { useCurrentUser, useSocket } from "@core/hooks";

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

    setTimeout(() => {
      onScrollMessages();
    }, 500);
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
