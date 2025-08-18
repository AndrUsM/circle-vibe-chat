import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { User } from "@circle-vibe/shared";

import {
	useCurrentUser,
	useNotification
} from "@core/hooks";
import { request } from "@core/request";
import { SignInFormInput } from "@features/users/components/sign-in-form/types";
import { setAuthToken } from "@core/utils";
import { PrivatePagesEnum } from "@core/navigation";

interface Response {
	token: string;
	user: User;
}

export const useSignIn = () => {
	const { t } = useTranslation();
	const notification = useNotification();
	const navigate = useNavigate();
	const { setUser } = useCurrentUser();
	
	return useCallback(async (data: SignInFormInput) => {
		try {
			const response = await request<Response>({
				url: "auth/sign-in", data, method: "POST",
			});

			const { token, user } = response?.data ?? {};
			
			setAuthToken(String(token));
			setUser(user);
			
			notification({
				type: "success", content: "Successfully signed in!",
			});
			
			void navigate(`/app/${PrivatePagesEnum.CONVERSATIONS}`);
		} catch (error) {
			notification({
				type: "warning", content: t("login.wrong-credentials.message"),
			});
		}
	}, []);
};
