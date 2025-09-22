import React from 'react';

import { Checkbox, FormControl, Label, Select, StackLayout } from '@circle-vibe/components';

import { useTranslation } from 'react-i18next';

import { useFilter } from '@shared/components';

export const ConversationsFilterBar: React.FC = () => {
  const { t } = useTranslation();
  const { filter: emptyFilter, setFilter: setEmptyFilter } = useFilter('empty');
  const { filter: hiddenFilter, setFilter: setHiddenFilter } = useFilter('hidden');
  const { filter: removedFilter, setFilter: setRemovedFilter } = useFilter('removed');
  const { filter: isPrivateChat, setFilter: setIsPrivateChat } = useFilter('isPrivateChat');

  return (
    <StackLayout space='1rem'>
      <StackLayout space='0.25rem'>
        <Checkbox checked={emptyFilter} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmptyFilter(e.currentTarget.checked ?? undefined)}>
          Show only empty conversations
        </Checkbox>

        <Checkbox checked={hiddenFilter} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHiddenFilter(e.currentTarget.checked ?? undefined)}>
          Show hidden from search conversations
        </Checkbox>

        <Checkbox
          checked={removedFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRemovedFilter(e.currentTarget.checked ?? undefined)}
        >
          Show archived conversations
        </Checkbox>

        <Checkbox
          checked={isPrivateChat}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsPrivateChat(e.currentTarget.checked ?? undefined)}
        >
          Show private conversations
        </Checkbox>
      </StackLayout>
    </StackLayout>
  );
};
