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

import { PublicPagesEnum } from '@core/navigation';

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
    void navigate(`/auth/${PublicPagesEnum.SIGN_IN}`);
  };

  const onNavigateToRestorePasswordPage = () => {
    void navigate(`/auth/${PublicPagesEnum.RESET_PASSWORD}`);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validationSchema={SIGN_UP_FORM_VALIDATION_SCHEMA}
      initialValues={SIGN_UP_FORM_INITIAL_VALUES}
    >
      {({ values, setFieldValue }: FormikProps<SignUpFormInput>) => (
        <StackLayout space='0.75rem'>
          <FormGroup isRequired label={'Name'} formFieldName={'firstname'}>
            <FormControlInput />
          </FormGroup>

          <FormGroup isRequired label={'Surname'} formFieldName={'surname'}>
            <FormControlInput />
          </FormGroup>

          <FormGroup isRequired label={'Username'} formFieldName={'username'}>
            <FormControlInput />
          </FormGroup>

          <FileUploadForm
            url={values.avatarUrl}
            label='Avatar'
            bucket={ConversationBucketNameEnum.USER_AVATARS}
            type={FileUploadFormFileType.IMAGE}
            afterUpload={(fileUrls) => {
              const avatarUrl =
                (fileUrls as UploadImageOutputDto)?.optimisedFilePath ?? fileUrls?.filePath;

              setFieldValue('avatarUrl', avatarUrl);
            }}
          />

          <FormGroup isRequired label={'Email'} formFieldName={'email'}>
            <FormControlInput type='email' />
          </FormGroup>

          <FormGroup isRequired label='Password' formFieldName='password'>
            <FormControlInput type='password' />
          </FormGroup>

          <FormGroup isRequired label='Password Confirmation' formFieldName='passwordConfirmation'>
            <FormControlInput type='password' />
          </FormGroup>

          <FormGroup label={'Primary Phone'} formFieldName={'primaryPhone'}>
            <FormControlInput type='tel' />
          </FormGroup>

          <FormGroup label={'Birth Date'} formFieldName={'birthDate'}>
            <FormControlInput type='date' />
          </FormGroup>

          <FormGroup label='Avatar' formFieldName='avatar'>
            <FormControlInput type='file' accept='image/*' />
          </FormGroup>

          <FormGroup label='User Type' formFieldName='type'>
            <FormControlSelect>
              {USER_TYPE_DROPDOWN_OPTIONS.map(({ key, label }) => (
                <option value={key}>{t(label)}</option>
              ))}
            </FormControlSelect>
          </FormGroup>

          <ClusterLayout>
            <FormGroup isRequired label='Country' formFieldName='country'>
              <FormControlSelect>
                {countryDropdownOptions.map(({ code, label }) => (
                  <option value={code}>{t(label)}</option>
                ))}
              </FormControlSelect>
            </FormGroup>

            <FormGroup label='City' formFieldName='city'>
              <FormControlInput />
            </FormGroup>
          </ClusterLayout>

          <FormGroup formFieldName='isHiddenContactInfo'>
            <FormControlCheckbox>Is Contacts Hidden</FormControlCheckbox>
          </FormGroup>

          <FormGroup formFieldName='isAllowedToSearch'>
            <FormControlCheckbox>Allow to Search</FormControlCheckbox>
          </FormGroup>

          <StackLayout space={'1rem'}>
            <FormSubmitButton>{t('login.sign-up.submit-button')}</FormSubmitButton>

            <HorizontalDivider height='1px' />

            <CenteredVertialLayout space={'1rem'} justifyContent='center'>
              <Button color='secondary' onClick={onNavigateToSignInPage}>
                {t('login.sign-in.submit-button')}
              </Button>

              <Button color='secondary' onClick={onNavigateToRestorePasswordPage}>
                {t('login.restore-password.button')}
              </Button>
            </CenteredVertialLayout>
          </StackLayout>
        </StackLayout>
      )}
    </Form>
  );
};
