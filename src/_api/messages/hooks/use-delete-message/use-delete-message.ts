import { useCallback } from 'react';

import { ChatSocketCommand, DEFAULT_PAGINATION_PAGE_SIZE } from '@circle-vibe/shared';

import { useCurrentUser, useNotification, useSocket } from '@core/hooks';
import { request } from '@core/request';
import { parseSocketPayload } from '@shared/utils';

export const useDeleteMessage = () => {
  const { socket } = useSocket();
  const notification = useNotification();
  const { user } = useCurrentUser() ?? {};

  return useCallback(async (chatId: number, messageId: number, currentPage: number) => {
    const response = await request({
      url: `chat/${chatId}/message/${messageId}`,
      method: 'DELETE',
      data: {
        userId: user?.id,
      },
    });

    if (response?.status === 200) {
      socket.emit(
        ChatSocketCommand.REQUEST_MESSAGES_WITH_PAGINATION,
        parseSocketPayload({
          chatId,
          page: currentPage,
          pageSize: DEFAULT_PAGINATION_PAGE_SIZE,
        }),
      );

      notification({
        type: 'success',
        content: 'Successfully deleted message!',
      });
    }
  }, []);
};
