import { useAuthGuard } from "@shared/components/guards/use-auth-guard/use-auth-guard";
import React from "react";
import { Route } from "react-router-dom";

const ConversationsLazy = React.lazy(() =>
  import("./conversations").then(({ Conversations }) => ({
    default: Conversations,
  }))
);

export const PrivateRouter: React.FC = () => {
  useAuthGuard();

  return (
    <>
      <Route path="/conversations" Component={ConversationsLazy} />
    </>
  );
};
