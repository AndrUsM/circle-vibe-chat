import { useCallback } from 'react';

import { User } from '@circle-vibe/shared';

import { useNavigate } from 'react-router-dom';

import { useCurrentSessionCredentials, useNotification } from '@core/hooks';
import { GLOBAL_PAGES_ENUM, PrivatePagesEnum } from '@core/navigation';
import { request } from '@core/request';

interface RestorePasswordInput {
  email: string;
  password: string;
}

interface RestorePasswordOutput {
  token: string;
  user: User;
}

export const useRestorePassword = () => {
  const notification = useNotification();
  const navigate = useNavigate();
  const { setCurrentUser, setToken } = useCurrentSessionCredentials();

  return useCallback(async (data: RestorePasswordInput) => {
    const response = await request<RestorePasswordOutput>({
      url: 'auth/restore-password',
      method: 'PUT',
      data,
    });

    if (!response?.data) {
      notification({
        type: 'error',
        content: 'Failed to restore password',
      });

      return;
    }

    const { user, token } = response.data;

    setCurrentUser(user);
    setToken(token);

    void navigate(`/${GLOBAL_PAGES_ENUM.APP}/${PrivatePagesEnum.CONVERSATIONS}`, { replace: true });

    notification({
      type: 'success',
      content: 'Password has been restored',
    });
  }, []);
};
