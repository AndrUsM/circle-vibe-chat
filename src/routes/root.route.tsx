import React from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import { SocketProvider } from "@core/context/socket/socket.provider";
import { PublicPagesEnum } from "@core/navigation";

import { PrivateRouter } from "./private-routes";
import { PublicRouter } from "./public-routes";
import { AuthInterceptor } from "./auth-interceptor";

export const RootRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthInterceptor>
        <Routes>
          <Route path="auth" children={PublicRouter} />

          <Route
            path="/app"
            element={
              <SocketProvider>
                <Outlet />
              </SocketProvider>
            }
          >
            {PrivateRouter}
          </Route>

          {/* !DEFAULT ROUTES */}
          <Route
            path=""
            element={
              <Navigate to={`/auth/${PublicPagesEnum.SIGN_IN}`} replace />
            }
          />
        </Routes>
      </AuthInterceptor>
    </BrowserRouter>
  );
};
