import { useCallback } from "react";

import {
  CenteredVertialLayout,
  FormControlInput,
  FormGroup,
  Button,
  FormSubmitButton,
  Form,
  StackLayout,
} from "@circle-vibe/shared";

import { AUTHORIZATION_FORM_SCHEMA } from "./constants/sign-in-form-schema";

export const AuthorizationForm: React.FC = () => {
  const onSubmit = useCallback(async () => {
    // ToDo
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      validationSchema={AUTHORIZATION_FORM_SCHEMA}
      initialValues={{} as any}
    >
      <FormGroup
        isRequired
        label={"Identification code"}
        formFieldName={"identificationKey"}
      >
        <FormControlInput />
      </FormGroup>

      <FormGroup isRequired label="Password" formFieldName="password">
        <FormControlInput />
      </FormGroup>

      <StackLayout space={"1rem"}>
        <FormSubmitButton> Save</FormSubmitButton>

        <CenteredVertialLayout space={"1rem"} justifyContent="center">
          <Button color="secondary">Clear</Button>

          <Button color="secondary">Login</Button>
        </CenteredVertialLayout>
      </StackLayout>
    </Form>
  );
};
