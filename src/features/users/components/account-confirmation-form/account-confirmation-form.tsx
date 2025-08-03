import { useCallback } from "react";
import {
  Form,
  FormControlInput,
  FormGroup,
  FormSubmitButton,
  noop,
  StackLayout,
} from "@circle-vibe/components";
import { ACCOUNT_CONFIRMATION_FORM_INITIAL_VALUES } from "./constants/account-confirmation-form-initial-values";
import { ACCOUNT_CONFIRMATION_FORM_VALIDATION_SCHEMA } from "./constants/account-confirmaiton-form-validation-schema";
import { useConfirmAccount } from "@api/auth/hooks";
import { AccountConfirmationFormValues } from "./types";

interface AccountConfirmationFormProps {
  email: string;
  onClose?: VoidFunction;
}

export const AccountConfirmationForm: React.FC<
  AccountConfirmationFormProps
> = ({ email, onClose = noop }) => {
  const confirmAccount = useConfirmAccount();
  const onSubmit = useCallback(
    async (values: AccountConfirmationFormValues) => {
      const response = await confirmAccount(values);

      if (response.status === 201) {
        onClose();
      }
    },
    []
  );

  return (
    <Form
      validationSchema={ACCOUNT_CONFIRMATION_FORM_VALIDATION_SCHEMA}
      initialValues={{
        ...ACCOUNT_CONFIRMATION_FORM_INITIAL_VALUES,
        email,
      }}
      onSubmit={onSubmit}
    >
      <StackLayout space="1rem">
        <FormGroup label="Confirmation Code" formFieldName="code" isRequired>
          <FormControlInput />
        </FormGroup>

        <FormSubmitButton>Confirm</FormSubmitButton>
      </StackLayout>
    </Form>
  );
};
