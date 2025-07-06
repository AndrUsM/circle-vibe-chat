import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";
import { cookiesService } from "@core/services";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface AuthGuardProps {
  isReverse?: boolean;
}

export const AuthGuard: ExtendedReactFunctionalComponent<AuthGuardProps> = ({ isReverse }) => {
  const isAuthenticated = cookiesService.get("auth-token");
  const location = useLocation();
  const fallbackRoute = isReverse ? '/app/conversations' : '/auth/sign-in';
  const route = <Navigate to={fallbackRoute} state={{ from: location }} replace />;

  if (isReverse) {
    return isAuthenticated ? route : <Outlet />;
  }

  return isAuthenticated ? <Outlet /> : route;
};
