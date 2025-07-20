import { useCallback } from "react";
import { createRoot } from "react-dom/client";

import { Modal } from "@circle-vibe/components";
import { ConfirmationModalLayout } from "./confirmation-modal-layout";

let modalRoot = document.getElementById("modal-root");

export const useConfirmation = () => {
  return useCallback(
    (
      content: React.ReactNode | string,
      confirmButtonColor?: string,
      minWidth?: string
    ): Promise<boolean> => {
      const container = document.createElement("div");
      const root = createRoot(container);
      modalRoot!.appendChild(container);

      return new Promise((resolve) => {
        const cleanup = () => {
          root.unmount();

          if (container.parentNode) {
            container.parentNode.removeChild(container);
          }
        };

        const onConfirm = () => {
          cleanup();
          resolve(true);
        };

        const onClose = () => {
          cleanup();
        };

        root.render(
          <Modal isOpen={true} minWidth={minWidth ?? "300px"} onClose={onClose}>
            <ConfirmationModalLayout
              confirmButtonColor={confirmButtonColor}
              onConfirm={onConfirm}
              onClose={onClose}
            >
              {content}
            </ConfirmationModalLayout>
          </Modal>
        );
      });
    },
    []
  );
};
