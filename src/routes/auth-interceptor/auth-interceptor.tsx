import { useEffect } from 'react';

import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

import { useLocation, useNavigate } from 'react-router-dom';

import { GLOBAL_PAGES_ENUM, PrivatePagesEnum, PublicPagesEnum } from '@core/navigation';
import { getAuthToken } from '@core/utils';

export const AuthInterceptor: ExtendedReactFunctionalComponent = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();

    if (!token && !location.pathname.includes(GLOBAL_PAGES_ENUM.AUTH)) {
      navigate(`/${GLOBAL_PAGES_ENUM.AUTH}/${PublicPagesEnum.SIGN_IN}`, { replace: true });
    }

    if (token && !location.pathname.includes(GLOBAL_PAGES_ENUM.APP)) {
      navigate(`/${GLOBAL_PAGES_ENUM.APP}/${PrivatePagesEnum.CONVERSATIONS}`, { replace: true });
    }
  }, [location.pathname]);

  return children;
};
