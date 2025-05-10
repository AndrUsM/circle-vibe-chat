import React from "react";
import { Route } from "react-router-dom";

const SignInLazy = React.lazy(() =>
  import("./sign-in").then(({ SignInForm }) => ({
    default: SignInForm,
  }))
);

export const PublicRouter = () => {
  return (
    <>
      <Route path="/sign-in" Component={SignInLazy} />
    </>
  );
};
