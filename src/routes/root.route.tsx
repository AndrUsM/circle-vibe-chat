import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

const AuthorizationFormLazy = React.lazy(() =>
  import("./public-routes/sign-in").then(({ SignInForm }) => ({
    default: SignInForm,
  }))
);


export const RootRoute: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth" Component={AuthorizationFormLazy} />
      <Route path="/app">
        <PrivateRoutesLazy />
      </Route>
    </Routes>
  </BrowserRouter>
);
