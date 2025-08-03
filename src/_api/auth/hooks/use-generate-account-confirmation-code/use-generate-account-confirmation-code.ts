import { useNotification } from "@core/hooks";
import { request } from "@core/request";
import { useCallback, useState } from "react";

export const useGenerateAccountConfirmationCode = () => {
  const [loading, setLoading] = useState(false);
  const notification = useNotification();

  const generateAccountConfirmationCode = useCallback(
    async (email: string) => {
      setLoading(true);

      const response = await request({
        method: "POST",
        url: "user-confirmation/generate-code",
        data: {
          email,
        },
      });

      const status = (response?.data as {
        status: number;
      })?.status;

      setLoading(false);

      if (status === 400) {
        notification({
          type: "error",
          content: "Incorrect email, please check and try again!",
        });

        return null;
      }

      return response;

    },
    [loading]
  );

  return {
    generateAccountConfirmationCode,
    loading,
  };
};
