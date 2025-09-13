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

export const TopBarActions: ExtendedReactFunctionalComponent = () => {
  const { cilHamburgerMenu, cilAccountLogout } = useIcons();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    cookiesService.clear();
    localStorageService.clear();

    void navigate('/auth/sign-in');
  }, [navigate]);

  return (
    <Menu button={() => <Icon name={cilHamburgerMenu} size={28} />}>
      <Button onClick={handleLogout}>
        <IconLayout>
          <Icon color='var(--cv-light)' name={cilAccountLogout} size={12} />

          <span>Logout</span>
        </IconLayout>
      </Button>
    </Menu>
  );
};
