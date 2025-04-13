import React from "react";

import { AuthorizationForm as Form } from "../../features/users/components/authorization-form/authorization-form";

export const AuthorizationForm: React.FC = () => {
  return (
    <div className="bg-light rounded-1">
      <Form />
    </div>
  );
};
