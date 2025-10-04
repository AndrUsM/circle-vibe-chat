import React, { useState } from 'react';

import { Show, Tabs } from '@circle-vibe/components';

import { useNavigate } from 'react-router-dom';

import { BackNavigationButton, PageContent } from '@shared/components';

import { GLOBAL_PAGES_ENUM, PrivatePagesEnum } from '@core/navigation';

import {
  AccountSettingsForm,
  AccountSettingsTabs,
  InviteAccountSettingsForm,
} from '@features/users';
import { useTranslation } from 'react-i18next';

export const AccountSettings: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<AccountSettingsTabs>(AccountSettingsTabs.GENERAL);

  const goToConversatios = () => {
    navigate(`/${GLOBAL_PAGES_ENUM.APP}/${PrivatePagesEnum.CONVERSATIONS}`);
  };

  return (
    <PageContent>
      <Tabs className='mb-1'>
        <BackNavigationButton onClick={goToConversatios} />

        <Tabs.Button
          active={currentTab === AccountSettingsTabs.GENERAL}
          onClick={() => setCurrentTab(AccountSettingsTabs.GENERAL)}
        >
          {t('settings.account-settings.general.label')}
        </Tabs.Button>

        <Tabs.Button
          active={currentTab === AccountSettingsTabs.INVITES}
          onClick={() => setCurrentTab(AccountSettingsTabs.INVITES)}
        >
          {t('settings.account-settings.invites.label')}
        </Tabs.Button>
      </Tabs>

      <Show.When isTrue={currentTab === AccountSettingsTabs.GENERAL}>
        <AccountSettingsForm />
      </Show.When>

      <Show.When isTrue={currentTab === AccountSettingsTabs.INVITES}>
        <InviteAccountSettingsForm />
      </Show.When>
    </PageContent>
  );
};
