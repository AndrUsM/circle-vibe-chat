import { MessageFile } from '@circle-vibe/shared';

import { ExtendedReactFunctionalComponent, Modal } from '@circle-vibe/components';

import { useTranslation } from 'react-i18next';

import { ConversationForm } from '@features/conversation';
import { FilePreview } from '@features/messages';

interface ConversationModalsProps {
  openChatCreationModal: boolean;
  setOpenChatCreationModal: (value: boolean) => void;
  previewFile: MessageFile | null;
  toggleFileDialogVisibility: () => void;
}

export const ConversationModals: ExtendedReactFunctionalComponent<ConversationModalsProps> = ({
  openChatCreationModal,
  setOpenChatCreationModal,
  previewFile,
  toggleFileDialogVisibility,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal.Root isOpen={openChatCreationModal} onClose={() => setOpenChatCreationModal(false)}>
        <Modal.Header onClose={() => setOpenChatCreationModal(false)}>
          {t('conversations.buttons.create-conversation')}
        </Modal.Header>

        <Modal.Body>
          <ConversationForm />
        </Modal.Body>
      </Modal.Root>

      <Modal.Root
        isOpen={Boolean(previewFile)}
        minWidth='52vw'
        showInlineCloseButton
        onClose={toggleFileDialogVisibility}
      >
        <Modal.Body className='mx-auto'>
          <FilePreview messageFile={previewFile as MessageFile} />
        </Modal.Body>
      </Modal.Root>
    </>
  );
};
