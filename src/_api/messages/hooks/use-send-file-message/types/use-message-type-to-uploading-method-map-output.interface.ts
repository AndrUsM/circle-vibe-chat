import { ConversationBucketNameEnum, MessageType } from '@circle-vibe/shared';
import { IFileUrl } from './file-url.interface';

export type UseMessageTypeToUploadingMethodMapOutput = (
  messageType: MessageType,
) => (file: File, bucket: ConversationBucketNameEnum) => Promise<IFileUrl>;
