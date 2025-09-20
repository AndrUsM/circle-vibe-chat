import {
  ExtendedReactFunctionalComponent,
  FormControlTextarea,
  FormGroup,
  SubmitButton,
} from '@circle-vibe/components';
import { Form } from '@circle-vibe/components';

import { Section } from '@shared/components';

import { useHandleAcceptInvite } from '../../hooks/use-handle-accept-invite';

import {
  ACCEPT_INVITE_FORM_INITIAL_VALUES,
  ACCEPT_INVITE_FORM_SCHEMA_VALIDATION,
} from './constants';

export const InviteAccountSettingsForm: ExtendedReactFunctionalComponent = () => {
  const onAcceptInvite = useHandleAcceptInvite();

  return (
    <Form
      initialValues={ACCEPT_INVITE_FORM_INITIAL_VALUES}
      validationSchema={ACCEPT_INVITE_FORM_SCHEMA_VALIDATION}
      onSubmit={onAcceptInvite}
    >
      <Section className='pt-6'>
        <Section.Header>Accept Invite</Section.Header>

        <Section.Description>
          Insert your token to accept invite and get access to conversation.
        </Section.Description>

        <FormGroup isRequired label='Token' formFieldName='token'>
          <FormControlTextarea className='resize-vertical min-h-10 p-3' />
        </FormGroup>
      </Section>

      <SubmitButton>Accept Invite</SubmitButton>
    </Form>
  );
};
