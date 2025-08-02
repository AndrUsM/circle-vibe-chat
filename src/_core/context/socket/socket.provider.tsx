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
import { getAuthToken } from "@core/utils";

interface ISocketContext {
  socket: Socket;
  fileSocket: Socket | null;
  createFileSocketConnection(): Promise<Socket<any, any> | undefined>;
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
      token: getAuthToken(),
      personalToken: user?.privateToken,
    },
  });
  const [fileSocket, setFileSocket] = useState<Socket | null>(null);

  const createFileSocketConnection = useCallback(async () => {
    if (fileSocket && fileSocket.connected) {
      return;
    }

    const fileSocketConnection = io(
      `http://localhost:3005/${GatewayNamespaces.FILE_UPLOAD}`,
      {
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        auth: {
          token: getAuthToken(),
        },
      }
    );

    setFileSocket(fileSocketConnection);

    return fileSocketConnection;
  }, []);

  const connectToChatSocket = useCallback(() => {
    if (socket?.connected) {
      return;
    }

    socket.connect();
  }, [socket.id, socket.disconnected]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!socket?.connected) {
      socket.connect();
    }
  }, [user, socket?.disconnected]);

  const value = useMemo(
    () => ({ socket, fileSocket, createFileSocketConnection, connectToChatSocket }),
    [socket, fileSocket, createFileSocketConnection, connectToChatSocket]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
