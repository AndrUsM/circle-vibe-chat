import { SocketContext } from "@core/context/socket/socket.provider";
import { useContext } from "react";

export const useSocket = () => {
  const data = useContext(SocketContext);

  if (!data?.socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return data;
};
