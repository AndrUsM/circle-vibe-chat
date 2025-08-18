import { useMemo } from "react";
import {
	Chat,
	PaginatedResponse
} from "@circle-vibe/shared";

export const useIsSavedMessagesChat = (chats: PaginatedResponse<Chat> | null, selectedChatId: number | null) => {
	return useMemo(() => {
		const selectedChat = chats?.data.find(({ id }) => id === selectedChatId);
		
		return Boolean(selectedChat?.isSavedMessages);
	}, [chats, selectedChatId]);
}