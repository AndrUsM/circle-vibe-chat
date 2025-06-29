import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";

import { ExtendedReactFunctionalComponent, GatewayNamespaces } from "@circle-vibe/shared";
import { useCurrentUser } from "@core/hooks";
import { cookiesService } from "@core/services";

interface ISocketContext {
  socket: Socket;
  videoSocket: Socket | null;
  createVideoSocketConnection(): Promise<Socket<any, any> | undefined>;
}

export const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider: ExtendedReactFunctionalComponent = ({
  children,
}) => {
  const { user } = useCurrentUser();
  const socket = io(`http://localhost:3002/${GatewayNamespaces.CHAT_MAIN}`, {
    transports: ["websocket"],
    autoConnect: false,
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

    const videoSocketConnection = io(`http://localhost:3005/${GatewayNamespaces.VIDEO_UPLOAD}`, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: false,
      auth: {
        token: cookiesService.get("auth-token"),
      },
    });

    setVideoSocket(videoSocketConnection);

    return videoSocketConnection;
  }, []);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, []);

  const value = useMemo(
    () => ({ socket, videoSocket, createVideoSocketConnection }),
    [socket, videoSocket, createVideoSocketConnection]
  );

  return (
    <SocketContext.Provider
      value={value}
    >
      {children}
    </SocketContext.Provider>
  );
};
