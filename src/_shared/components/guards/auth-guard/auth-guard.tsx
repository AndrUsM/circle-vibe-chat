import { ExtendedReactFunctionalComponent } from "@circle-vibe/shared";
import { cookiesService } from "@core/services";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AuthGuard: ExtendedReactFunctionalComponent = ({ children }) => {
  const isAuthenticated = cookiesService.get("auth-token");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
