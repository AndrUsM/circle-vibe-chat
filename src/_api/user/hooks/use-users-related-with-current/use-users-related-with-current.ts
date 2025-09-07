import { useCallback } from 'react';

import { ChatParticipant } from '@circle-vibe/shared';

import { useCurrentUser, useNotification } from '@core/hooks';
import { request } from '@core/request';

export const useUsersRelatedWithCurrent = () => {
  const notification = useNotification();
  const { user } = useCurrentUser();

  return useCallback(async () => {
    const response = await request<ChatParticipant[]>({
      method: 'GET',
      url: `user/list-related-with-user/${user.id}`,
    });

    if (!response?.data) {
      notification({
        type: 'error',
        content: 'Failed to get users related with current user',
      });

      return [];
    }


    return response.data ?? [];
  }, []);
};
