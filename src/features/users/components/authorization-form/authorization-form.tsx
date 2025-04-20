import { useCallback } from "react";

import {
  CenteredVertialLayout,
  ClusterLayout,
  FormControlInput,
  FormGroup,
  Button,
  FormSubmitButton,
  Form,
} from "@circle-vibe/shared";

import { AUTHORIZATION_FORM_SCHEMA } from "./constants/authorizaton-form-schema";

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

      <ClusterLayout space={"1rem"}>
        <FormSubmitButton> Save</FormSubmitButton>

        <CenteredVertialLayout space={"1rem"} justifyContent="center">
          <Button color="secondary">Register</Button>

          <Button color="secondary">Register</Button>
        </CenteredVertialLayout>
      </ClusterLayout>
    </Form>
  );
};
