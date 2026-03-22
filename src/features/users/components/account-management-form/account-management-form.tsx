import React from 'react';

import { useTranslation } from 'react-i18next';

import {
  Button,
  StackLayout,
} from '@circle-vibe/components';

import { Section } from '@shared/components';

import './account-management-form.scss';
import { useConfirmation } from '@shared/hooks';
import { useDeactivateAccount, useDeleteAccount } from '@api/user';

export const AccountManagementForm: React.FC = () => {
  const { t } = useTranslation();
  const confirm = useConfirmation();
  const deleteAccount = useDeleteAccount();
  const deactivateAccount = useDeactivateAccount();

  const onDelete = async () => {
    await confirm("Are you sure you want to delete account?", "danger");
    await deleteAccount();
  }

  const onDeactivate = async () => {
    await confirm('Are you sure you want to deactivate account?', 'danger');
    await deactivateAccount();
  };

  return (
    <StackLayout space='2rem' className='pt-6'>
      <Section>
        <Section.Header>
          {t('settings.account-settings.security-settings.delete-account.label')}
        </Section.Header>

        <Section.Description>
          {t('settings.account-settings.security-settings.delete-account.description')}
        </Section.Description>

        <Button color='danger' className='account-action-button' onClick={onDelete}>
          Delete
        </Button>
      </Section>

      <Section>
        <Section.Header>
          {t('settings.account-settings.security-settings.deactivate-account.label')}
        </Section.Header>

        <Section.Description>
          {t('settings.account-settings.security-settings.deactivate-account.description')}
        </Section.Description>

        <Button color='danger' className='account-action-button' onClick={onDeactivate}>
          Deactivate
        </Button>
      </Section>
    </StackLayout>
  );
}
