import {
  ExtendedReactFunctionalComponent,
  Menu,
  useIcons,
  Icon,
  Button,
  StackLayout,
  HorizontalDivider,
  Chat,
  ChatParticipant,
} from "@circle-vibe/shared";
// import { cookiesService, localStorageService } from "@core/services";
import { useCallback } from "react";
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
  const { isMuted } = chatParticipant;
  // const navigate = useNavigate();

  const openConversationSettings = useCallback(() => {}, []);
  const showConversationMembers = useCallback(() => {}, []);
  const deleteConversation = useCallback(() => {}, []);
  const leaveConversation = useCallback(() => {}, []);
  const muteConversationAlerts = useCallback(() => {}, []);

  return (
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
          {isMuted ? 'Unmute' : 'Mute'}
        </Button>
      </StackLayout>
    </Menu>
  );
};
