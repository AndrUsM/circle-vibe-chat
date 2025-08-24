import { useMemo } from 'react';

import { Message, User } from '@circle-vibe/shared';

export const useThreadParticipants = (messages?: Message[]) => {
  return useMemo(() => {
    if (!messages?.length) {
      return [];
    }

    const mapOfThreadParticipants = messages.reduce<Map<number, User>>((acc, thread) => {
      const userId = thread.sender.user.id;

      if (!acc.has(userId)) {
        acc.set(userId, thread.sender.user);
      }

      return acc;
    }, new Map<number, User>());

    return Array.from(mapOfThreadParticipants.values());
  }, [messages]);
};
