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
import { SectionContent, SectionDescription, SectionHeader } from "@shared/components";

export const InviteAccountSettingsForm: ExtendedReactFunctionalComponent =
  () => {
    const onAcceptInvite = useHandleAcceptInvite();

    return (
      <Form
        initialValues={ACCEPT_INVITE_FORM_INITIAL_VALUES}
        validationSchema={ACCEPT_INVITE_FORM_SCHEMA_VALIDATION}
        onSubmit={onAcceptInvite}
      >
        <StackLayout space="0.5rem" className="pt-6">
          <SectionHeader>Accept Invite</SectionHeader>

          <SectionDescription>
            Insert your token to accept invite and get access to conversation.
          </SectionDescription>

          <FormGroup isRequired label="Token" formFieldName="token">
            <FormControlTextarea className="resize-vertical min-h-10 p-3" />
          </FormGroup>
        </StackLayout>

        <SubmitButton>Accept Invite</SubmitButton>
      </Form>
    );
  };
