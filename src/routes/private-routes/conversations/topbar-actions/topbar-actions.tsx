import { useCallback } from 'react';

import {
  ExtendedReactFunctionalComponent,
  Menu,
  useIcons,
  Icon,
  Button,
} from '@circle-vibe/components';

import { useNavigate } from 'react-router-dom';

import { cookiesService, localStorageService } from '@core/services';

export const TopBarActions: ExtendedReactFunctionalComponent = () => {
  const icons = useIcons();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    cookiesService.clear();
    localStorageService.clear();

    void navigate('/auth/sign-in');
  }, [navigate]);

  return (
    <Menu button={() => <Icon name={icons.cilHamburgerMenu} size={28} />}>
      <Button onClick={handleLogout}>Logout</Button>
    </Menu>
  );
};
