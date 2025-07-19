import { PaginatedResponse } from "@circle-vibe/shared";

export const composePaginationResponse = (response: PaginatedResponse<any>) => {
  return {
    ...response,
    data: response.data.reverse(),
  };
};
