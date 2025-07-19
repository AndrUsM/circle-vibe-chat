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
} from "@circle-vibe/components";
import { Modal } from "@shared/components";
import {
  ConversationMembers,
  useActiveConversation,
} from "@features/conversation";
import { useUpdateConversationParticipant } from "@features/conversation-participants";

// import { cookiesService, localStorageService } from "@core/services";
// import { useNavigate } from "react-router-dom";

interface ChatActionsProps {
  chat: Chat;
}

export const ChatActions: ExtendedReactFunctionalComponent<
  ChatActionsProps
> = ({ chat }) => {
  // const navigate = useNavigate();
  const icons = useIcons();
  const { currentConversationParticipant, setCurrentConversationParticipant } =
    useActiveConversation();
  const updateConversationParticipant = useUpdateConversationParticipant();
  const { id: chatId } = chat;
  const { isMuted, id: participantId } =
    currentConversationParticipant as ChatParticipant;
  const [isConversationMembersModalOpen, setIsConversationMembersModalOpen] =
    useState(false);

  const openConversationSettings = useCallback(() => {}, []);
  const showConversationMembers = useCallback(() => {
    setIsConversationMembersModalOpen(true);
  }, []);
  const deleteConversation = useCallback(() => {

  }, []);
  const leaveConversation = useCallback(() => {}, []);
  const toggleMuteConversationAlerts = useCallback(() => {
    updateConversationParticipant({
      chatId,
      participantId,
      isMuted: !isMuted,
    }).then((updatedChatParticipant) => {
      setCurrentConversationParticipant(updatedChatParticipant);
    });
  }, [isMuted]);

  return (
    <>
      <Menu
        zIndex={10}
        button={() => <Icon name={icons.cilOptions} size={24} />}
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

      <Modal
        isOpen={isConversationMembersModalOpen}
        onClose={() => setIsConversationMembersModalOpen(false)}
      >
        <ConversationMembers
          conversation={chat}
          chatParticipantId={participantId}
        />
      </Modal>
    </>
  );
};
