import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  CenteredVertialLayout,
  FormControlInput,
  FormGroup,
  Button,
  FormSubmitButton,
  Form,
  StackLayout,
  HorizontalDivider,
  User,
} from "@circle-vibe/shared";

import {
  AUTHORIZATION_FORM_SCHEMA,
  AUTHORIZATION_FORM_INITIAL_VALUES,
} from "./constants";
import { request } from "@core/request";
import { useCurrentUser, useNotification } from "@core/hooks";
import { SignInFormInput } from "./types";
import { cookiesService, localStorageService } from "@core/services";

interface Response {
  token: string;
  user: User;
}

export const AuthorizationForm: React.FC = () => {
  const navigate = useNavigate();
  const {setUser} = useCurrentUser();
  const notification = useNotification();
  const onSubmit = useCallback(async (data: SignInFormInput) => {
    const response = await request<Response>({
      url: "auth/sign-in",
      data,
      method: "POST",
    });

    const { token, user } = response.data;

    cookiesService.set('auth-token', String(token));
    setUser(user);

    notification({
      type: "success",
      content: "Successfully signed in!",
    });

    navigate("/app/conversations");
  }, []);

  const onNavigateToSignUpPage = () => {
    void navigate("/auth/sign-up");
  };

  return (
    <Form
      onSubmit={onSubmit}
      validationSchema={AUTHORIZATION_FORM_SCHEMA}
      initialValues={AUTHORIZATION_FORM_INITIAL_VALUES}
    >
      <FormGroup isRequired label={"Email"} formFieldName={"email"}>
        <FormControlInput />
      </FormGroup>

      <FormGroup isRequired label="Password" formFieldName="password">
        <FormControlInput />
      </FormGroup>

      <StackLayout space={"1rem"}>
        <FormSubmitButton>Sign-in</FormSubmitButton>

        <HorizontalDivider height="1px" />

        <CenteredVertialLayout space={"1rem"} justifyContent="center">
          <Button color="secondary" onClick={onNavigateToSignUpPage}>
            Create Account
          </Button>

          <Button color="secondary">Restore Password</Button>
        </CenteredVertialLayout>
      </StackLayout>
    </Form>
  );
};
