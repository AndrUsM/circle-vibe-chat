import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

const AuthorizationFormLazy = React.lazy(() => import('./authorization-form').then(({ AuthorizationForm }) => ({
  default: AuthorizationForm
})));

export const RootRoute: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={AuthorizationFormLazy} />
    </Routes>
  </BrowserRouter>
)