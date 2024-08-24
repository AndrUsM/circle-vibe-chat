import React, { useState } from "react";
import { AuthorizationMode } from "./_shared/types/authorization-mode";

import { AuthorizationFormByPhone } from "./authorization-form-by-phone/authorization-form-by-phone";
import { AuthorizationFormByEmail } from "./authorization-form-by-email/authorization-form-by-email";

export const AuthorizationForm: React.FC = () => {
  const [authorizationFormMode] = useState<AuthorizationMode>("email");

  if (authorizationFormMode === "email") {
    return <AuthorizationFormByEmail />;
  }

  return <AuthorizationFormByPhone />;
};
