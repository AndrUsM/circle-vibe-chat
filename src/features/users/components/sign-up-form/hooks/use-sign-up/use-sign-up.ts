import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { useNotification } from '@core/hooks';
import { request } from '@core/request';

import { SignUpFormInput } from '@features/users/components/sign-up-form/constants';
import { GLOBAL_PAGES_ENUM } from '@core/navigation';

export const useSignUp = () => {
  const notification = useNotification();
  const navigate = useNavigate();

  return useCallback(async (data: SignUpFormInput) => {
    request({
      url: 'auth/sign-up',
      data: {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
      },
      method: 'POST',
    })
      .then(() => {
        request({
          url: 'auth/start-up',
          data: {
            email: data.email,
            password: data.password,
          },
          method: 'POST',
        });
      })
      .then(() => {
        navigate(`/${GLOBAL_PAGES_ENUM.AUTH}/sign-in`);
        notification({
          type: 'success',
          content: 'Check your email, and login with identification-key and password!',
        });
      });
  }, []);
};
