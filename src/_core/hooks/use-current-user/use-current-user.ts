import { noop, User } from "@circle-vibe/shared";
import { CurrentUserContext } from "@core/context";
import { useContext } from "react";

export const useCurrentUser = (): CurrentUserContext => {
  const userContext = useContext(CurrentUserContext);
  const user = userContext?.user;

  return {
    user: user as User,
    setUser: userContext?.setUser ?? noop,
    clear: userContext?.clear ?? noop
  };
}