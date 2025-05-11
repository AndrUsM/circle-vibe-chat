import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "@circle-vibe/shared";

export const useAuthGuard = () => {
  const navigate = useNavigate();
  // const { get } = useCookies();
  const token = '';
  // get("token");

  useEffect(() => {
    if (token) {
      return;
    }

    navigate("/auth/sign-in");
  }, []);
};
