import { useCallback } from 'react';

import { Thread } from '@circle-vibe/shared';

import { request } from '@core/request';

interface UseReplyMessageParams {
  chatId: number;
  parentMessageId: number;
}

export const useCreateThread = () => {
  return useCallback(async (data: UseReplyMessageParams) => {
    const response = await request({
      url: 'threads',
      method: 'POST',
      data,
    });

    return response.data as Thread;
  }, []);
};
