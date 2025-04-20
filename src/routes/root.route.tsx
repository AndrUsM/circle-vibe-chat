import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

const AuthorizationFormLazy = React.lazy(() =>
  import("./authorization-form").then(({ AuthorizationForm }) => ({
    default: AuthorizationForm,
  }))
);
const ConversationsLazy = React.lazy(() =>
  import("./private-routes/conversations").then(({ Conversations }) => ({
    default: Conversations,
  }))
);

export const RootRoute: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={AuthorizationFormLazy} />
      <Route path="/conversations" Component={ConversationsLazy} />
    </Routes>
  </BrowserRouter>
);
