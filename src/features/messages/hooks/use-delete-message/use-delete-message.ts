// import { ChatSocketCommand } from "@circle-vibe/shared";
import { useNotification, useSocket } from "@core/hooks";
import { request } from "@core/request";

export const useDeleteMessage = (chatId: number, messageId: number) => {
  // const { socket } = useSocket();
  const notification = useNotification();

  return request({
    url: `chat/${chatId}/message/${messageId}`,
    method: "DELETE",
  }).then(() => {
    // socket.emit(ChatSocketCommand.REFRESH_MESSAGES, { chatId, messageId });
    notification({
      type: "success",
      content: "Successfully deleted message!",
    });
  });
};
