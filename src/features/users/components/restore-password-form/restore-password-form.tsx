import { FormikProps } from "formik";
import { use, useCallback, useState } from "react";
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
  Modal,
  Show,
  StackLayout,
  useBoolean,
} from "@circle-vibe/components";
import {
  useGenerateAccountConfirmationCode,
  useRestorePassword,
} from "@api/auth/hooks";
import { PublicPagesEnum } from "@core/navigation";
import { useNotification } from "@core/hooks";

import {
  RESTORE_PASSWORD_FORM_INITIAL_VALUES,
  RESTORE_PASSWORD_FORM_VALIDATION_SCHEMA,
} from "./constants";
import { RestorePasswordFormValues } from "./types";
import { AccountConfirmationForm } from "../account-confirmation-form";

export const RestorePasswordForm: ExtendedReactFunctionalComponent = () => {
  const navigate = useNavigate();
  const notification = useNotification();
  const [email, setEmail] = useState("");
  const [
    isConfirmationCodeAdded,
    _toggleConfirmationCodeMode,
    setConfirmationCodeAdded,
  ] = useBoolean(false);
  const [
    isConfirmationModalOpen,
    _toggleConfirmationModalOpen,
    setConfirmationModalOpen,
  ] = useBoolean(false);
  const { generateAccountConfirmationCode, loading: isGeneratingCode } =
    useGenerateAccountConfirmationCode();

  const goToSignInPage = () => {
    navigate(`/auth/${PublicPagesEnum.SIGN_IN}`, { replace: true });
  };
  const goToSignUpPage = () => {
    void navigate(`/auth/${PublicPagesEnum.SIGN_UP}`, { replace: true });
  };
  const restorePassword = useRestorePassword();
  const onGenerateConfirmaitonCode = useCallback(
    async (values: RestorePasswordFormValues) => {
      if (!values?.email) {
        return;
      }

      setEmail(values.email);
      const response = await generateAccountConfirmationCode(values.email);

      if (response) {
        setConfirmationModalOpen(true);
        notification({
          type: "success",
          content: "Confirmation code has been sent to your email!",
        });
      }
    },
    []
  );
  const onSubmit = useCallback(
    async (values: RestorePasswordFormValues) => {
      if (!isConfirmationCodeAdded) {
        onGenerateConfirmaitonCode(values);
        return;
      }

      return restorePassword(values);
    },
    [isConfirmationCodeAdded]
  );

  return (
    <>
      <Form
        initialValues={RESTORE_PASSWORD_FORM_INITIAL_VALUES}
        validationSchema={RESTORE_PASSWORD_FORM_VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {({ values, isValid }: FormikProps<RestorePasswordFormValues>) => (
          <StackLayout>
            <FormGroup isRequired label="Email" formFieldName="email">
              <FormControlInput type="email" placeholder="Email" />
            </FormGroup>

            <FormGroup isRequired label="Password" formFieldName="password">
              <FormControlInput type="password" placeholder="Password" />
            </FormGroup>

            <Show.When isTrue={isConfirmationCodeAdded}></Show.When>

            <Show.When isTrue={isConfirmationCodeAdded}>
              <FormSubmitButton>Reset Password</FormSubmitButton>
            </Show.When>

            <Show.When isTrue={!isConfirmationCodeAdded}>
              <Button
                type="button"
                disabled={isGeneratingCode || !isValid}
                onClick={() => {
                  onGenerateConfirmaitonCode(values);
                }}
              >
                Confirm Email
              </Button>
            </Show.When>

            <HorizontalDivider height="1px" />

            <CenteredVertialLayout space={"1rem"} justifyContent="center">
              <Button type="button" color="secondary" onClick={goToSignInPage}>
                Sign-in
              </Button>

              <Button type="button" color="secondary" onClick={goToSignUpPage}>
                Sign-up
              </Button>
            </CenteredVertialLayout>
          </StackLayout>
        )}
      </Form>

      <Modal.Root
        isOpen={isConfirmationModalOpen}
        onClose={() => {
          setConfirmationModalOpen(false);
        }}
      >
        <Modal.Header>Account Confirmation</Modal.Header>

        <Modal.Body>
          <AccountConfirmationForm
            email={email}
            onClose={() => {
              setConfirmationCodeAdded(true);
              setConfirmationModalOpen(false);
            }}
          />
        </Modal.Body>
      </Modal.Root>
    </>
  );
};
