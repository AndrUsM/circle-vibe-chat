import React from "react";

import { AuthorizationForm as Form } from "../../features/users/components/authorization-form/authorization-form";

export const AuthorizationForm: React.FC = () => {
  return (
    <div className="tw-relative">
      <div className="tw-absolute tw-translate-y-1/2 tw-translate-x-1/2 bg-secondary tw-rounded">
        <Form />
      </div>
    </div>
  )
};
