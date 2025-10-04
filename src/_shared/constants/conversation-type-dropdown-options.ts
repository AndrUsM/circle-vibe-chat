import { ChatType } from '@circle-vibe/shared';

import { DropdownOptions } from '@shared/types';

export const CONVERSATION_TYPE_DROPDOWN_OPTIONS: DropdownOptions<ChatType>[] = [
  { key: ChatType.PRIVATE, label: 'conversations.type.private.label' },
  { key: ChatType.PUBLIC, label: 'conversations.type.public.label' },
];
