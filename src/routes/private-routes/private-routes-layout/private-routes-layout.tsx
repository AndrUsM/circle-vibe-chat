import {
  ClusterLayout,
  ExtendedReactFunctionalComponent,
  Icon,
  Tooltip,
  useIcons,
} from "@circle-vibe/components";
import { TopbarLogo, UserAvatar } from "@shared/components";
import { TopbarActions } from "../conversations/topbar-actions";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "@core/hooks";
import { composeAvatarFallback } from "@circle-vibe/shared";
import { PrivatePagesEnum } from "@core/navigation";
import { ConversationProvider } from "@features/conversation";
import React from "react";

export const PrivateRoutesLayout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { cilSettings } = useIcons();
  const avatarFallback = composeAvatarFallback(user);

  const goToAccountSettings = () => {
    void navigate(PrivatePagesEnum.ACCOUNT_SETTINGS);
  };

  return (
    <ConversationProvider>
      <main className="h-full">
        <ClusterLayout
          className="p-2"
          alignItems="center"
          justifyContent="space-between"
          space="1rem"
        >
          <TopbarLogo />

          <ClusterLayout space="1.15rem">
            <Tooltip title={t("conversations.actions.account-settings")}>
              <UserAvatar
                className="cursor-pointer"
                fallback={avatarFallback}
                onClick={goToAccountSettings}
              />
            </Tooltip>

            <Tooltip title="Settings">
              <Icon
                className="cursor-pointer"
                size={28}
                name={cilSettings}
                onClick={goToAccountSettings}
              />
            </Tooltip>
            <TopbarActions />
          </ClusterLayout>
        </ClusterLayout>

        <Outlet />
      </main>
    </ConversationProvider>
  );
};
