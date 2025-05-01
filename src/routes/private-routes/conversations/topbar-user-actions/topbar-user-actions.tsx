import { ExtendedReactFunctionalComponent } from "@circle-vibe/shared";
import { Icon } from "@shared/components/icon";
import { Menu } from "@shared/components/menu";
import { useIcons } from "@shared/hooks";

export const UserActions: ExtendedReactFunctionalComponent = () => {
  const icons = useIcons();

  return (
    <Menu
      button={() => (
        <Icon name={icons.cilHamburgerMenu} size={28} />
      )}
    >
      <div>tests</div>
    </Menu>
  );
};
