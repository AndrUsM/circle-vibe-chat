import {
  Button,
  ClusterLayout,
  StackLayout,
} from "@circle-vibe/components";
import { useTranslation } from "react-i18next";

export interface ConfirmationModalLayoutProps {
  confirmButtonLabel?: string;
  confirmButtonColor?: string;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
}

export const ConfirmationModalLayout: React.FC<
  ConfirmationModalLayoutProps
> = ({ confirmButtonLabel, confirmButtonColor = 'primary', onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <StackLayout className="pr-6" space="1rem">
      <ClusterLayout justifyContent="center" space="1.5rem" alignItems="center" className="flex-1">
        <Button className="flex-1" size="medium" color="secondary" onClick={onClose}>
          {t("button.actions.close")}
        </Button>

        <Button className="flex-1" size="medium" color={confirmButtonColor} onClick={onConfirm}>
          {confirmButtonLabel ?? t("button.actions.confirm")}
        </Button>
      </ClusterLayout>
    </StackLayout>
  );
};
