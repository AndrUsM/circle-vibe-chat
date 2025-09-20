import { useCallback } from 'react';

import { Modal } from '@circle-vibe/components';

import { createRoot } from 'react-dom/client';

import { ConfirmationModalLayout } from './confirmation-modal-layout';

let modalRoot = document.getElementById('modal-root');

export const useConfirmation = () => {
  return useCallback(
    (content: React.ReactNode | string, confirmButtonColor?: string): Promise<boolean> => {
      const container = document.createElement('div');
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
          <Modal.Root minWidth='20rem' isOpen={true} onClose={onClose}>
            <Modal.Header onClose={onClose}>{content}</Modal.Header>

            <Modal.Body>
              <ConfirmationModalLayout
                confirmButtonColor={confirmButtonColor}
                onConfirm={onConfirm}
                onClose={onClose}
              />
            </Modal.Body>
          </Modal.Root>,
        );
      });
    },
    [],
  );
};
