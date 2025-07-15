import {
  Button,
  ClusterLayout,
  ExtendedReactFunctionalComponent,
  HorizontalDivider,
  StackLayout,
} from "@circle-vibe/components";
import { useTranslation } from "react-i18next";

export interface ConfirmationModalLayoutProps {
  children: React.ReactNode;
  confirmButtonLabel?: string;
  confirmButtonColor?: string;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
}

export const ConfirmationModalLayout: ExtendedReactFunctionalComponent<
  ConfirmationModalLayoutProps
> = ({ children, confirmButtonLabel, confirmButtonColor = 'primary', onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <StackLayout className="pr-6" space="1rem">
      {children}

      <HorizontalDivider color="var(--cv-bg-secondary)" />

      <ClusterLayout justifyContent="center" space="2rem" alignItems="center">
        <Button size="medium" color="secondary" onClick={onClose}>
          {t("button.actions.close")}
        </Button>

        <Button size="medium" color={confirmButtonColor} onClick={onConfirm}>
          {confirmButtonLabel ?? t("button.actions.confirm")}
        </Button>
      </ClusterLayout>
    </StackLayout>
  );
};
