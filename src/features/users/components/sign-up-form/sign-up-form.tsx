import React from 'react';

import { ConversationBucketNameEnum, UploadImageOutputDto } from '@circle-vibe/shared';

import {
  Button,
  CenteredVertialLayout,
  ClusterLayout,
  Form,
  FormControlCheckbox,
  FormControlInput,
  FormControlSelect,
  FormGroup,
  FormSubmitButton,
  HorizontalDivider,
  StackLayout,
  useCountries,
} from '@circle-vibe/components';

import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FileUploadForm, FileUploadFormFileType } from '@shared/components';
import { USER_TYPE_DROPDOWN_OPTIONS } from '@shared/constants';

import { GLOBAL_PAGES_ENUM, PublicPagesEnum } from '@core/navigation';

import {
  SIGN_UP_FORM_INITIAL_VALUES,
  SIGN_UP_FORM_VALIDATION_SCHEMA,
  SignUpFormInput,
} from './constants';
import { useSignUp } from './hooks';

export const SignUpForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const countryDropdownOptions = useCountries();
  const onSubmit = useSignUp();

  const onNavigateToSignInPage = () => {
    void navigate(`/${GLOBAL_PAGES_ENUM.AUTH}/${PublicPagesEnum.SIGN_IN}`);
  };

  const onNavigateToRestorePasswordPage = () => {
    void navigate(`/${GLOBAL_PAGES_ENUM.AUTH}/${PublicPagesEnum.RESET_PASSWORD}`);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validationSchema={SIGN_UP_FORM_VALIDATION_SCHEMA}
      initialValues={SIGN_UP_FORM_INITIAL_VALUES}
    >
      {({ values, setFieldValue }: FormikProps<SignUpFormInput>) => (
        <StackLayout space='0.75rem'>
          <FormGroup
            isRequired
            label={t('settings.account-settings.general.account-settings.firstname.label')}
            formFieldName='firstname'
          >
            <FormControlInput />
          </FormGroup>

          <FormGroup
            isRequired
            label={t('settings.account-settings.general.account-settings.surname.label')}
            formFieldName='surname'
          >
            <FormControlInput />
          </FormGroup>

          <FormGroup
            isRequired
            label={t('settings.account-settings.general.account-settings.username.label')}
            formFieldName='username'
          >
            <FormControlInput />
          </FormGroup>

          <FileUploadForm
            url={values.avatarUrl}
            label={t('settings.account-settings.general.account-settings.avatar.label')}
            bucket={ConversationBucketNameEnum.USER_AVATARS}
            type={FileUploadFormFileType.IMAGE}
            afterUpload={(fileUrls) => {
              const avatarUrl =
                (fileUrls as UploadImageOutputDto)?.optimisedFilePath ?? fileUrls?.filePath;

              setFieldValue('avatarUrl', avatarUrl);
            }}
          />

          <FormGroup
            isRequired
            label={t('settings.account-settings.general.account-settings.email.label')}
            formFieldName={'email'}
          >
            <FormControlInput type='email' />
          </FormGroup>

          <FormGroup
            isRequired
            label={t('settings.account-settings.general.account-settings.password.label')}
            formFieldName='password'
          >
            <FormControlInput type='password' />
          </FormGroup>

          <FormGroup
            isRequired
            label={t(
              'settings.account-settings.general.account-settings.password-confirmation.label',
            )}
            formFieldName='passwordConfirmation'
          >
            <FormControlInput type='password' />
          </FormGroup>

          <FormGroup
            label={t('settings.account-settings.general.account-settings.phone.label')}
            formFieldName={'primaryPhone'}
          >
            <FormControlInput type='tel' />
          </FormGroup>

          <FormGroup
            label={t('settings.account-settings.general.account-settings.birth-date.label')}
            formFieldName='birthDate'
          >
            <FormControlInput type='date' />
          </FormGroup>

          <FormGroup
            label={t('settings.account-settings.general.account-settings.account-type.label')}
            formFieldName='type'
          >
            <FormControlSelect>
              {USER_TYPE_DROPDOWN_OPTIONS.map(({ key, label }) => (
                <option value={key}>{t(label)}</option>
              ))}
            </FormControlSelect>
          </FormGroup>

          <ClusterLayout>
            <FormGroup
              isRequired
              label={t('settings.account-settings.general.account-settings.country.label')}
              formFieldName='country'
            >
              <FormControlSelect>
                {countryDropdownOptions.map(({ code, label }) => (
                  <option value={code}>{t(label)}</option>
                ))}
              </FormControlSelect>
            </FormGroup>

            <FormGroup
              label={t('settings.account-settings.general.account-settings.city.label')}
              formFieldName='city'
            >
              <FormControlInput />
            </FormGroup>
          </ClusterLayout>

          <FormGroup formFieldName='isHiddenContactInfo'>
            <FormControlCheckbox>
              {t('settings.account-settings.general.account-settings.hide-contact-info.label')}
            </FormControlCheckbox>
          </FormGroup>

          <FormGroup formFieldName='isAllowedToSearch'>
            <FormControlCheckbox>
              {t('settings.account-settings.general.account-settings.show-in-search.label')}
            </FormControlCheckbox>
          </FormGroup>

          <StackLayout space='1rem'>
            <FormSubmitButton>
              {t('auth.sign-up.submit-button')}
            </FormSubmitButton>

            <HorizontalDivider height='1px' />

            <CenteredVertialLayout space='1rem' justifyContent='center'>
              <Button color='secondary' onClick={onNavigateToSignInPage}>
                {t('auth.sign-in.submit-button')}
              </Button>

              <Button color='secondary' onClick={onNavigateToRestorePasswordPage}>
                {t('auth.restore-password.button')}
              </Button>
            </CenteredVertialLayout>
          </StackLayout>
        </StackLayout>
      )}
    </Form>
  );
};
