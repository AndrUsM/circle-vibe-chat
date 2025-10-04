import { useCallback } from 'react';

import { User } from '@circle-vibe/shared';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useCurrentUser, useNotification } from '@core/hooks';
import { GLOBAL_PAGES_ENUM, PrivatePagesEnum } from '@core/navigation';
import { request } from '@core/request';
import { setAuthToken } from '@core/utils';

import { SignInFormInput } from '@features/users/components/sign-in-form/types';

interface Response {
  token: string;
  user: User;
}

export const useSignIn = () => {
  const { t } = useTranslation();
  const notification = useNotification();
  const navigate = useNavigate();
  const { setUser } = useCurrentUser();

  return useCallback(async (data: SignInFormInput) => {
    try {
      const response = await request<Response>({
        url: 'auth/sign-in',
        data,
        method: 'POST',
      });

      const { token, user } = response?.data ?? {};

      setAuthToken(String(token));
      setUser(user);

      notification({
        type: 'success',
        content: 'Successfully signed in!',
      });

      void navigate(`/${GLOBAL_PAGES_ENUM.APP}/${PrivatePagesEnum.CONVERSATIONS}`);
    } catch {
      notification({
        type: 'warning',
        content: t('auth.wrong-credentials.message'),
      });
    }
  }, []);
};
