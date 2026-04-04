import { MessageType } from '@circle-vibe/shared';

export interface MessageFormValues {
  content: string;
  file: File | null;
  threadId?: number;
  parentMessageId?: number;
  uploadAs?: MessageType;
}
