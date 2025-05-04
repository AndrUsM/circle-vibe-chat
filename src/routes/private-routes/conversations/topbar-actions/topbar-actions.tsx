import { ExtendedReactFunctionalComponent, Menu } from "@circle-vibe/shared";

import { Icon } from "@shared/components";
import { useIcons } from "@shared/hooks";

export const TopbarActions: ExtendedReactFunctionalComponent = () => {
  const icons = useIcons();

  return (
    <Menu button={() => <Icon name={icons.cilHamburgerMenu} size={28} />}>
      <div>tests</div>
    </Menu>
  );
};
