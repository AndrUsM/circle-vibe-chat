import {
  ExtendedReactFunctionalComponent,
  FormControlTextarea,
  FormGroup,
  StackLayout,
  SubmitButton,
} from "@circle-vibe/components";
import { Form } from "@circle-vibe/components";

import {
  ACCEPT_INVITE_FORM_INITIAL_VALUES,
  ACCEPT_INVITE_FORM_SCHEMA_VALIDATION,
} from "./constants";
import { useHandleAcceptInvite } from "../../hooks/use-handle-accept-invite";

export const AccountSettings: ExtendedReactFunctionalComponent = () => {
  const onAcceptInvite = useHandleAcceptInvite();

  return (
    <StackLayout>
      <p>Account Settings</p>

      <Form
        initialValues={ACCEPT_INVITE_FORM_INITIAL_VALUES}
        validationSchema={ACCEPT_INVITE_FORM_SCHEMA_VALIDATION}
        onSubmit={onAcceptInvite}
      >
        <FormGroup isRequired label="Token" formFieldName="token">
          <FormControlTextarea className="resize-vertical min-h-10 p-3" />
        </FormGroup>

        <SubmitButton>Accept Invite</SubmitButton>
      </Form>
    </StackLayout>
  );
};
