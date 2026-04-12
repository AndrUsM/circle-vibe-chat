import { useCallback } from 'react';

import { ChatSocketCommand, CreateChatSocketParams } from '@circle-vibe/shared';

import { useSocket } from '@core/hooks';

import { CreateConversationFormValues } from '@features/conversation';
import { parseSocketPayload } from '@shared/utils';

export const useHandleChatCreation = (onSuccess?: VoidFunction) => {
  const { socket } = useSocket();
  const handleChatCreation = useCallback(async (formValues: CreateConversationFormValues) => {
    const payload: CreateChatSocketParams = formValues;

    socket.emit(ChatSocketCommand.CREATE_CHAT, parseSocketPayload(payload));

    if (onSuccess) {
      onSuccess();
    }
  }, []);

  return handleChatCreation;
};
