import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const onAcceptInvite = useHandleAcceptInvite();

  return (
    <Form
      initialValues={ACCEPT_INVITE_FORM_INITIAL_VALUES}
      validationSchema={ACCEPT_INVITE_FORM_SCHEMA_VALIDATION}
      onSubmit={onAcceptInvite}
    >
      <Section className='pt-6'>
        <Section.Header>
          {t('settings.account-settings.invites.accept-invite.label')}
        </Section.Header>

        <Section.Description>
          {t('settings.account-settings.invites.accept-invite.description')}
        </Section.Description>

        <FormGroup
          isRequired
          label={t('settings.account-settings.invites.token.label')}
          formFieldName='token'
        >
          <FormControlTextarea className='resize-vertical min-h-10 p-3' />
        </FormGroup>
      </Section>

      <SubmitButton>
        {t('settings.account-settings.invites.accept-invite.button.label')}
      </SubmitButton>
    </Form>
  );
};
