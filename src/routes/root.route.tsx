import React from "react";
import { Route, BrowserRouter, Routes, Navigate, Outlet } from "react-router-dom";

import { useRestoreUser } from "@core/hooks";
import { SocketProvider } from "@core/context/socket/socket.provider";

import { AuthGuard } from "@shared/components/guards";

import { PrivateRouter } from "./private-routes";
import { PublicRouter } from "./public-routes";

export const RootRoute: React.FC = () => {
  useRestoreUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="auth"
          // element={<AuthGuard isReverse />}
          children={PublicRouter}
        />

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
