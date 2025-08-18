import { useCallback, useState } from "react";

import { Chat, ChatParticipant } from "@circle-vibe/shared";
import {
  Menu,
  useIcons,
  Icon,
  Button,
  StackLayout,
  HorizontalDivider,
  ExtendedReactFunctionalComponent,
  Show,
  Modal,
} from "@circle-vibe/components";

import { useUpdateConversationParticipant } from "@api/conversation-participants";
import {
  ConversationMembers,
  useActiveConversation,
} from "@features/conversation";

interface ChatActionsProps {
  chat: Chat;
}

export const ChatActions: ExtendedReactFunctionalComponent<
  ChatActionsProps
> = ({ chat }) => {
  const { id: chatId } = chat;
  const icons = useIcons();
  const { currentConversationParticipant, setCurrentConversationParticipant } = useActiveConversation();
  const updateConversationParticipant = useUpdateConversationParticipant();
  const { isMuted, id: participantId } = currentConversationParticipant as ChatParticipant;
  const [isConversationMembersModalOpen, setIsConversationMembersModalOpen] = useState(false);

  const showConversationMembers = () => setIsConversationMembersModalOpen(true);
  const openConversationSettings = useCallback(() => {}, []);
  const deleteConversation = useCallback(() => {}, []);
  const leaveConversation = useCallback(() => {}, []);
  const toggleMuteConversationAlerts = useCallback(async () => {
    const updatedChatParticipant = await updateConversationParticipant({
      chatId,
      participantId,
      isMuted: !isMuted,
    })
    
    setCurrentConversationParticipant(updatedChatParticipant);
  }, [isMuted, chatId, participantId]);

  return (
    <>
      <Menu
        zIndex={10}
        button={() => <Icon name={icons.cilOptions} size={24} />}
        className="chat-actions-menu"
      >
        <StackLayout>
          <div className="text-lg font-medium">Chat Actions:</div>

          <Button onClick={openConversationSettings}>Settings</Button>
          <Button onClick={showConversationMembers}>Members</Button>

          <Button color="danger" onClick={deleteConversation}>
            Delete
          </Button>

          <Show.When isTrue={!chat?.isSavedMessages}>
            <HorizontalDivider />

            <div className="text-lg font-medium">Participant Actions:</div>

            <Button color="secondary" onClick={toggleMuteConversationAlerts}>
              {isMuted ? "Enable Notifications" : "Disable Notifications"}
            </Button>

            <Button color="danger" onClick={leaveConversation}>
              Leave
            </Button>
          </Show.When>
        </StackLayout>
      </Menu>

      <Modal.Root
        isOpen={isConversationMembersModalOpen}
        onClose={() => setIsConversationMembersModalOpen(false)}
      >
        <Modal.Header onClose={() => setIsConversationMembersModalOpen(false)} />

        <Modal.Body>
          <ConversationMembers
            conversation={chat}
            chatParticipantId={participantId}
          />
        </Modal.Body>
      </Modal.Root>
    </>
  );
};
