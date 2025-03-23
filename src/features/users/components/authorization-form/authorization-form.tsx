import { useCallback } from "react";

import { FormControlInput, FormikFormControl, Form, Label, FormControlError } from "@circle-vibe/shared";

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
        <Label>Identification code</Label>
        <FormControlInput />
        <FormControlError />
      </FormikFormControl>

      <FormikFormControl formFieldName="password">
        <Label>Password</Label>
        <FormControlInput />
        <FormControlError />
      </FormikFormControl>
    </Form>
  );
};
