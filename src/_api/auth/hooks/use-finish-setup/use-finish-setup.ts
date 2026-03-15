import { useCallback } from 'react';

import { useNotification } from '@core/hooks';
import { request } from '@core/request';

export const useFinishAccountSetup = () => {
  const notification = useNotification();

  return useCallback(async (userId: number) => {
    const response = await request<{
      token: string;
    }>({
      url: `auth/${userId}/start-up`,
      method: 'POST'
    });

    if (response?.status < 400) {
			notification({
				type: 'success',
				content: 'Finished!'
			});

      return response;
    }

  }, [notification]);
};
