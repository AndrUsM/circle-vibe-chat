import { ConversationBucketNameEnum } from '@circle-vibe/shared';

import { BASE_FILE_SERVER_API_URL } from '@core/constants';

export const composeFileUrl = (url: string, bucket: ConversationBucketNameEnum) => {
  return `${BASE_FILE_SERVER_API_URL}/${url}?bucket=${bucket}`;
};
