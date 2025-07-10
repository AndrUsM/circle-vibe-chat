import { useCallback, useEffect, useState } from "react";
import {
  CenteredVertialLayout,
  FormGroup,
  FormikFormControl,
  StackLayout,
  Form,
  FormControlSelect,
  ExtendedReactFunctionalComponent,
  FormControlInput,
  SubmitButton,
  Show,
} from "@circle-vibe/components";
import {
  ChatParticipant,
  composeAvatarFallback,
  getUserFullName,
  Chat,
  User,
} from "@circle-vibe/shared";
import { UserAvatar } from "@shared/components";
import {
  MANAGE_CONVERSATION_PARTICIPANTS_INITIAL_FORM_VALUE,
  MANAGE_CONVERSATION_PARTICIPANTS_VALIDATION_SCHEMA,
} from "./constants";
import { ManageConversationParticipantsFormValue } from "./types";
import {
  useGetUserToInvite,
  useGenerateConversationInvite,
  useGetChatParticipants,
} from "@features/conversation/hooks";
import { useCopyToClickboard, useNotification } from "@core/hooks";

interface ConversationMembersProps {
  conversation: Chat;
  chatParticipantId: number;
}

export const ConversationMembers: ExtendedReactFunctionalComponent<
  ConversationMembersProps
> = ({ conversation, chatParticipantId }) => {
  const [chatParticipants, setChatParticipants] = useState<ChatParticipant[]>(
    []
  );
  const notification = useNotification();
  const copyToClickboard = useCopyToClickboard()
  const [chatInvitation, setChatInvitation] = useState<string | null>(null);
  const getChatParticipants = useGetChatParticipants();
  const { getUserToInvite, loading: isChatParticipantsToInviteLoading } =
    useGetUserToInvite();
  const generateConversationInvite = useGenerateConversationInvite();
  const handleCopyOfInvite = useCallback(() => {
    copyToClickboard(chatInvitation ?? "");
    notification({
        type: "success",
        content: "Invite link successfully copied!",
      })
  }, []);
  const onInviteUser = useCallback(
    async (formValue: ManageConversationParticipantsFormValue) => {
      const user = await getUserToInvite(
        conversation.id,
        chatParticipantId,
        formValue.username
      );

      const generatedInvite = await generateConversationInvite({
        conversationId: conversation.id,
        targetUserId: user.id,
        fromChatParticipantId: chatParticipantId,
      });

      setChatInvitation(generatedInvite);
      handleCopyOfInvite();
    },
    []
  );


  useEffect(() => {
    getChatParticipants(conversation.id).then(setChatParticipants);
  }, []);

  return (
    <StackLayout>
      <div className="grid">
        {chatParticipants.map(({ id, user, ...chatParticipant }) => (
          <CenteredVertialLayout key={id} space="1rem">
            <UserAvatar
              url={user.avatarUrl}
              fallback={composeAvatarFallback(user)}
            />

            {getUserFullName(user)}

            <span>{chatParticipant.chatRole}</span>
            <span>
              Notifications: {chatParticipant.isMuted ? "Enabled" : "Disabled"}
            </span>
          </CenteredVertialLayout>
        ))}
      </div>

      <Show.When isTrue={Boolean(chatInvitation)}>
        <StackLayout>
          <div>Invitations:</div>
          <div className="truncate" onClick={handleCopyOfInvite}>
            {chatInvitation}
          </div>
        </StackLayout>
      </Show.When>

      <Form
        validationSchema={MANAGE_CONVERSATION_PARTICIPANTS_VALIDATION_SCHEMA}
        initialValues={MANAGE_CONVERSATION_PARTICIPANTS_INITIAL_FORM_VALUE}
        onSubmit={onInviteUser}
      >
        <FormGroup label="Add user" formFieldName="username">
          <FormControlInput disabled={isChatParticipantsToInviteLoading} />
        </FormGroup>

        <SubmitButton>Find</SubmitButton>
      </Form>
    </StackLayout>
  );
};
