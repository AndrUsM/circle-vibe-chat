interface UserFullName {
  username: string;
  surname: string;
}

export const getUserFullName = (user?: UserFullName) => {
  if (!user) {
    return '';
  }

  const { username, surname } = user;

  return [username, surname].filter(Boolean).join(" ");
}
