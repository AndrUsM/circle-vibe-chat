import { MessageType } from '@circle-vibe/shared';
import { IFileUrl } from './file-url.interface.js';

export type UseMessageTypeToUploadingMethodMapOutput = (
  messageType: MessageType,
) => (file: File, bucket: string) => Promise<IFileUrl>;
