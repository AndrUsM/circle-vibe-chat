import React from "react";
import { Route } from "react-router-dom";

const ConversationsLazy = React.lazy(() =>
  import("./conversations").then(({ ConversationsParent }) => ({
    default: ConversationsParent,
  }))
);

export const PrivateRouter: React.ReactNode = (
  <>
    <Route path="conversations" Component={ConversationsLazy} />
  </>
);
