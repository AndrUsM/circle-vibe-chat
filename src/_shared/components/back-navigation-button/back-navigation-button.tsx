import { Button, Icon, noop, useIcons } from "@circle-vibe/components";

import { IconLayout } from "../icon-layout";

interface BackNavigationButtonProps {
  onClick?: VoidFunction;
}

export const BackNavigationButton: React.FC<BackNavigationButtonProps> = ({
  onClick = noop,
}) => {
  const { cilArrowThickLeft } = useIcons();

  return (
    <Button size="medium" color="primary" onClick={onClick}>
      <IconLayout space="0.5rem">
        <Icon color="var(--cv-light)" size={12} name={cilArrowThickLeft} />

        <span>Back</span>
      </IconLayout>
    </Button>
  );
};
