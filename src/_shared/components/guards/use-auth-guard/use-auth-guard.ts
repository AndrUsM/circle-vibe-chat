import { useEffect } from "react";

import { useCookies } from "@shared/hooks";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = () => {
  const { get } = useCookies();
  const navigate = useNavigate();
  const token = get("token");

  useEffect(() => {
    if (token) {
      return;
    }

    navigate("/auth");
  }, []);
};
