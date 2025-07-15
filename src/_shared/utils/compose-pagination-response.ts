import { PaginatedResponse } from "@circle-vibe/shared";

export const composePaginationResponse = (
  data: PaginatedResponse<any>
) => ({
  ...data,
  data: data?.data.reverse(),
});
