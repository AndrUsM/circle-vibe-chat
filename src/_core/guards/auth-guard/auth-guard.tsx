import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";
import { cookiesService } from "@core/services";
import { PrivatePagesEnum, PublicPagesEnum } from "@core/navigation";

interface AuthGuardProps {
  isReverse?: boolean;
}

export const AuthGuard: ExtendedReactFunctionalComponent<AuthGuardProps> = ({ isReverse }) => {
  const token = cookiesService.get("auth-token");
  const location = useLocation();
  const fallbackRoute = isReverse ? `/app/${PrivatePagesEnum.CONVERSATIONS}` : `/auth/${PublicPagesEnum.SIGN_IN}`;
  const route = <Navigate to={fallbackRoute} state={{ from: location }} replace />;

  if (isReverse) {
    return token ? route : <Outlet />;
  }

  return token ? <Outlet /> : route;
};
