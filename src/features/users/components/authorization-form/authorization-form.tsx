import { useCallback } from "react";

import { FormControlInput, FormikFormControl, Form, Label, FormControlError, FormControlLabel } from "@circle-vibe/shared";

import { AUTHORIZATON_FORM_SCHEMA } from "./constants/authorizaton-form-schema";

export const AuthorizationForm: React.FC = () => {
  const onSubmit = useCallback(async () => {
    // ToDo
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      validationSchema={AUTHORIZATON_FORM_SCHEMA}
      initialValues={{} as any}
    >
      <FormikFormControl formFieldName="identificationKey">
        <FormControlLabel>Identification code</FormControlLabel>
        <FormControlInput />
        <FormControlError />
      </FormikFormControl>

      <FormikFormControl formFieldName="password">
        <FormControlLabel>Password</FormControlLabel>
        <FormControlInput />
        <FormControlError />
      </FormikFormControl>
    </Form>
  );
};
