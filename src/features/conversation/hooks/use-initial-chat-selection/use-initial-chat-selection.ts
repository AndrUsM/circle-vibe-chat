import { Chat } from "@circle-vibe/shared";
import { useEffect } from "react";

type SelectChatIdFn = (chatId: number) => void;

export const useInitialChatSelection = (
  chats: Chat[],
  selectChatId: SelectChatIdFn,
  hasSelectedChat: boolean
) => {
  // selectedChatId || chatParticipant
  useEffect(() => {
    if (hasSelectedChat || !chats?.length) {
      return;
    }

    const defaultChatId = chats[0].id;
    selectChatId(defaultChatId);
  }, [hasSelectedChat, chats]);
};
