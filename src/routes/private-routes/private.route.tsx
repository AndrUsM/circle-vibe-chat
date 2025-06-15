import React from "react";
import { Route } from "react-router-dom";

const ConversationsLazy = React.lazy(() =>
  import("./conversations").then(({ Conversations }) => ({
    default: Conversations,
  }))
);

export const PrivateRouter: React.ReactNode = (
  <>
    <Route path="conversations" Component={ConversationsLazy} />
  </>
);
