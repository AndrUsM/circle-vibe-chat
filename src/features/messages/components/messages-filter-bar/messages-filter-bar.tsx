import { useEffect, useMemo, useState } from "react";

import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import {
  Button,
  CenteredVertialLayout,
  Checkbox,
  ClusterLayout,
  Form,
  FormControlTextarea,
  FormGroup,
  Icon,
  Show,
  StackLayout,
  useIcons,
} from "@circle-vibe/components";
import { ChatParticipant, getUserFullName } from "@circle-vibe/shared";

import { useGetChatParticipants } from "@api/conversations";

import {
  MESSAGES_FILTER_BAR_FORM_INITIAL_VALUES,
  MESSAGES_FILTER_BAR_FORM_SCHEMA,
} from "./constants";
import { MessagesFilterBarFormValues } from "./types";
import { useToggleParticipantsFilter } from "./hooks";
import { useActiveConversation } from "@features/conversation";
import classNames from "classnames";

interface MessagesFilterBarProps {
  conversationId: number;
  onSubmit: (value: MessagesFilterBarFormValues) => void;
}

export const MessagesFilterBar: React.FC<MessagesFilterBarProps> = ({
  conversationId,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { cilX } = useIcons();
  const { currentConversationParticipant } = useActiveConversation();
  const getChatParticipants = useGetChatParticipants();
  const [chatParticipants, setChatParticipants] = useState<ChatParticipant[]>(
    []
  );
  const toggleParticipantFilter = useToggleParticipantsFilter(chatParticipants);

  useEffect(() => {
    getChatParticipants(conversationId).then(setChatParticipants);
  }, []);

  return (
    <Form
      initialValues={MESSAGES_FILTER_BAR_FORM_INITIAL_VALUES}
      validationSchema={MESSAGES_FILTER_BAR_FORM_SCHEMA}
      onSubmit={onSubmit}
    >
      {({
        values,
        setFieldValue,
        handleReset,
      }: FormikProps<MessagesFilterBarFormValues>) => (
        <StackLayout space="0.25rem">
          <FormGroup label="Message Text" formFieldName="content">
            <FormControlTextarea
              className="resize-vertical p-3 min-h-10"
              placeholder={t("input.search.placeholder")}
            />
          </FormGroup>

          <ClusterLayout>
            <FormGroup label="Participants:" formFieldName="senderIds">
              <StackLayout space="0.25rem">
                {chatParticipants.map((participant) => (
                  <CenteredVertialLayout
                    key={participant.id}
                    value={participant.id}
                  >
                    <Checkbox
                      selected={values.senderIds?.includes(participant.id)}
                      onClick={() =>
                        toggleParticipantFilter(
                          values,
                          participant,
                          setFieldValue
                        )
                      }
                    >
                      <span
                        className={classNames({
                          "font-semibold":
                            currentConversationParticipant?.id ===
                            participant.id,
                        })}
                      >
                        {getUserFullName(participant.user)}
                      </span>
                    </Checkbox>
                  </CenteredVertialLayout>
                ))}
              </StackLayout>
            </FormGroup>
          </ClusterLayout>

          <CenteredVertialLayout space="0.5rem">
            <Button type="submit" size="medium">
              {t("button.actions.search")}
            </Button>

            <Show.When
              isTrue={Boolean(
                values.senderIds?.length || values.content?.length
              )}
            >
              <Button color="secondary" onClick={handleReset} size="medium">
                {t("button.actions.reset")}
              </Button>
            </Show.When>
          </CenteredVertialLayout>
        </StackLayout>
      )}
    </Form>
  );
};
