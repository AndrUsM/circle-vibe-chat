import { User } from "@circle-vibe/shared";

export const composeAvatarFallback = (user: User) =>
  [user.username, user.surname]
    .filter(Boolean)
    .map((line) => line.charAt(0))
    .join("")
    .toUpperCase();
