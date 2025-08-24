import { useEffect } from 'react';

import {
  Chat,
  ChatParticipant,
  ChatSocketCommand,
  PaginatedResponse,
  Message,
} from '@circle-vibe/shared';

import { useSocket } from '@core/hooks';
import { setAuthToken } from '@core/utils';

interface UseChatSocketLogicInitializationOptions {
  socketListenerNotifyNewMessage: VoidFunction;
  socketListenerJoinChat: (options: { chatParticipant: ChatParticipant }) => void;
  socketListenerReceiveChats: (chats: PaginatedResponse<Chat>) => void;
  socketListenerReceiveMessages: (messages: PaginatedResponse<Message>) => void;
  triggerGetPaginatedChats: (page: number) => void;
  onScrollMessages: VoidFunction;
  onSetTypingStatus: (status: boolean) => void;
}

export const useChatSocketLogicInitialization = ({
  socketListenerJoinChat,
  socketListenerNotifyNewMessage,
  socketListenerReceiveMessages,
  socketListenerReceiveChats,
  triggerGetPaginatedChats,
  onScrollMessages,
  onSetTypingStatus,
}: UseChatSocketLogicInitializationOptions) => {
  const { socket } = useSocket();

  const socketListenerRefreshToken = (token: string) => {
    setAuthToken(token);
  };

  const socketListenerScrollToEnd = () => {
    setTimeout(() => {
      onScrollMessages();
    }, 500);
  };
  const socketListenerStopTyping = () => {
    onSetTypingStatus(false);
  };

  const socketListenerStartTyping = () => {
    onSetTypingStatus(true);
  };

  const subscribeToListeners = () => {
    socket.on(ChatSocketCommand.MESSAGE_TYPE_START_TYPING, socketListenerStartTyping);
    socket.on(ChatSocketCommand.MESSAGE_TYPE_STOP_TYPING, socketListenerStopTyping);
    socket.on(ChatSocketCommand.REFRESH_TOKEN, socketListenerRefreshToken);
    socket.on(ChatSocketCommand.RECEIVE_CHATS, socketListenerReceiveChats);
    socket.on(ChatSocketCommand.RECEIVE_MESSAGES, socketListenerReceiveMessages);
    socket.on(ChatSocketCommand.JOIN_CHAT, socketListenerJoinChat);
    socket.on(ChatSocketCommand.SCROLL_TO_END_OF_MESSAGES, socketListenerScrollToEnd);
    socket.on(ChatSocketCommand.NOTIFY_ABOUT_NEW_MESSAGE, socketListenerNotifyNewMessage);
  };

  useEffect(() => {
    triggerGetPaginatedChats(1);
    subscribeToListeners();

    return () => {
      socket.off(ChatSocketCommand.MESSAGE_TYPE_START_TYPING, socketListenerStartTyping);
      socket.off(ChatSocketCommand.MESSAGE_TYPE_STOP_TYPING, socketListenerStopTyping);
      socket.off(ChatSocketCommand.REFRESH_TOKEN, socketListenerRefreshToken);
      socket.off(ChatSocketCommand.RECEIVE_CHATS, socketListenerReceiveChats);
      socket.off(ChatSocketCommand.RECEIVE_MESSAGES, socketListenerReceiveMessages);
      socket.off(ChatSocketCommand.JOIN_CHAT, socketListenerJoinChat);
      socket.off(ChatSocketCommand.SCROLL_TO_END_OF_MESSAGES, socketListenerScrollToEnd);
      socket.off(ChatSocketCommand.NOTIFY_ABOUT_NEW_MESSAGE, socketListenerNotifyNewMessage);
    };
  }, [socket?.id]);
};
