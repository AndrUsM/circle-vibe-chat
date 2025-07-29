import React from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
} from "react-router-dom";

import { SocketProvider } from "@core/context/socket/socket.provider";

import { AuthGuard } from "@core/guards";

import { PrivateRouter } from "./private-routes";
import { PublicRouter } from "./public-routes";

export const RootRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" children={PublicRouter} />

        <Route
          path="/app"
          element={
            <SocketProvider>
              <AuthGuard />
            </SocketProvider>
          }
        >
          {PrivateRouter}
        </Route>

        {/* !DEFAULT ROUTES */}
        <Route path="" element={<Navigate to="/auth/sign-in" replace />} />
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
