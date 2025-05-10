import React from "react";

import { AuthorizationForm } from "../../../features/users/components/sign-in-form/sign-in-form";

export const SignInForm: React.FC = () => {
  return (
    <div className="form-centered h-full ">
      <div className="bg-tertiary rounded-1 p-3 min-w-80">
        <AuthorizationForm />
      </div>
    </div>
  );
};
