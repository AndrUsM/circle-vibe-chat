import { useEffect } from "react";

import {
  Chat,
  ChatParticipant,
  ChatSocketCommand,
  PaginatedResponse,
  Message,
} from "@circle-vibe/shared";

import { useSocket } from "@core/hooks";
import { cookiesService } from "@core/services";

interface UseChatSocketLogicInitializationOptions {
  socketListenerNotifyNewMessage: VoidFunction;
  socketListenerJoinChat: (options: {
    chatParticipant: ChatParticipant;
  }) => void;
  socketListenerReceiveChats: (chats: PaginatedResponse<Chat>) => void;
  socketListenerReceiveMessages: (messages: PaginatedResponse<Message>) => void;
  triggerGetPaginatedChats: (page: number) => void;
  onScrollMessages: VoidFunction;
}

export const useChatSocketLogicInitialization = ({
  socketListenerJoinChat,
  socketListenerNotifyNewMessage,
  socketListenerReceiveMessages,
  socketListenerReceiveChats,
  triggerGetPaginatedChats,
  onScrollMessages,
}: UseChatSocketLogicInitializationOptions) => {
  const { socket } = useSocket();

  const socketListenerRefreshToken = (token: string) => {
    cookiesService.set("auth-token", token);
  };

  const socketListenerScrollToEnd = () => {
    setTimeout(() => {
      onScrollMessages();
    }, 500);
  };

  const subscribeToListeners = () => {
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
  };

  useEffect(() => {
    triggerGetPaginatedChats(1);
    subscribeToListeners();

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
};
