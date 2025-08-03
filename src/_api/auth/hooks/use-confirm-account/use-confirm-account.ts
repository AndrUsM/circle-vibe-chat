import { request } from "@core/request";
import { useCallback } from "react";

interface ConfirmAccountInput {
  email: string;
  code: string;
}

export const useConfirmAccount = () => {
  return useCallback((data: ConfirmAccountInput) => {
    return request<boolean>({
      url: "user-confirmation",
      method: "POST",
      data,
    });
  }, []);
};