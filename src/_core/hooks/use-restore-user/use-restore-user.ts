import { useCallback, useEffect } from 'react';

import { User } from '@circle-vibe/shared';

import { request } from '@core/request';

import { useCurrentSessionCredentials } from '../use-current-session-credentials';
import { useCurrentUser } from '../use-current-user';

export const useRestoreUser = () => {
  const { setCurrentUser, currentUser: user, token } = useCurrentSessionCredentials();
  const { setUser } = useCurrentUser();

  useEffect(() => {
    if (user !== null) {
      return;
    }

    if (token) {
      loadUser();
    }
  }, [user, token]);

  const loadUser = useCallback(() => {
    request<User>({
      method: 'GET',
      url: `user/by-token/${token}`,
    }).then((response) => {
      setCurrentUser(response.data);
      setUser(response.data);
    });
  }, [token]);
};
