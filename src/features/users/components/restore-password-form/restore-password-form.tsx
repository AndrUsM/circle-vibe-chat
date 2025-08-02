import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  CenteredVertialLayout,
  ExtendedReactFunctionalComponent,
  Form,
  FormControlInput,
  FormGroup,
  FormSubmitButton,
  HorizontalDivider,
  StackLayout,
} from "@circle-vibe/components";
import { useRestorePassword } from "@api/auth/hooks";
import { PublicPagesEnum } from "@core/navigation";

import {
  RESTORE_PASSWORD_FORM_INITIAL_VALUES,
  RESTORE_PASSWORD_FORM_VALIDATION_SCHEMA,
} from "./constants";
import { RestorePasswordFormValues } from "./types";

export const RestorePasswordForm: ExtendedReactFunctionalComponent = () => {
  const navigate = useNavigate();

  const goToSignInPage = () => {
    navigate(`auth/${PublicPagesEnum.SIGN_IN}`);
  };
  const goToSignUpPage = () => {
    void navigate(`/auth/${PublicPagesEnum.SIGN_UP}`);
  };
  const restorePassword = useRestorePassword();
  const onSubmit = (values: RestorePasswordFormValues) => restorePassword(values);

  return (
    <Form
      initialValues={RESTORE_PASSWORD_FORM_INITIAL_VALUES}
      validationSchema={RESTORE_PASSWORD_FORM_VALIDATION_SCHEMA}
      onSubmit={onSubmit}
    >
      <StackLayout>
        <FormGroup isRequired label="Email" formFieldName="email">
          <FormControlInput type="email" placeholder="Email" />
        </FormGroup>

        <FormGroup isRequired label="Password" formFieldName="password">
          <FormControlInput type="password" placeholder="Password" />
        </FormGroup>

        <FormSubmitButton>Restore Password</FormSubmitButton>

        <HorizontalDivider height="1px" />

        <CenteredVertialLayout space={"1rem"} justifyContent="center">
          <Button color="secondary" onClick={goToSignInPage}>
            Sign-in
          </Button>

          <Button color="secondary" onClick={goToSignUpPage}>
            Sign-up
          </Button>
        </CenteredVertialLayout>
      </StackLayout>
    </Form>
  );
};
