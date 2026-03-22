import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '@circle-vibe/shared';

import { useCurrentUser, useNotification } from '@core/hooks';
import { request } from '@core/request';
import { GLOBAL_PAGES_ENUM, PublicPagesEnum } from '@core/navigation';

import { useActiveConversation } from '@features/conversation';

export const useDeleteAccount = () => {
  const { user, clear: clearCurrentUser } = useCurrentUser();
  const notification = useNotification();
  const {clear: clearConversations} = useActiveConversation();
  const navigate = useNavigate();

  return useCallback(async () => {
    const updatedUser = await request<User | null>({
      method: 'DELETE',
      url: `user/${user?.id}`,
    });

    if (!updatedUser?.data) {
      notification({
        type: 'error',
        content: 'Failed to delete account',
      });

      return;
    }

    notification({
      type: 'success',
      content: 'Account successfully deleted!',
    });

    clearCurrentUser();
    clearConversations();

    navigate(`${GLOBAL_PAGES_ENUM.APP}/${PublicPagesEnum.SIGN_IN}`);
  }, []);
};
