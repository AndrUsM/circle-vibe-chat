import { UserType } from "@circle-vibe/shared";

interface DropdownOptions<T> {
  key: T;
  label: string;
}

export const USER_TYPE_DROPDOWN_OPTIONS: DropdownOptions<UserType>[] = [
  { key: UserType.PRIVATE, label: "user.user_type.private" },
  { key: UserType.PUBLIC, label: "user.user_type.public" },
];
