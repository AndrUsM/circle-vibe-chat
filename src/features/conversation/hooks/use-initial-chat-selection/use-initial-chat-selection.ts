import { useEffect } from 'react';

import { Chat } from '@circle-vibe/shared';

type SelectChatIdFn = (chatId: number) => void;

export const useInitialChatSelection = (
  chats: Chat[],
  selectChatId: SelectChatIdFn,
  hasSelectedChat: boolean,
) => {
  useEffect(() => {
    if (hasSelectedChat || !chats?.length) {
      return;
    }

    const defaultChatId = chats[0]?.id;
    selectChatId(defaultChatId);
  }, [hasSelectedChat, chats]);
};
