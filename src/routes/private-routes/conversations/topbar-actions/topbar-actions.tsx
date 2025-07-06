import {
  ExtendedReactFunctionalComponent,
  Menu,
  useIcons,
  Icon,
  Button,
} from "@circle-vibe/components";
import { cookiesService, localStorageService } from "@core/services";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const TopbarActions: ExtendedReactFunctionalComponent = () => {
  const icons = useIcons();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    cookiesService.clear();
    localStorageService.clear();

    void navigate("/auth/sign-in");
  }, []);

  return (
    <Menu button={() => <Icon name={icons.cilHamburgerMenu} size={28} />}>
      <Button onClick={handleLogout}>Logout</Button>
    </Menu>
  );
};
