import React, { useCallback, useEffect, useState } from 'react';

import {
  ChatParticipant,
  ConversationBucketNameEnum,
  getUserFullName,
  UploadImageOutputDto,
  UserType,
} from '@circle-vibe/shared';

import {
  Button,
  CenteredVertialLayout,
  Checkbox,
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

import { useUpdateUserSettings, useUsersRelatedWithCurrent } from '@api/user';
import { toggleArrayItem } from '@shared/utils';

import { ACCOUNT_SETTINGS_FORM_VALIDATION_SCHEMA } from './constants';
import { AccountSettingsFormValues } from './types';
import { composeAccountSettingsFormValues } from './utils';
import { useTranslation } from 'react-i18next';
import { USER_TYPE_DROPDOWN_OPTIONS } from '@shared/constants';

export const AccountSettingsForm: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useCurrentUser();
  const { cilCopy } = useIcons();
  const updateUserSettings = useUpdateUserSettings();
  const getUsersRelatedWithCurrent = useUsersRelatedWithCurrent();
  const onSubmit = useCallback(
    (values: AccountSettingsFormValues) => {
      return updateUserSettings(user.id, values);
    },
    [user?.id],
  );
  const copyToClickboard = useCopyToClickboard();
  const initialValues = composeAccountSettingsFormValues(user);
  const [usersRelatedWithCurrentUser, setUsersRelatedWithCurrentUser] = useState<ChatParticipant[]>(
    [],
  );

  useEffect(() => {
    getUsersRelatedWithCurrent().then((participants) => {
      setUsersRelatedWithCurrentUser(participants);
    });
  }, []);

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
            <Section.Header>
              {t('settings.account-settings.general.account-settings.label')}
            </Section.Header>

            <Section.Content>
              <FormGroup
                label={t('settings.account-settings.general.account-settings.firstname.label')}
                formFieldName='firstname'
              >
                <FormControlInput />
              </FormGroup>

              <FormGroup
                label={t('settings.account-settings.general.account-settings.surname.label')}
                formFieldName='surname'
              >
                <FormControlInput />
              </FormGroup>

              <FormGroup
                label={t('settings.account-settings.general.account-settings.username.label')}
                formFieldName='username'
              >
                <FormControlInput />
              </FormGroup>

              <FormGroup
                label={t('settings.account-settings.general.account-settings.birth-date.label')}
                formFieldName='birthDate'
              >
                <FormControlInput type='date' />
              </FormGroup>

              <FileUploadForm
                url={values?.avatarUrl ?? null}
                label={t('settings.account-settings.general.account-settings.avatar.label')}
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
            <Section.Header>
              {t('settings.account-settings.general.account-settings.blocked-users.section.label')}
            </Section.Header>

            <Section.Content>
              <FormGroup
                label={t('settings.account-settings.general.account-settings.blocked-users.label')}
                formFieldName='blockedUserIds'
              >
                <StackLayout space='0.5rem'>
                  {usersRelatedWithCurrentUser?.map((participant) => (
                    <CenteredVertialLayout
                      key={participant.userId}
                      onClick={() => {
                        setFieldValue(
                          'blockedUserIds',
                          toggleArrayItem(values.blockedUserIds ?? [], participant.userId),
                        );
                      }}
                    >
                      <Checkbox checked={values.blockedUserIds?.includes(participant.userId)}>
                        {getUserFullName(participant.user)}
                      </Checkbox>
                    </CenteredVertialLayout>
                  ))}
                </StackLayout>
              </FormGroup>
            </Section.Content>
          </Section>

          <Section>
            <Section.Header>Contact Information</Section.Header>

            <Section.Content>
              <FormGroup
                label={t('settings.account-settings.general.account-settings.email.label')}
                formFieldName='email'
              >
                <FormControlInput type='email' />
              </FormGroup>

              <FormGroup
                label={t('settings.account-settings.general.account-settings.phone.label')}
                formFieldName='primaryPhone'
              >
                <FormControlInput type='phone' />
              </FormGroup>
            </Section.Content>
          </Section>

          <Section>
            <Section.Header>
              {t('settings.account-settings.general.account-settings.security.label')}
            </Section.Header>

            <Section.Content>
              <StackLayout space='1rem'>
                <StackLayout space='0.5rem'>
                  <FormGroup
                    label={t('settings.account-settings.general.account-settings.password.label')}
                    formFieldName='password'
                  >
                    <FormControlInput type='password' />
                  </FormGroup>

                  <FormikFormControl
                    label={t(
                      'settings.account-settings.general.account-settings.account-type.label',
                    )}
                    formFieldName='type'
                  >
                    <FormControlSelect>
                      {USER_TYPE_DROPDOWN_OPTIONS.map(({ key, label }) => (
                        <option key={`user-type-${key}`} value={key}>
                          {t(label)}
                        </option>
                      ))}
                    </FormControlSelect>

                    <FormControlError />
                  </FormikFormControl>
                </StackLayout>

                <StackLayout space='0'>
                  <FormikFormControl formFieldName='isAllowedToSearch'>
                    <FormControlCheckbox>
                      {t('settings.account-settings.general.account-settings.show-in-search.label')}
                    </FormControlCheckbox>
                  </FormikFormControl>

                  <FormikFormControl formFieldName='isHiddenContactInfo'>
                    <FormControlCheckbox>
                      {t(
                        'settings.account-settings.general.account-settings.hide-contact-info.label',
                      )}
                    </FormControlCheckbox>
                  </FormikFormControl>
                </StackLayout>
              </StackLayout>
            </Section.Content>
          </Section>

          <Section>
            <Section.Header>
              {t('settings.account-settings.general.account-settings.location-information.label')}
            </Section.Header>

            <Section.Content>
              <FormGroup
                label={t('settings.account-settings.general.account-settings.country.label')}
                formFieldName='country'
              >
                <FormControlInput />
              </FormGroup>

              <FormGroup
                label={t('settings.account-settings.general.account-settings.city.label')}
                formFieldName='city'
              >
                <FormControlInput />
              </FormGroup>
            </Section.Content>
          </Section>

          <Section>
            <Section.Header>
              {t('settings.account-settings.general.account-settings.personal-key.label')}
            </Section.Header>

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

          <FormSubmitButton>{t('button.actions.save')}</FormSubmitButton>
        </StackLayout>
      )}
    </Form>
  );
};
