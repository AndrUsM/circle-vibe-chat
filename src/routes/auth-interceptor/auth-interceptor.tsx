import { useEffect } from 'react';

import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

import { useLocation, useNavigate } from 'react-router-dom';

import { PrivatePagesEnum, PublicPagesEnum } from '@core/navigation';
import { getAuthToken } from '@core/utils';

export const AuthInterceptor: ExtendedReactFunctionalComponent = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();

    if (!token && !location.pathname.includes('auth')) {
      navigate(`/auth/${PublicPagesEnum.SIGN_IN}`, { replace: true });
    }

    if (token && !location.pathname.includes('app')) {
      navigate(`/app/${PrivatePagesEnum.CONVERSATIONS}`, { replace: true });
    }
  }, [location.pathname]);

  return children;
};
