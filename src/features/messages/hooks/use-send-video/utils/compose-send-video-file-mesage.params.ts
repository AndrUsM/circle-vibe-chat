import { MessageFileEntityType, SendMessageChatSocketParams } from "@circle-vibe/shared";

export const composeSendVideoFileMessageParams = (messageInputDto: SendMessageChatSocketParams, filePath: string, file: File) => ({
  ...messageInputDto,
  fileUrl: filePath,
  optimizedUrl: filePath,
  fileMeta: {
    fileName: file.name,
    url: filePath,
    optimizedUrl: filePath,
    type: "VIDEO",
    description: messageInputDto.content,
    entityType: MessageFileEntityType.VIDEO,
  },
});
