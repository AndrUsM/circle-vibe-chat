import React from "react";
import { ToastContainer } from "react-toastify";

import { useRestoreToken, useRestoreUser } from "@core/hooks";
import { CurrentUserProvider } from "@core/context";

import { RootRoute } from "./routes/root.route";

export const App: React.FC = () => {
  useRestoreToken();
  useRestoreUser();

  return (
    <CurrentUserProvider>
      <RootRoute />

      <ToastContainer />
    </CurrentUserProvider>
  );
};
