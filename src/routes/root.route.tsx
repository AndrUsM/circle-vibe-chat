import React, { useCallback, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { AuthGuard } from "@shared/components/guards";

import { PrivateRouter } from "./private-routes";
import { PublicRouter } from "./public-routes";
import { useRestoreUser } from "@core/hooks";
import { SocketProvider } from "@core/context/socket/socket.provider";

export const RootRoute: React.FC = () => {
  useRestoreUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" children={PublicRouter}></Route>
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
      </Routes>
    </BrowserRouter>
  );
};
