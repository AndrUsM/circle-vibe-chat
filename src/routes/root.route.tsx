import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { PrivateRouter } from "./private-routes";
import { PublicRouter } from "./public-routes";

export const RootRoute: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="auth">{PublicRouter}</Route>

      <Route path="/app">
        <PrivateRouter />
      </Route>
    </Routes>

  </BrowserRouter>
);
