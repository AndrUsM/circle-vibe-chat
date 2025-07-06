import React from "react";

import { AuthorizationForm } from "@features/users/components/sign-in-form/sign-in-form";
import { StackLayout } from "@circle-vibe/components";

export const SignInForm: React.FC = () => {
  return (
    <div className="form-centered h-full bg-tertiary">
      <div className="p-3 min-w-80">
        <StackLayout space="0.5rem">
          <p className="text-secondary text-center text-3xl font-semibold">Sign-in</p>

          <AuthorizationForm />
        </StackLayout>
      </div>
    </div>
  );
};
