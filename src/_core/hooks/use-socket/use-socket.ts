import { useContext } from 'react';

import { SocketContext } from '@core/context/socket/socket.provider';

export const useSocket = () => {
  const data = useContext(SocketContext);

  if (!data?.socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return data;
};
