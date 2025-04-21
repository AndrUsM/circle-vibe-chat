interface UserFullName {
  username: string;
  surname: string;
}

export const getUserAvatarFallback = (user?: UserFullName) => {
  if (!user) {
    return "";
  }

  const { username, surname } = user;

  return [username, surname]
    .filter(Boolean)
    .map((line) => line[0])
    .join("")
    .toUpperCase();
};
