import React from "react";
import { Route } from "react-router-dom";

import { useAuthGuard } from "@shared/components/guards/use-auth-guard/use-auth-guard";

const ConversationsLazy = React.lazy(() =>
  import("./conversations").then(({ Conversations }) => ({
    default: Conversations,
  }))
);

export const PrivateRouter: React.FC = () => {
  useAuthGuard();

  return (
    <Route path="/">
      <Route path="/conversations" Component={ConversationsLazy} />
    </Route>
  );
};
