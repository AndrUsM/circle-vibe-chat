import { BASE_FILE_SERVER_API_URL } from '@core/constants';

export const composeFileUrl = (url: string, bucket: string) => {
  return `${BASE_FILE_SERVER_API_URL}/${url}?bucket=${bucket}`;
};
