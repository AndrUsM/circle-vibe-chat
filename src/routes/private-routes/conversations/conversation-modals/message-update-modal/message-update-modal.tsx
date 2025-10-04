import { Modal } from '@circle-vibe/components';
import {
  MessageUpdateDialog,
  MessageUpdateDialogState,
  MessageUpdateFormValues,
} from '@features/messages';

interface MessageUpdateModalProps {
  messageUpdateDialogState: MessageUpdateDialogState | null;
  isOpen: boolean;
  onClose: VoidFunction;
  onSuccess: VoidFunction;
}

export const MessageUpdateModal: React.FC<MessageUpdateModalProps> = ({
  isOpen,
  messageUpdateDialogState,
  onClose,
  onSuccess,
}) => {
  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header onClose={onClose}>Update Message</Modal.Header>

      <Modal.Body>
        <MessageUpdateDialog
          chatId={Number(messageUpdateDialogState?.chatId)}
          messageId={Number(messageUpdateDialogState?.messageId)}
          initialValues={messageUpdateDialogState?.initialValues as MessageUpdateFormValues}
          onSuccess={() => {
            onSuccess();
            onClose();
          }}
        />
      </Modal.Body>
    </Modal.Root>
  );
};
