import { ChatType } from '@circle-vibe/shared';

export interface PaginatedChatsFilters {
  name?: string;
  empty?: boolean;
  removed?: boolean;
  type?: ChatType;
  userIds?: number[];
}
