import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
} from '@circle-vibe/components';

import { FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@core/hooks';
import { GLOBAL_PAGES_ENUM, PublicPagesEnum } from '@core/navigation';

import { useGenerateAccountConfirmationCode, useRestorePassword } from '@api/auth/hooks';

import { AccountConfirmationForm } from '../account-confirmation-form';

import {
  RESTORE_PASSWORD_FORM_INITIAL_VALUES,
  RESTORE_PASSWORD_FORM_VALIDATION_SCHEMA,
} from './constants';
import { RestorePasswordFormValues } from './types';

export const RestorePasswordForm: ExtendedReactFunctionalComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notification = useNotification();
  const [email, setEmail] = useState('');
  const [isConfirmationCodeAdded, _toggleConfirmationCodeMode, setConfirmationCodeAdded] =
    useBoolean(false);
  const [isConfirmationModalOpen, _toggleConfirmationModalOpen, setConfirmationModalOpen] =
    useBoolean(false);
  const { generateAccountConfirmationCode, loading: isGeneratingCode } =
    useGenerateAccountConfirmationCode();

  const goToSignInPage = () => {
    navigate(`/${GLOBAL_PAGES_ENUM.AUTH}/${PublicPagesEnum.SIGN_IN}`, { replace: true });
  };
  const goToSignUpPage = () => {
    void navigate(`/${GLOBAL_PAGES_ENUM.AUTH}/${PublicPagesEnum.SIGN_UP}`, { replace: true });
  };
  const restorePassword = useRestorePassword();
  const onGenerateConfirmaitonCode = useCallback(async (values: RestorePasswordFormValues) => {
    if (!values?.email) {
      return;
    }

    setEmail(values.email);
    const response = await generateAccountConfirmationCode(values.email);

    if (response) {
      setConfirmationModalOpen(true);
      notification({
        type: 'success',
        content: t('notifications.confirmation-code-has-been-sent'),
      });
    }
  }, []);
  const onSubmit = useCallback(
    async (values: RestorePasswordFormValues) => {
      if (!isConfirmationCodeAdded) {
        onGenerateConfirmaitonCode(values);
        return;
      }

      return restorePassword(values);
    },
    [isConfirmationCodeAdded],
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
            <FormGroup isRequired label={t('auth.fields.email.label')} formFieldName='email'>
              <FormControlInput type='email' />
            </FormGroup>

            <FormGroup isRequired label={t('auth.fields.password.label')} formFieldName='password'>
              <FormControlInput
                type='password'
                placeholder={t('auth.fields.password.placeholder')}
              />
            </FormGroup>

            <Show.When isTrue={isConfirmationCodeAdded}></Show.When>

            <Show.When isTrue={isConfirmationCodeAdded}>
              <FormSubmitButton>{t('auth.reset-password.button')}</FormSubmitButton>
            </Show.When>

            <Show.When isTrue={!isConfirmationCodeAdded}>
              <Button
                type='button'
                disabled={isGeneratingCode || !isValid}
                onClick={() => {
                  onGenerateConfirmaitonCode(values);
                }}
              >
                {t('auth.confirm-email.button')}
              </Button>
            </Show.When>

            <HorizontalDivider height='1px' />

            <CenteredVertialLayout space={'1rem'} justifyContent='center'>
              <Button type='button' color='secondary' onClick={goToSignInPage}>
                {t('auth.sign-in.submit-button')}
              </Button>

              <Button type='button' color='secondary' onClick={goToSignUpPage}>
                {t('auth.sign-up.submit-button')}
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
        <Modal.Header>{t('auth.account-confirmation.dialog.header')}</Modal.Header>

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
