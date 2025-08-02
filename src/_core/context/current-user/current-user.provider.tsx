import { createContext, useCallback, useMemo, useState } from "react";

import { User } from "@circle-vibe/shared";
import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

import { useCurrentSessionCredentials } from "@core/hooks";

export interface CurrentUserContext {
  user: User;
  setUser: (user: User) => void;
  clear: VoidFunction;
}

export const CurrentUserContext = createContext<CurrentUserContext | undefined>(
  undefined
);

export const CurrentUserProvider: ExtendedReactFunctionalComponent = ({
  children,
}) => {
  const {
    currentUser,
    setCurrentUser,
    setToken,
  } = useCurrentSessionCredentials();
  const [user, setUser] = useState<User | null>(
    currentUser,
  );

  const clear = () => {
    setUser(null);
    setCurrentUser(null);
  };

  const saveUser = useCallback((user: User) => {
    setCurrentUser(user);
    setUser(user);
  }, []);

  const state: CurrentUserContext = useMemo(
    () => ({
      user: user as User,
      clear,
      setUser: saveUser,
    }),
    [user]
  );

  return (
    <CurrentUserContext.Provider value={state}>
      {children}
    </CurrentUserContext.Provider>
  );
};
