import React, {
	Suspense,
	useCallback,
	useRef
} from "react";
import { useTranslation } from "react-i18next";

import * as Resizer from "@column-resizer/react";
import { useDebouncedCallback } from "use-debounce";

import {
	StackLayout,
	HorizontalDivider,
	FormControl,
	Button,
	CenteredVertialLayout,
	Input,
	Modal,
	Icon,
	Show,
	LoadingOverlay,
	useIcons,
	useBoolean,
} from "@circle-vibe/components";

import { useDeleteMessage } from "@api/messages";
import {
	PaginationControls,
	PaginationScrollButton,
	Filters,
} from "@shared/components";
import {
	useConfirmation,
	useScrollToBlockPosition
} from "@shared/hooks";

import {
	usePreviewFileState,
	Message,
	useUpdateMessageState,
	MessageUpdateDialog,
	MessageUpdateFormValues,
	MessageForm,
	MessagesFilterBar,
	MESSAGES_FILTER_BAR_FORM_INITIAL_VALUES,
	MessagesFilterBarFormValues,
} from "@features/messages";
import {
	useConversationGateway,
	useInitialChatSelection,
	Chat,
} from "@features/conversation";

import { ConversationModals } from "./conversation-modals";

import "./conversation.scss";

export const Conversations: React.FC = () => {
	const { t } = useTranslation();
	const { cilKeyboard, cilFilter } = useIcons();
	const confirm = useConfirmation();
	const onScrollToPosition = useScrollToBlockPosition();
	const deleteMessage = useDeleteMessage();
	const [isFiltersBarVisible, triggerFiltersBarVisibility, setFilterBarVisibility] = useBoolean(false);
	const messagesRef = useRef<HTMLDivElement>(null);
	const { toggleFileDialogVisibility, previewFile } = usePreviewFileState();
	
	const [openChatCreationModal, toggleOpenChatCreationModal, setOpenChatCreationModal,] = useBoolean(false);
	const {
		openMessageUpdateDialog, onCloseMessageUpdateDialog, onOpenMessageUpdateDialog, messageUpdateDialogState,
	} = useUpdateMessageState();
	
	const onScrollMessages = () => {
		if (Boolean(messagesRef?.current?.scrollTop)) {
			return;
		}
		
		onScrollToPosition(messagesRef, "end", "end");
	};
	
	const {
		allowToPreselectChat,
		chats,
		chatParticipant,
		chatsPage,
		chatsLoading,
		isAnyChatSelected,
		messages,
		messagesPage,
		messagesLoading,
		selectedChatId,
		isAnyoneTyping,
		triggerStartTypingNotification,
		triggerStopTypingNotification,
		handleRefreshMessages,
		handleSendMessageWithThread,
		triggerGetPaginatedMessages,
		handleSendMessage,
		isSavedMessagesChat,
		onChatSelect,
		triggerGetPaginatedChats,
		triggerSearchChatsByName,
	} = useConversationGateway(onScrollMessages);
	
	const debouncedChatSearch = useDebouncedCallback(triggerSearchChatsByName, 1000);
	
	const onDeleteMessage = useCallback(async (messageId: number) => {
		await confirm("Are your sure you want to delete this message?", "danger");
		deleteMessage(Number(selectedChatId), messageId, messagesPage);
	}, [selectedChatId, messagesPage]);
	const onUpdateMessage = useCallback((messageId: number) => {
		onOpenMessageUpdateDialog({
			chatId: Number(selectedChatId), messageId,
		});
	}, [selectedChatId]);
	
	useInitialChatSelection(chats?.data ?? [], onChatSelect, allowToPreselectChat);
	
	return (<>
			<HorizontalDivider height="5px"/>
			
			<Resizer.Container className="conversations">
				<Resizer.Section
					className="relative flex items-center justify-center w-full messages-resizer-section"
					minSize={250}
				>
					<StackLayout className="w-full py-3 pl-3">
						<StackLayout
							space="1rem"
							justifyContent="justify-between"
							className="flex-wrap pr-3"
						>
							<FormControl className="w-full">
								<Input
									className="p-4 rounded-2"
									placeholder={t("input.search.placeholder")}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										debouncedChatSearch(String(e.target.value));
									}}
								/>
							</FormControl>
							
							<Button
								size="medium"
								className="w-full"
								onClick={toggleOpenChatCreationModal}
							>
								{t("button.actions.create")}
							</Button>
						</StackLayout>
						
						<StackLayout className="overflow-y-container">
							{chats?.data.map((chat) => (
									<Chat
										key={chat.id}
										chat={chat}
										chatParticipant={chatParticipant}
										selected={selectedChatId === chat.id}
										onClick={() => {
											onChatSelect(chat.id)
											setFilterBarVisibility(false);
										}}
									/>
								))
							}
						</StackLayout>
						
						<PaginationControls
							paginatedResponse={chats}
							currentPage={chatsPage}
							onPageChange={triggerGetPaginatedChats}
						/>
					</StackLayout>
					
					<Show.When isTrue={chatsLoading}>
						<LoadingOverlay/>
					</Show.When>
				</Resizer.Section>
				
				<Resizer.Bar
					size={7}
					className="transition bg-secondary cursor-resize"
				/>
				
				<Resizer.Section
					className="relative flex items-center w-full"
					minSize={100}
				>
					<StackLayout justifyContent="end" className="w-full p-3">
						<Filters initialValue={MESSAGES_FILTER_BAR_FORM_INITIAL_VALUES}>
							{({ isActive, filters }) => (<>
									<Show.When
										isTrue={isFiltersBarVisible && Boolean(selectedChatId)}
									>
										<MessagesFilterBar
											initialValues={filters as MessagesFilterBarFormValues}
											conversationId={Number(selectedChatId)}
											onClose={triggerFiltersBarVisibility}
											onSubmit={(filter) => {
												triggerGetPaginatedMessages(chatsPage, { force: true }, filter);
											}}
										/>
										
										<HorizontalDivider
											color="var(--cv-bg-secondary)"
											height="0.2rem"
										/>
									</Show.When>
									
									<StackLayout
										ref={messagesRef}
										className="overflow-y-container"
									>
										{(messages?.data ?? [])?.map((message) => (<Suspense key={message.id} fallback={<LoadingOverlay/>}>
												<Message
													message={message}
													isSavedMessages={isSavedMessagesChat}
													onStopTyping={triggerStopTypingNotification}
													onStartTyping={triggerStartTypingNotification}
													chatParticipantId={Number(chatParticipant?.id)}
													onDeleteMessage={onDeleteMessage}
													onUpdateMessage={onUpdateMessage}
													onOpenFile={toggleFileDialogVisibility}
													onReplyMessage={handleSendMessageWithThread}
												/>
											</Suspense>))}
										
										<Show.When
											isTrue={!messagesLoading && !messages?.totalItems}
										>
                      <span className="text-md text-truncate">
                        {t("message.empty")}
                      </span>
										</Show.When>
									</StackLayout>
									
									<CenteredVertialLayout
										space="0.5rem"
										justifyContent="space-between"
									>
										<PaginationControls
											paginatedResponse={messages}
											currentPage={messagesPage}
											onPageChange={triggerGetPaginatedMessages}
										/>
										
										<Show>
											<Show.When isTrue={isAnyoneTyping}>
												<Icon
													className="typing-indicator"
													name={cilKeyboard}
													color="var(--cv-primary)"
													size={32}
												/>
											</Show.When>
											<Show.Else>
												<div></div>
											</Show.Else>
										</Show>
										
										<CenteredVertialLayout space="0.5rem">
											<Button
												className="messages-filter-button"
												color={isActive ? "primary" : "secondary"}
												onClick={triggerFiltersBarVisibility}
											>
												<Icon
													color="var(--cv-light)"
													name={cilFilter}
													size={12}
												/>
											</Button>
											
											<PaginationScrollButton messagesRef={messagesRef}/>
										</CenteredVertialLayout>
									</CenteredVertialLayout>
									
									<Show.When
										isTrue={isAnyChatSelected && Boolean(chatParticipant?.id)}
									>
										<MessageForm
											onStopTyping={triggerStopTypingNotification}
											onStartTyping={triggerStartTypingNotification}
											onCreateMessage={handleSendMessage}
										/>
									</Show.When>
								</>)}
						</Filters>
					</StackLayout>
					
					<Show.When isTrue={messagesLoading}>
						<LoadingOverlay/>
					</Show.When>
				</Resizer.Section>
			</Resizer.Container>
			
			<ConversationModals
				openChatCreationModal={openChatCreationModal}
				setOpenChatCreationModal={setOpenChatCreationModal}
				previewFile={previewFile}
				toggleFileDialogVisibility={toggleFileDialogVisibility}
			/>
			
			<Modal.Root
				isOpen={openMessageUpdateDialog}
				onClose={onCloseMessageUpdateDialog}
			>
				<Modal.Header onClose={onCloseMessageUpdateDialog}>
					Update Message
				</Modal.Header>
				
				<Modal.Body>
					<MessageUpdateDialog
						chatId={Number(messageUpdateDialogState?.chatId)}
						messageId={Number(messageUpdateDialogState?.messageId)}
						initialValues={messageUpdateDialogState?.initialValues as MessageUpdateFormValues}
						onSuccess={() => {
							handleRefreshMessages();
							onCloseMessageUpdateDialog();
						}}
					/>
				</Modal.Body>
			</Modal.Root>
		</>);
};
