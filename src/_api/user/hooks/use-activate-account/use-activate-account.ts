import { useCallback } from 'react';

import { User } from '@circle-vibe/shared';

import { useCurrentUser, useNotification } from '@core/hooks';
import { request } from '@core/request';

import { useActiveConversation } from '@features/conversation';
import { useNavigate } from 'react-router-dom';
import { GLOBAL_PAGES_ENUM, PublicPagesEnum } from '@core/navigation';

export const useActivateAccount = () => {
  const { user, clear: clearCurrentUser } = useCurrentUser();
  const notification = useNotification();
  const { clear: clearConversations } = useActiveConversation();
  const navigate = useNavigate();

  return useCallback(async () => {
    const updatedUser = await request<User | null>({
      method: 'POST',
      url: `user/${user?.id}/activate-account`,
    });

    if (!updatedUser?.data) {
      notification({
        type: 'error',
        content: 'Failed to activate account',
      });

      return;
    }

    notification({
      type: 'success',
      content: 'Account successfully activated!',
    });

    navigate(`${GLOBAL_PAGES_ENUM.APP}/${PublicPagesEnum.SIGN_IN}`);
  }, []);
};
