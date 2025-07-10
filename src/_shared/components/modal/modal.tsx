import { useEffect } from "react";
import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

import './modal.scss';

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export const Modal: ExtendedReactFunctionalComponent<ModalProps> = ({
  onClose,
  isOpen,
  children,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
