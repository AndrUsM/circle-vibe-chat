import { ExtendedReactFunctionalComponent } from "@circle-vibe/shared";
import { useCurrentUser } from "@core/hooks";
import { cookiesService } from "@core/services";
import { createContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";

interface ISocketContext {
  socket: Socket;
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

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  })


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
