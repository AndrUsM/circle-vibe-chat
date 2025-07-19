import { useCallback } from "react";

import { ChatSocketCommand, DEFAULT_PAGINATION_PAGE_SIZE } from "@circle-vibe/shared";
import { useNotification, useSocket } from "@core/hooks";
import { request } from "@core/request";

export const useDeleteMessage = () => {
  const { socket } = useSocket();
  const notification = useNotification();

  return useCallback(async (chatId: number, messageId: number, currentPage: number) => {
    const response = await request({
      url: `chat/${chatId}/message/${messageId}`,
      method: "DELETE",
    });

    if (response?.status === 200) {
      socket.emit(ChatSocketCommand.REQUEST_MESSAGES_WITH_PAGINATION, {
        chatId,
        page: currentPage,
        pageSize: DEFAULT_PAGINATION_PAGE_SIZE,
      });

      notification({
        type: "success",
        content: "Successfully deleted message!",
      });
    }
  }, []);
};
