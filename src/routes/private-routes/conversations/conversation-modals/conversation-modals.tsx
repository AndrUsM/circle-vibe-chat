import {
  ExtendedReactFunctionalComponent,
  HorizontalDivider,
  StackLayout,
} from "@circle-vibe/components";
import { MessageFile } from "@circle-vibe/shared";

import { AccountSettings, ConversationForm } from "@features/conversation";
import { FilePreview } from "@features/messages";

import { Modal } from "@shared/components";
import { useTranslation } from "react-i18next";

interface ConversationModalsProps {
  openAccountSettings: boolean;
  setOpenAccountSettings: (value: boolean) => void;
  openChatCreationModal: boolean;
  setOpenChatCreationModal: (value: boolean) => void;
  previewFile: MessageFile | null;
  toggleFileDialogVisibility: () => void;
}

export const ConversationModals: ExtendedReactFunctionalComponent<
  ConversationModalsProps
> = ({
  openAccountSettings,
  setOpenAccountSettings,
  openChatCreationModal,
  setOpenChatCreationModal,
  previewFile,
  toggleFileDialogVisibility,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        isOpen={openAccountSettings}
        onClose={() => setOpenAccountSettings(false)}
      >
        <AccountSettings />
      </Modal>

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
        onClose={() => toggleFileDialogVisibility()}
      >
        <FilePreview
          messageFile={previewFile as MessageFile}
          onClose={toggleFileDialogVisibility}
        />
      </Modal>
    </>
  );
};
