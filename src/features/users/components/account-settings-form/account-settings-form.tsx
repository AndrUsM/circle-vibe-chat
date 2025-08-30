import React, { useCallback } from 'react';

import { ConversationBucketNameEnum, UploadImageOutputDto, UserType } from '@circle-vibe/shared';

import {
  Button,
  Form,
  FormControlCheckbox,
  FormControlError,
  FormControlInput,
  FormControlSelect,
  FormGroup,
  FormikFormControl,
  FormSubmitButton,
  Icon,
  StackLayout,
  Textarea,
  useCopyToClickboard,
  useIcons,
} from '@circle-vibe/components';

import { FormikProps } from 'formik';

import { FileUploadForm, FileUploadFormFileType, Section } from '@shared/components';

import { useCurrentUser } from '@core/hooks';

import { useUpdateUserSettings } from '@api/user';

import { ACCOUNT_SETTINGS_FORM_VALIDATION_SCHEMA } from './constants';
import { AccountSettingsFormValues } from './types';
import { composeAccountSettingsFormValues } from './utils';

export const AccountSettingsForm: React.FC = () => {
  const { user } = useCurrentUser();
  const { cilCopy } = useIcons();
  const updateUserSettings = useUpdateUserSettings();
  const onSubmit = useCallback(
    (values: AccountSettingsFormValues) => {
      return updateUserSettings(user.id, values);
    },
    [user?.id],
  );
  const copyToClickboard = useCopyToClickboard();
  const initialValues = composeAccountSettingsFormValues(user);

  return (
    <Form
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={ACCOUNT_SETTINGS_FORM_VALIDATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }: FormikProps<AccountSettingsFormValues>) => (
        <StackLayout space='2rem' className='pt-6'>
          <Section>
            <Section.Header>General Account Setting</Section.Header>

            <Section.Content>
              <FormGroup label='Firstname' formFieldName='firstname'>
                <FormControlInput />
              </FormGroup>

              <FormGroup label='Surname' formFieldName='surname'>
                <FormControlInput />
              </FormGroup>

              <FormGroup label='Nickname' formFieldName='username'>
                <FormControlInput />
              </FormGroup>

              <FormGroup label='Birth Date' formFieldName='birthDate'>
                <FormControlInput type='date' />
              </FormGroup>

              <FileUploadForm
                url={values?.avatarUrl ?? null}
                label='Avatar'
                bucket={ConversationBucketNameEnum.USER_AVATARS}
                type={FileUploadFormFileType.IMAGE}
                afterUpload={(fileUrls: UploadImageOutputDto) => {
                  setFieldValue('avatarUrl', fileUrls?.filePath);
                  setFieldValue('optimisedAvatarUrl', fileUrls?.optimisedFilePath);
                }}
              />
            </Section.Content>
          </Section>

          <Section>
            <Section.Header>Contact Information</Section.Header>

            <Section.Content>
              <FormGroup label='Email' formFieldName='email'>
                <FormControlInput type='email' />
              </FormGroup>

              <FormGroup label='Phone' formFieldName='primaryPhone'>
                <FormControlInput type='phone' />
              </FormGroup>
            </Section.Content>
          </Section>

          <Section>
            <Section.Header>Security</Section.Header>

            <Section.Content>
              <StackLayout space='1rem'>
                <StackLayout space='0.5rem'>
                  <FormGroup label='Password' formFieldName='password'>
                    <FormControlInput type='password' />
                  </FormGroup>

                  <FormikFormControl label='Account Type' formFieldName='type'>
                    <FormControlSelect>
                      <option value={UserType.PRIVATE}>Private</option>
                      <option value={UserType.PUBLIC}>Public</option>
                    </FormControlSelect>

                    <FormControlError />
                  </FormikFormControl>
                </StackLayout>

                <StackLayout space='0'>
                  <FormikFormControl formFieldName='isAllowedToSearch'>
                    <FormControlCheckbox>Show in search</FormControlCheckbox>
                  </FormikFormControl>

                  <FormikFormControl formFieldName='isHiddenContactInfo'>
                    <FormControlCheckbox>Hide contact info</FormControlCheckbox>
                  </FormikFormControl>
                </StackLayout>
              </StackLayout>
            </Section.Content>
          </Section>

          <Section>
            <Section.Header>Location Information</Section.Header>

            <Section.Content>
              <FormGroup label='Country' formFieldName='country'>
                <FormControlInput />
              </FormGroup>

              <FormGroup label='City' formFieldName='city'>
                <FormControlInput />
              </FormGroup>
            </Section.Content>
          </Section>

          <Section>
            <Section.Header>Personal Key</Section.Header>

            <Section.Content>
              <StackLayout>
                <Button
                  size='small'
                  color='secondary'
                  onClick={() => copyToClickboard(user.privateToken)}
                >
                  <Icon color='var(--cv-light)' name={cilCopy} size={14} />
                </Button>

                <Textarea
                  minRows={3}
                  disabled
                  className='resize-vertical min-h-15'
                  value={user.privateToken}
                  readOnly
                />
              </StackLayout>
            </Section.Content>
          </Section>

          <FormSubmitButton>Save</FormSubmitButton>
        </StackLayout>
      )}
    </Form>
  );
};
