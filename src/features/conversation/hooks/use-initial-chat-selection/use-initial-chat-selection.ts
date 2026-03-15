import { useEffect } from 'react';

import { Chat } from '@circle-vibe/shared';

type SelectChatIdFn = (chat: Chat) => void;

export const useInitialChatSelection = (
  chats: Chat[],
  selectChatId: SelectChatIdFn,
  hasSelectedChat: boolean,
) => {
  useEffect(() => {
    if (hasSelectedChat || !chats?.length) {
      return;
    }

    const defaultChat = chats[0];
    selectChatId(defaultChat);
  }, [hasSelectedChat, chats]);
};
