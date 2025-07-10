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
} from "@circle-vibe/components";
import { Modal } from "@shared/components";
import { ConversationMembers } from "@features/conversation/components/conversation-members/conversation-members";

// import { cookiesService, localStorageService } from "@core/services";
// import { useNavigate } from "react-router-dom";

interface ChatActionsProps {
  chat: Chat;
  chatParticipant: ChatParticipant;
}

export const ChatActions: ExtendedReactFunctionalComponent<
  ChatActionsProps
> = ({ chat, chatParticipant }) => {
  const icons = useIcons();
  const {} = chat;
  const { isMuted, id } = chatParticipant;
  // const navigate = useNavigate();

  const [isConversationMembersModalOpen, setIsConversationMembersModalOpen] =
    useState(false);

  const openConversationSettings = useCallback(() => {}, []);
  const showConversationMembers = useCallback(() => {
    setIsConversationMembersModalOpen(true);
  }, []);
  const deleteConversation = useCallback(() => {}, []);
  const leaveConversation = useCallback(() => {}, []);
  const muteConversationAlerts = useCallback(() => {}, []);

  return (
    <>
      <Menu
        backgroundColorOfContent="red"
        zIndex={10}
        button={() => <Icon name={icons.cilOptions} size={24} />}
      >
        <StackLayout>
          <div className="text-lg font-medium">Chat Actions</div>

          <Button onClick={openConversationSettings}>Settings</Button>
          <Button onClick={showConversationMembers}>Members</Button>

          <HorizontalDivider />

          <Button color="danger" onClick={leaveConversation}>
            Leave
          </Button>
          <Button color="danger" onClick={deleteConversation}>
            Delete
          </Button>
          <Button color="secondary" onClick={muteConversationAlerts}>
            {isMuted ? "Unmute" : "Mute"}
          </Button>
        </StackLayout>
      </Menu>

      <Modal
        isOpen={isConversationMembersModalOpen}
        onClose={() => setIsConversationMembersModalOpen(false)}
      >
        <ConversationMembers conversation={chat} chatParticipantId={id} />
      </Modal>
    </>
  );
};
