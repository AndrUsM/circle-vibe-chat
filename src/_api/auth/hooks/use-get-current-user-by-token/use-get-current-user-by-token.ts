import { useCallback } from 'react';

import { User } from '@circle-vibe/shared';

import { useCurrentSessionCredentials } from '@core/hooks';
import { request } from '@core/request';
import { cookiesService, localStorageService } from '@core/services';

import { useRefreshToken } from '../use-refresh-token';

export const useGetCurrentUserByToken = () => {
  const refreshToken = useRefreshToken();
  const { setCurrentUser, token } = useCurrentSessionCredentials();

  return useCallback(async () => {
    request<User>({
      url: 'auth/current',
      method: 'GET',
    })
      .then((response) => {
        if (response?.data?.id) {
          setCurrentUser(response.data);

          return;
        }

        return response;
      })
      .catch((error) => {
        if (error.status === 403 && token) {
          refreshToken();
          window.location.reload();
        }
      });
  }, [refreshToken]);
};
