import { createContext, useCallback, useMemo, useState } from "react";
import { User } from "@circle-vibe/shared";
import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";
import { localStorageService } from "@core/services";

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
  const [user, setUser] = useState<User | null>(
    localStorageService.get("user")
  );

  const clear = () => {
    setUser(null);
    localStorageService.set("user", null);
  };

  const saveUser = useCallback((user: User) => {
    localStorageService.set("user", user);
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
