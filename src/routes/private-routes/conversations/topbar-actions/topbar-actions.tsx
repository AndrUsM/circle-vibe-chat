import { useCallback } from 'react';

import {
  ExtendedReactFunctionalComponent,
  Menu,
  useIcons,
  Icon,
  Button,
  IconLayout,
} from '@circle-vibe/components';

import { useNavigate } from 'react-router-dom';

import { cookiesService, localStorageService } from '@core/services';
import { useSocket } from '@core/hooks';

export const TopBarActions: ExtendedReactFunctionalComponent = () => {
  const { cilHamburgerMenu, cilAccountLogout } = useIcons();
  const navigate = useNavigate();
  const { socket } = useSocket();

  const handleLogout = useCallback(() => {
    cookiesService.clear();
    localStorageService.clear();
    socket.disconnect();

    void navigate('/auth/sign-in');
  }, [navigate]);

  return (
    <Menu button={() => <Icon name={cilHamburgerMenu} size={28} />}>
      <Button onClick={handleLogout}>
        <IconLayout space="0.5rem">
          <Icon color='var(--cv-light)' name={cilAccountLogout} size={16} />

          <span>Logout</span>
        </IconLayout>
      </Button>
    </Menu>
  );
};
