import { useState } from 'react';

import { Show, Tabs } from '@circle-vibe/components';

import { useNavigate } from 'react-router-dom';

import { BackNavigationButton, PageContent } from '@shared/components';

import { PrivatePagesEnum } from '@core/navigation';

import {
  AccountSettingsForm,
  InviteAccountSettingsForm,
  AccountSettingsTabs,
} from '@features/users';

export const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<AccountSettingsTabs>(AccountSettingsTabs.GENERAL);

  const goToConversatios = () => {
    navigate(`/app/${PrivatePagesEnum.CONVERSATIONS}`);
  };

  return (
    <PageContent>
      <Tabs className='mb-1'>
        <BackNavigationButton onClick={goToConversatios} />

        <Tabs.Button
          active={currentTab === AccountSettingsTabs.GENERAL}
          onClick={() => setCurrentTab(AccountSettingsTabs.GENERAL)}
        >
          General
        </Tabs.Button>

        <Tabs.Button
          active={currentTab === AccountSettingsTabs.INVITES}
          onClick={() => setCurrentTab(AccountSettingsTabs.INVITES)}
        >
          Invites
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
