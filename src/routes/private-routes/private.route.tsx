import React from 'react';

import { Route } from 'react-router-dom';

import { PrivatePagesEnum } from '@core/navigation';

const ConversationsLazy = React.lazy(() =>
  import('./conversations').then(({ Conversations }) => ({
    default: Conversations,
  })),
);

const AccountSettingsLazy = React.lazy(() =>
  import('./account-settings').then(({ AccountSettings }) => ({
    default: AccountSettings,
  })),
);

const PrivateRoutesLayoutLazy = React.lazy(() =>
  import('./private-routes-layout').then(({ PrivateRoutesLayout }) => ({
    default: PrivateRoutesLayout,
  })),
);

export const PrivateRouter: React.ReactNode = (
  <Route path='' Component={PrivateRoutesLayoutLazy}>
    <Route path={PrivatePagesEnum.CONVERSATIONS} Component={ConversationsLazy} />
    <Route path={PrivatePagesEnum.ACCOUNT_SETTINGS} Component={AccountSettingsLazy} />
  </Route>
);
