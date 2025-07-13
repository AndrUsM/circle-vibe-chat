import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";

import { GatewayNamespaces } from "@circle-vibe/shared";
import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";
import { useCurrentUser } from "@core/hooks";
import { cookiesService } from "@core/services";

interface ISocketContext {
  socket: Socket;
  videoSocket: Socket | null;
  createVideoSocketConnection(): Promise<Socket<any, any> | undefined>;
  connectToChatSocket: VoidFunction;
}

export const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider: ExtendedReactFunctionalComponent = ({
  children,
}) => {
  const { user } = useCurrentUser();
  const socket = io(`http://localhost:3002/${GatewayNamespaces.CHAT_MAIN}`, {
    transports: ["websocket"],
    autoConnect: false,
    reconnection: false,
    auth: {
      token: cookiesService.get("auth-token"),
      personalToken: user?.privateToken,
    },
  });
  const [videoSocket, setVideoSocket] = useState<Socket | null>(null);

  const createVideoSocketConnection = useCallback(async () => {
    if (videoSocket && videoSocket.connected) {
      return;
    }

    const videoSocketConnection = io(
      `http://localhost:3005/${GatewayNamespaces.VIDEO_UPLOAD}`,
      {
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        auth: {
          token: cookiesService.get("auth-token"),
        },
      }
    );

    setVideoSocket(videoSocketConnection);

    return videoSocketConnection;
  }, []);

  const connectToChatSocket = useCallback(() => {
    if (socket.connected) {
      return;
    }

    socket.connect();
  }, [socket]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!socket?.connected) {
      socket.connect();
    }
  }, [user, socket]);

  const value = useMemo(
    () => ({ socket, videoSocket, createVideoSocketConnection, connectToChatSocket }),
    [socket, videoSocket, createVideoSocketConnection, connectToChatSocket]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
