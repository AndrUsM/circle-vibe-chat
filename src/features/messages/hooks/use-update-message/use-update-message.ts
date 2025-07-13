// import { ChatSocketCommand } from "@circle-vibe/shared";
// import { useSocket } from "@core/hooks";
import { useNotification } from "@core/hooks";
import { request } from "@core/request"

export const useUpdateMessage = (chatId: number, messageId: number) => {
  // const {socket} = useSocket();
  const notification = useNotification();

  return request({
    url: `chat/${chatId}/message/${messageId}`,
    method: 'PUT',
    data: {}
  }).then(() => {
    notification({
      type: "success",
      content: "Successfully updated message!",
    });
    //  socket.emit(ChatSocketCommand.REFRESH_MESSAGES, { chatId, messageId });
  });
}
