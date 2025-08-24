import { useCallback } from 'react';

import { ChatParticipant } from '@circle-vibe/shared';

import { FormikErrors } from 'formik';

import { toggleArrayItem } from '@shared/utils';

import { MessagesFilterBarFormValues } from '../../types';

export const useToggleParticipantsFilter = (chatParticipants: ChatParticipant[]) => {
  return useCallback(
    (
      values: MessagesFilterBarFormValues,
      participant: ChatParticipant,
      setValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
      ) => Promise<void | FormikErrors<MessagesFilterBarFormValues>>,
    ) => {
      const items = toggleArrayItem(values?.senderIds ?? [], participant.id, (a, b) => a === b);

      setValue('senderIds', items);
    },
    [chatParticipants],
  );
};
