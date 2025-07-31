import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Show } from "@circle-vibe/components";

import { PrivatePagesEnum } from "@core/navigation";
import {
  BackNavigationButton,
  PageContent,
  Tabs,
  TabsButton,
} from "@shared/components";

import {
  AccountSettingsForm,
  InviteAccountSettingsForm,
  AccountSettingsTabs,
} from "@features/users";

export const AccountSettings: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AccountSettingsTabs>(
    AccountSettingsTabs.GENERAL
  );
  const navigate = useNavigate();

  return (
    <PageContent>
      <Tabs className="mb-1">
        <BackNavigationButton />

        <TabsButton
          active={currentTab === AccountSettingsTabs.GENERAL}
          onClick={() => setCurrentTab(AccountSettingsTabs.GENERAL)}
        >
          General
        </TabsButton>
        <TabsButton
          active={currentTab === AccountSettingsTabs.INVITES}
          onClick={() => setCurrentTab(AccountSettingsTabs.INVITES)}
        >
          Invites
        </TabsButton>
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
