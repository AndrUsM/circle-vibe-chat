import {
  ExtendedReactFunctionalComponent,
  HorizontalDivider,
  StackLayout,
  Modal,
} from "@circle-vibe/components";
import { MessageFile } from "@circle-vibe/shared";

import { ConversationForm } from "@features/conversation";
import { FilePreview } from "@features/messages";

import { useTranslation } from "react-i18next";

interface ConversationModalsProps {
  openChatCreationModal: boolean;
  setOpenChatCreationModal: (value: boolean) => void;
  previewFile: MessageFile | null;
  toggleFileDialogVisibility: () => void;
}

export const ConversationModals: ExtendedReactFunctionalComponent<
  ConversationModalsProps
> = ({
  openChatCreationModal,
  setOpenChatCreationModal,
  previewFile,
  toggleFileDialogVisibility,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        isOpen={openChatCreationModal}
        onClose={() => setOpenChatCreationModal(false)}
      >
        <StackLayout>
          <section>
            <p className="text-2xl font-semibold">
              {t("conversations.buttons.create-conversation")}
            </p>

            <HorizontalDivider color="var(--cv-bg-secondary)" />
          </section>

          <ConversationForm />
        </StackLayout>
      </Modal>

      <Modal
        isOpen={Boolean(previewFile)}
        minWidth="52vw"
        onClose={() => toggleFileDialogVisibility()}
      >
        <FilePreview
          messageFile={previewFile as MessageFile}
        />
      </Modal>
    </>
  );
};
