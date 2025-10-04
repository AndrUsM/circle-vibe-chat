import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import {
  CenteredVertialLayout,
  Checkbox,
  HorizontalDivider,
  Show,
  StackLayout,
} from '@circle-vibe/components';
import { getUserFullName } from '@circle-vibe/shared';

import { useFilter } from '@shared/components';
import { ChatParticipantsWithUser, useConversationsParticipants } from '@api/conversations';

import { useToggleParticipantsFilter } from './hooks';

import './conversations-filter-bar.scss';

interface ConversationsFilterBarProps {
  userId: number;
}

export const ConversationsFilterBar: React.FC<ConversationsFilterBarProps> = ({ userId }) => {
  const { t } = useTranslation();
  const [conversationParticipants, setConversationParticipants] = useState<
    ChatParticipantsWithUser[]
  >([]);
  const { filter: emptyFilter, setFilter: setEmptyFilter } = useFilter('empty');
  const { filter: removedFilter, setFilter: setRemovedFilter } = useFilter('removed');
  const { filter: isPrivateChat, setFilter: setIsPrivateChat } = useFilter('isPrivateChat');
  const { filter: userIdsFilter, setFilter: setUserIdsFilter } = useFilter('userIds');

  const getConversationParticipants = useConversationsParticipants();
  const toggleChartParticipant = useToggleParticipantsFilter(conversationParticipants);

  useEffect(() => {
    if (userId) {
      getConversationParticipants({
        userId,
      }).then(setConversationParticipants);
    }
  }, [userId]);

  return (
    <StackLayout className='flex-wrap max-w-full'>
      <StackLayout space='0.25rem'>
        <Checkbox
          checked={emptyFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmptyFilter(e.currentTarget.checked)
          }
        >
          {t('filters.conversation.empty-conversations.label')}
        </Checkbox>

        <Checkbox
          checked={removedFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRemovedFilter(e.currentTarget.checked)
          }
        >
          {t('filters.conversation.archived-conversations.label')}
        </Checkbox>

        <Checkbox
          checked={isPrivateChat}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIsPrivateChat(e.currentTarget.checked)
          }
        >
          {t('filters.conversation.private-conversations.label')}
        </Checkbox>
      </StackLayout>

      <Show.When isTrue={conversationParticipants.length > 1}>
        <HorizontalDivider color='var(--cv-bg-secondary)' />

        <StackLayout
          space='0.5rem'
          className='flex-wrap conversations-filter-bar__participants overflow-y-container overflow-x-hidden max-w-full'
        >
          <div className='text-md'>{t('filters.conversation.chat-participants.label')}:</div>

          {conversationParticipants.map(({ user }) => (
            <CenteredVertialLayout
              className={classNames('w-full overflow-x-hidden', {
                'element_state-disabled': user.id === userId,
              })}
            >
              <Checkbox
                disabled={user.id === userId}
                checked={userIdsFilter?.includes(user.id)}
                onClick={() => {
                  toggleChartParticipant(userIdsFilter, user, setUserIdsFilter);
                }}
              >
                {getUserFullName(user)}
              </Checkbox>
            </CenteredVertialLayout>
          ))}
        </StackLayout>
      </Show.When>
    </StackLayout>
  );
};
