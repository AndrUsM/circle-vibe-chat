import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

import { PrivatePagesEnum, PublicPagesEnum } from "@core/navigation";
import { getAuthToken } from "@core/utils";

export const AuthInterceptor: ExtendedReactFunctionalComponent = ({
  children
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token  = getAuthToken();

    if (!token) {
      navigate(`/auth/${PublicPagesEnum.SIGN_IN}`);
    }

    if (token && !location.pathname.includes('app')) {
      navigate(`/app/${PrivatePagesEnum.CONVERSATIONS}`);
    }

  }, [location.pathname]);

  return children;
};