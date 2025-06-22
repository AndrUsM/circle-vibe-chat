import { ExtendedReactFunctionalComponent } from "@circle-vibe/shared";
import { useCurrentUser } from "@core/hooks";
import { cookiesService } from "@core/services";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";

interface ISocketContext {
  socket: Socket;
  videoSocket: Socket | null;
  createVideoSocketConnection(fileName: string): Promise<Socket<any, any> | undefined>;
}

export const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider: ExtendedReactFunctionalComponent = ({
  children,
}) => {
  const { user } = useCurrentUser();
  const socket = io("http://localhost:3002", {
    transports: ["websocket"],
    autoConnect: false,
    auth: {
      token: cookiesService.get("auth-token"),
      personalToken: user?.privateToken,
    },
  });
  const [videoSocket, setVideoSocket] = useState<Socket | null>(null);

  const createVideoSocketConnection = useCallback(async (filename: string) => {
    if (videoSocket && videoSocket.connected) {
      return;
    }

    const videoSocketConnection = io("http://localhost:3005", {
      transports: ["websocket"],
      autoConnect: false,
      auth: {
        token: cookiesService.get("auth-token"),
        personalToken: user?.privateToken,
        filename,
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
