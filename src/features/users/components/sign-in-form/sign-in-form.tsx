import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  CenteredVertialLayout,
  FormControlInput,
  FormGroup,
  Button,
  FormSubmitButton,
  Form,
  StackLayout,
  HorizontalDivider,
} from "@circle-vibe/components";

import { useSignIn } from "@features/users/hooks";

import {
  AUTHORIZATION_FORM_SCHEMA,
  AUTHORIZATION_FORM_INITIAL_VALUES,
} from "./constants";

export const AuthorizationForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useSignIn();

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
        <FormControlInput type="password" />
      </FormGroup>

      <StackLayout space={"1rem"}>
        <FormSubmitButton>{t("login.sign-in.submit-button")}</FormSubmitButton>

        <HorizontalDivider height="1px" />

        <CenteredVertialLayout space={"1rem"} justifyContent="center">
          <Button color="secondary" onClick={onNavigateToSignUpPage}>
            {t("login.create-account.button")}
          </Button>

          <Button color="secondary">
            {t("login.restore-password.button")}
          </Button>
        </CenteredVertialLayout>
      </StackLayout>
    </Form>
  );
};
