import { useMemo } from 'react';

import SharedEnums from '@circle-vibe/shared';
import { Chat as ChatModel, ChatParticipant } from '@circle-vibe/shared';

import {
  ExtendedReactFunctionalComponent,
  Show,
  StackLayout,
  useFormatDatetime,
  ClusterLayout,
} from '@circle-vibe/components';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { MessageShortPreview } from '@features/messages';

import { ChatActions } from './chat-actions';

import './chat.scss';

interface ChatProps {
  chat: ChatModel;
  chatParticipant: ChatParticipant | null;
  selected: boolean;
  onClick: VoidFunction;
}

export const Chat: ExtendedReactFunctionalComponent<ChatProps> = ({
  chat,
  chatParticipant,
  selected,
  onClick,
}) => {
  const { t } = useTranslation();
  const format = useFormatDatetime();
  const { name, readableName, isSavedMessages, lastMessage, hasUnreadMessages, empty, updatedAt } =
    chat;
  const chatName = useMemo(() => {
    const useSavedMessagesKey = readableName.includes('saved-messages') || isSavedMessages;
    return useSavedMessagesKey ? t(name) : name;
  }, [name, readableName]);

  return (
    <ClusterLayout
      space='0.5rem'
      justifyContent='space-between'
      alignItems='center'
      className={classNames('relative overflow-hidden chat p-2 rounded-2 cursor-pointer', {
        selected: selected,
        'element_effect-hover-reverse': !selected,
        'bg-warning': hasUnreadMessages,
        'bg-tertiary': !hasUnreadMessages,
      })}
      onClick={onClick}
    >
      <StackLayout space='0.15rem' className='text-sm max-w-full'>
        <span className='block font-bold truncate'>{chatName}</span>

        <span className='truncate'>Last seen: {format(updatedAt)}</span>

        <Show.When isTrue={Boolean(lastMessage)}>
          <div className='p-1'>
            <MessageShortPreview message={lastMessage as SharedEnums.Message} />
          </div>
        </Show.When>

        <Show.When isTrue={Boolean(empty)}>
          <span>{t('chat.empty')}</span>
        </Show.When>
      </StackLayout>

      <Show.When isTrue={Boolean(selected && chatParticipant)}>
        <ChatActions chat={chat} />
      </Show.When>
    </ClusterLayout>
  );
};
