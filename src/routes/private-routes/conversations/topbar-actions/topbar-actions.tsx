import { ExtendedReactFunctionalComponent, Menu, useIcons, Icon } from "@circle-vibe/shared";

export const TopbarActions: ExtendedReactFunctionalComponent = () => {
  const icons = useIcons();

  return (
    <Menu button={() => <Icon name={icons.cilHamburgerMenu} size={28} />}>
      <div>tests</div>
    </Menu>
  );
};
