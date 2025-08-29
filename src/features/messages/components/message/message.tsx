import {
  MessageType,
  Message as MessageModel,
  getUserFullName,
  composeAvatarFallback,
  MessageFile,
} from '@circle-vibe/shared';

import {
  CenteredVertialLayout,
  Button,
  ClusterLayout,
  StackLayout,
  IconLayout,
  ExtendedReactFunctionalComponent,
  Icon,
  noop,
  Show,
  useBoolean,
  useFormatDatetime,
  useIcons,
  FormatDateTime,
} from '@circle-vibe/components';

import { FormikHelpers } from 'formik';

import { UserAvatar } from '@shared/components';

import {
  MessageForm,
  MessageFormValues,
  TextMessagePreview,
  useSplitMessageContent,
  useThreadParticipants,
} from '@features/messages';

import { MessageFiles } from './message-files/message-files';

import './message.scss';

interface MessageProps {
  message: MessageModel;
  chatParticipantId: number;
  isSavedMessages?: boolean;
  onStopTyping?: VoidFunction;
  onStartTyping?: VoidFunction;
  onDeleteMessage: (messageId: number) => void;
  onUpdateMessage: (messageId: number) => void;
  onOpenFile: (file: MessageFile) => void;
  onReplyMessage?: (
    fileMessage: MessageFormValues,
    formikUtils: FormikHelpers<MessageFormValues>,
  ) => Promise<void>;
}

export const Message: ExtendedReactFunctionalComponent<MessageProps> = ({
  message,
  chatParticipantId,
  isSavedMessages = false,
  onStopTyping = noop,
  onStartTyping = noop,
  onDeleteMessage,
  onUpdateMessage,
  onOpenFile,
  onReplyMessage = noop,
}) => {
  const icons = useIcons();
  const formatDateTime = useFormatDatetime();
  const [isReplyMessageEnabled, toggleIsReplyMessageEnabled] = useBoolean(false);

  const { content, files, messageType, sender, updatedAt } = message;

  const { messageContent, isContentTooLong, toggleOfTooLongMessage, toggleIconIcon } =
    useSplitMessageContent(content);
  const senderFullName = getUserFullName(sender?.user);
  const imageFallback = composeAvatarFallback(sender?.user);
  const threadParticipants = useThreadParticipants(message?.threads);

  const avatarUrl = sender?.user?.avatarUrl;

  return (
    <StackLayout space='0.5rem' className='element_effect-hover-reverse'>
      <StackLayout space='0.5rem' className='bg-tertiary rounded-1 p-2 rounded-2'>
        <Show.When isTrue={Boolean(content) && !files?.length}>
          <StackLayout
            space='0.5rem'
            justifyContent='space-between'
            className='white-space-pre-wrap'
          >
            <TextMessagePreview>{messageContent}</TextMessagePreview>

            <Show.When isTrue={isContentTooLong}>
              <Button color='primary' onClick={toggleOfTooLongMessage}>
                <Icon name={toggleIconIcon} size={16} color='white' />
              </Button>
            </Show.When>
          </StackLayout>
        </Show.When>

        <Show.When isTrue={Boolean(files?.length)}>
          <MessageFiles files={files} messageType={messageType} onOpenFile={onOpenFile} />
        </Show.When>

        <ClusterLayout
          space='0.5rem'
          alignItems='center'
          justifyContent='space-between'
          className='flex-wrap'
        >
          {/* SENDER, TIMESTAMP */}
          <ClusterLayout space='0.5rem' alignItems='center'>
            <Show.When isTrue={Boolean(sender) && !isSavedMessages}>
              <UserAvatar
                user={sender.user}
                url={avatarUrl ?? undefined}
                fallback={imageFallback}
              />

              <div className='italic'>{senderFullName}</div>
            </Show.When>

            <div>{formatDateTime(updatedAt, FormatDateTime.DATE_TIME)}</div>
          </ClusterLayout>

          {/* THREAD INFORMATION, ACTIONS */}
          <ClusterLayout space='0.5rem' alignItems='center'>
            <Show.When
              isTrue={!isSavedMessages && sender.id !== chatParticipantId && !message?.threadId}
            >
              {/* THREAD PARTICIPANTS */}
              <Show.When isTrue={Boolean(message?.threads?.length)}>
                <CenteredVertialLayout space='0.5rem'>
                  {threadParticipants.slice(0, 2)?.map((threadParticipant) => (
                    <UserAvatar
                      url={sender?.user?.avatarUrl}
                      fallback={composeAvatarFallback(threadParticipant)}
                      key={`${message.id}_thread_${threadParticipant.id}`}
                    />
                  ))}

                  <Show.When isTrue={threadParticipants?.length > 2}>
                    <IconLayout space='0.15rem'>
                      <Icon name={icons.cilPlus} color='var(--cv-dark)' size={10} />

                      <span className='text-sm italic'>
                        {threadParticipants.slice(2).length} more
                      </span>
                    </IconLayout>
                  </Show.When>
                </CenteredVertialLayout>
              </Show.When>

              <Button
                color={message?.childThreadId ? 'primary' : 'secondary'}
                size='small'
                onClick={toggleIsReplyMessageEnabled}
              >
                <IconLayout space='0.25rem'>
                  <Icon color='var(--cv-light)' name={icons.cilChatBubble} size={14} />

                  <Show.When isTrue={Boolean(message?.threads?.length)}>
                    <span className='font-medium text-sm'>{message?.threads?.length}</span>
                  </Show.When>
                </IconLayout>
              </Button>
            </Show.When>

            {/* DELETE, UPDATE ACTIONS */}
            <Show.When isTrue={isSavedMessages || sender.id === chatParticipantId}>
              <Show.When isTrue={message.messageType === MessageType.TEXT}>
                <Button color='secondary' size='small' onClick={() => onUpdateMessage(message.id)}>
                  <Icon color='var(--cv-light)' name={icons.cilPen} size={14} />
                </Button>
              </Show.When>

              <Button color='secondary' size='small' onClick={() => onDeleteMessage(message.id)}>
                <Icon color='var(--cv-light)' name={icons.cilDelete} size={14} />
              </Button>
            </Show.When>
          </ClusterLayout>
        </ClusterLayout>
      </StackLayout>

      {/*THREADS  */}
      <Show.When isTrue={isReplyMessageEnabled}>
        <StackLayout className='pl-6'>
          <Show.When isTrue={Boolean(message.childThreadId)}>
            {message.threads?.map((childMessage: MessageModel) => (
              <Message
                key={childMessage.id}
                message={childMessage}
                chatParticipantId={chatParticipantId}
                onOpenFile={onOpenFile}
                onUpdateMessage={onUpdateMessage}
                onDeleteMessage={onDeleteMessage}
              />
            ))}
          </Show.When>

          {/* SEND MESSAGE FORM */}
          <Show.When isTrue={message.sender?.id !== chatParticipantId}>
            <MessageForm
              onStartTyping={onStartTyping}
              onStopTyping={onStopTyping}
              initialValues={{
                parentMessageId: message.id,
                threadId: message.childThreadId,
              }}
              onCreateMessage={onReplyMessage}
            />
          </Show.When>
        </StackLayout>
      </Show.When>
    </StackLayout>
  );
};
