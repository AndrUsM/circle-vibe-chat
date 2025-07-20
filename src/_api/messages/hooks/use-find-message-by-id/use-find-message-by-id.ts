import { useCallback } from "react";

import { Message } from "@circle-vibe/shared";
import { request } from "@core/request";

export const useFindMessageById = () => {
  return useCallback(async (chatId: number, messageId: number) => {
    const response = await request({
      url: `chat/${chatId}/message/${messageId}`,
      method: "GET",
    });

    return response.data as Message;
  }, []);
};
