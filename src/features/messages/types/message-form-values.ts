export interface MessageFormValues {
  content: string;
  file: File | null;
  threadId?: number;
  parentMessageId?: number;
}
