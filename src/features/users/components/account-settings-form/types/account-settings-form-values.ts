import { CountryCode, UserType } from '@circle-vibe/shared';

export interface AccountSettingsFormValues {
  avatarUrl?: string;
  avatarUrlOptimized?: string;
  blockedUserIds?: number[];
  username?: string;
  firstname?: string;
  surname?: string;
  birthDate?: string;
  password?: string;
  isHiddenContactInfo?: boolean;
  isAllowedToSearch?: boolean;
  city?: string;
  country?: CountryCode;
  email?: string;
  primaryPhone?: string;
  type?: UserType;
}
