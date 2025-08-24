import React from 'react';

import { useGetCurrentUserByToken } from '@api/auth/hooks';

export const useRestoreToken = () => {
  const getCurrentUser = useGetCurrentUserByToken();

  React.useEffect(() => {
    getCurrentUser();
  }, []);
};
