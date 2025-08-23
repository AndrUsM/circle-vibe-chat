import { useCallback, useEffect, useState } from "react";
import {
  FormGroup,
  StackLayout,
  Form,
  ExtendedReactFunctionalComponent,
  FormControlInput,
  SubmitButton,
  Show,
  HorizontalDivider,
  FormControlTextarea,
  useCopyToClickboard,
} from "@circle-vibe/components";
import {
  ChatParticipant,
  composeAvatarFallback,
  getUserFullName,
  Chat,
} from "@circle-vibe/shared";
import { Table, UserAvatar } from "@shared/components";
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
  const copyToClipboard = useCopyToClickboard();
  const [chatInvitation, setChatInvitation] = useState<string | null>(null);
  const getChatParticipants = useGetChatParticipants();
  const { getUserToInvite, loading: isChatParticipantsToInviteLoading } =
    useGetUserToInvite();
  const generateConversationInvite = useGenerateConversationInvite();
  const handleCopyOfInvite = useCallback(async () => {
    await copyToClipboard(chatInvitation ?? "");

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

        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>User</Table.Cell>
              <Table.Cell>Role</Table.Cell>
              <Table.Cell>Notifications</Table.Cell>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {chatParticipants.map(({ id, user, ...chatParticipant }) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <UserAvatar
                    url={user.avatarUrl}
                    className="cursor-pointer"
                    fallback={composeAvatarFallback(user)}
                  />
                </Table.Cell>
                <Table.Cell>{getUserFullName(user)}</Table.Cell>

                <Table.Cell>{chatParticipant.chatRole}</Table.Cell>

                <Table.Cell>
                  {chatParticipant.isMuted ? "Enabled" : "Disabled"}
                </Table.Cell>
              </Table.Row>
            ))}

            <Show.When isTrue={!chatParticipants?.length}>
              <Table.EmptyCell colSpan={3}>
                There are no chat members.
              </Table.EmptyCell>
            </Show.When>
          </Table.Body>
        </Table>

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
