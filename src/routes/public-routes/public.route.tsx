import React, { ReactNode } from "react";
import { Route } from "react-router-dom";

const SignInFormLazy = React.lazy(() =>
  import("./sign-in").then(({ SignInForm }) => ({
    default: SignInForm,
  }))
);

const SignUpFormLazy = React.lazy(() =>
  import("./sign-up").then(({ SignUp }) => ({
    default: SignUp,
  }))
);

export const PublicRouter: ReactNode = (
  <>
    <Route path="sign-in" Component={SignInFormLazy} />
    <Route path="sign-up" Component={SignUpFormLazy} />
  </>
);
