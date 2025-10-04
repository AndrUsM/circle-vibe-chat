import { useCallback } from 'react';

import { User } from '@circle-vibe/shared';

import { toggleArrayItem } from '@shared/utils';
import { ChatParticipantsWithUser } from '@api/conversations';

import { ConversationsFilterBarFormValues } from '../../types';

export const useToggleParticipantsFilter = (chatParticipants: ChatParticipantsWithUser[]) => {
  return useCallback(
    (
      values: number[],
      user: User,
      setValue: (
        value: any,
        shouldValidate?: boolean,
      ) => void,
    ) => {
      const items = toggleArrayItem(values ?? [], user.id, (a, b) => a === b);
      setValue(items);
    },
    [chatParticipants],
  );
};
