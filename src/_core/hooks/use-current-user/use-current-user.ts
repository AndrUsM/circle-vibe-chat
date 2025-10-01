import { useContext } from 'react';

import { User } from '@circle-vibe/shared';

import { noop } from '@circle-vibe/components';

import { CurrentUserContext } from '@core/context';

export const useCurrentUser = (): CurrentUserContext => {
  const userContext = useContext(CurrentUserContext);
  const user = userContext?.user;

  return {
    user: user ?? {} as User,
    setUser: userContext?.setUser ?? noop,
    clear: userContext?.clear ?? noop,
  };
};
