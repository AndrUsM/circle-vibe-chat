import { useCallback } from 'react';

import { request } from '@core/request';

interface ConfirmAccountInput {
  email: string;
  code: string;
}

export const useConfirmAccount = () => {
  return useCallback((data: ConfirmAccountInput) => {
    return request<boolean>({
      url: 'user-confirmation',
      method: 'POST',
      data,
    });
  }, []);
};
