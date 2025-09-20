import React, { ReactNode } from 'react';

import { Navigate, Route } from 'react-router-dom';

import { GLOBAL_PAGES_ENUM, PublicPagesEnum } from '@core/navigation';

const SignInFormLazy = React.lazy(() =>
  import('./sign-in').then(({ SignInForm }) => ({
    default: SignInForm,
  })),
);

const SignUpFormLazy = React.lazy(() =>
  import('./sign-up').then(({ SignUp }) => ({
    default: SignUp,
  })),
);

const ResetPasswordLazy = React.lazy(() =>
  import('./reset-password').then(({ ResetPassword }) => ({
    default: ResetPassword,
  })),
);

export const PublicRouter: ReactNode = (
  <>
    <Route path={PublicPagesEnum.SIGN_IN} Component={SignInFormLazy} />
    <Route path={PublicPagesEnum.SIGN_UP} Component={SignUpFormLazy} />
    <Route path={PublicPagesEnum.RESET_PASSWORD} Component={ResetPasswordLazy} />

    {/* !DEFAULT ROUTE */}
    <Route
      path=''
      element={<Navigate to={`/${GLOBAL_PAGES_ENUM.AUTH}/${PublicPagesEnum.SIGN_IN}`} replace />}
    />
  </>
);
