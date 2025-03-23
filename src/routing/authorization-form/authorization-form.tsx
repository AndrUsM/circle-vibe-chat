import React, { useState } from "react";
import { AuthorizationMode } from "../../features/users/_shared/constants/authorization-mode";

import { AuthorizationFormByEmail } from "@users/components/authorization-form/authorization-form-by-email";

export const AuthorizationForm: React.FC = () => {
  const [authorizationFormMode] = useState<AuthorizationMode>("email");

  if (authorizationFormMode === "email") {
    return <AuthorizationFormByEmail />;
  }

  return <AuthorizationFormByEmail />;
};
