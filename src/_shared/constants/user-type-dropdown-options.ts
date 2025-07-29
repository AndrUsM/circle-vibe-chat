import { UserType } from "@circle-vibe/shared";

import { DropdownOptions } from "@shared/types";

export const USER_TYPE_DROPDOWN_OPTIONS: DropdownOptions<UserType>[] = [
  { key: UserType.PRIVATE, label: "user.user_type.private" },
  { key: UserType.PUBLIC, label: "user.user_type.public" },
];
