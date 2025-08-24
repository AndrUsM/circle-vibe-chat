import { useMemo } from 'react';

import { User } from '@circle-vibe/shared';

import { AUTH_TOKEN_KEY, SESSION_USER_KEY } from '@core/constants';
import { cookiesService, localStorageService } from '@core/services';
import { setAuthToken } from '@core/utils';

export const useCurrentSessionCredentials = () => {
  const token: string | undefined = cookiesService.get(AUTH_TOKEN_KEY);
  const currentUser: User | null = localStorageService.get(SESSION_USER_KEY);

  const setToken = (token?: string) => {
    if (token) {
      setAuthToken(token);

      return;
    }

    cookiesService.remove(AUTH_TOKEN_KEY);
  };

  const setCurrentUser = (user: User | null) => {
    localStorageService.set(SESSION_USER_KEY, user);
  };

  return useMemo(
    () => ({
      token,
      currentUser,
      setToken,
      setCurrentUser,
    }),
    [token, currentUser],
  );
};
