import { useCallback, useEffect, useState } from "react";
import {
  CenteredVertialLayout,
  FormGroup,
  StackLayout,
  Form,
  ExtendedReactFunctionalComponent,
  FormControlInput,
  SubmitButton,
  Show,
  HorizontalDivider,
  FormControlTextarea,
  GridLayout,
  useCopyToClickboard,
} from "@circle-vibe/components";
import {
  ChatParticipant,
  composeAvatarFallback,
  getUserFullName,
  Chat,
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
} from "@api/conversations";
import { useNotification } from "@core/hooks";

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
  const copyToClickboard = useCopyToClickboard();
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
    });
  }, []);
  const isChatHasFreeSlots = chatParticipants.length < conversation.usersLimit;
  const onInviteUser = useCallback(
    async (formValue: ManageConversationParticipantsFormValue) => {
      const user = await getUserToInvite(
        conversation.id,
        chatParticipantId,
        formValue.username,
        formValue.personalToken
      );

      if (!user) {
        notification({
          type: "error",
          content: "User not found",
        });

        return;
      }

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
    <StackLayout space="3rem">
      <StackLayout>
        <div className="text-xl">Members:</div>

        <GridLayout space="1rem" minWidth={"100%"}>
          {chatParticipants.map(({ id, user, ...chatParticipant }) => (
            <CenteredVertialLayout key={id} space="1rem">
              <UserAvatar
                url={user.avatarUrl}
                className="cursor-pointer"
                fallback={composeAvatarFallback(user)}
              />

              {getUserFullName(user)}

              <span>{chatParticipant.chatRole}</span>
              <span>
                Notifications:{" "}
                {chatParticipant.isMuted ? "Enabled" : "Disabled"}
              </span>
            </CenteredVertialLayout>
          ))}
        </GridLayout>

        <section>
          <div>
            Chat members limit: {chatParticipants?.length ?? 0}/
            {conversation.usersLimit}
          </div>
        </section>
      </StackLayout>

      <Show.When isTrue={!chatParticipants?.length}>
        <div className="text-sm">There are no chat members.</div>
      </Show.When>

      <Show.When isTrue={isChatHasFreeSlots}>
        <StackLayout>
          <div className="text-xl">Generate Token to Invite</div>

          <Form
            validationSchema={
              MANAGE_CONVERSATION_PARTICIPANTS_VALIDATION_SCHEMA
            }
            initialValues={MANAGE_CONVERSATION_PARTICIPANTS_INITIAL_FORM_VALUE}
            onSubmit={onInviteUser}
          >
            <StackLayout space="1rem">
              <FormGroup label="Find User By Username" formFieldName="username">
                <FormControlInput
                  disabled={isChatParticipantsToInviteLoading}
                />
              </FormGroup>

              <HorizontalDivider />

              <div className="text-sm">
                This is unsave action. Try to find user by username instead of
                sharing in network personal user token.
              </div>

              <FormGroup label="Personal Token" formFieldName="personalToken">
                <FormControlTextarea
                  className="resize-vertical min-h-10 p-3"
                  disabled={isChatParticipantsToInviteLoading}
                />
              </FormGroup>
            </StackLayout>

            <SubmitButton>Find</SubmitButton>
          </Form>

          <Show.When isTrue={Boolean(chatInvitation)}>
            <div className="text-lg">Generated Token:</div>
            <StackLayout>
              <div>Invitations:</div>
              <div className="truncate" onClick={handleCopyOfInvite}>
                {chatInvitation}
              </div>
            </StackLayout>
          </Show.When>
        </StackLayout>
      </Show.When>
    </StackLayout>
  );
};
