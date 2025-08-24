import { useCallback } from 'react';

import { Message } from '@circle-vibe/shared';

import { useNotification } from '@core/hooks';
import { request } from '@core/request';

interface UseUpdateMessageOption {
  content: string;
}

export const useUpdateMessage = () => {
  const notification = useNotification();

  return useCallback(async (chatId: number, messageId: number, options: UseUpdateMessageOption) => {
    const response = await request({
      url: `chat/${chatId}/message/${messageId}`,
      method: 'PUT',
      data: options,
    });

    if (response?.data) {
      notification({
        type: 'success',
        content: 'Successfully updated message!',
      });

      return response.data as Message;
    }

    return null;
  }, []);
};
