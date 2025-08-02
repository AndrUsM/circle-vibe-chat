import React from "react";
import { StackLayout } from "@circle-vibe/components";

import { RestorePasswordForm } from "@features/users/components/restore-password-form/restore-password-form";

export const ResetPassword: React.FC = () => {
  return (
    <div className="form-centered h-full bg-tertiary">
      <div className="p-3 min-w-80">
        <StackLayout space="0.5rem">
          <p className="text-secondary text-center text-3xl font-semibold">Reset Password</p>

          <RestorePasswordForm />
        </StackLayout>
      </div>
    </div>
  );
};
