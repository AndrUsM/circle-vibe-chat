import { Form, Formik } from "formik";
import React, { useCallback, useState } from "react";

import { request } from '@core/request/request';
import { TextInput } from "../../_shared/components/fields/text-input/text-input";
import { FormContainer } from "../../_shared/components/form-container/form-container";
import { AuthorizationMode } from "./_shared/types/authorization-mode";

export const AuthorizationForm: React.FC = () => {
  const [AuthorizationFormMode, setAuthorizationFormMode] = useState<AuthorizationMode>('email');
  const onSubmit = useCallback(async () => {
    const requestResult = await request({
      url: "/api/test",
    });
  }, []);

  return (

  );
};
