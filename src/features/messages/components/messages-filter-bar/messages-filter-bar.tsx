import { useEffect, useState } from "react";

import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import {
  Button,
  CenteredVertialLayout,
  Checkbox,
  ClusterLayout,
  Form,
  FormControlTextarea,
  FormGroup,
  noop,
  Show,
  StackLayout,
} from "@circle-vibe/components";
import { ChatParticipant, getUserFullName } from "@circle-vibe/shared";

import { useGetChatParticipants } from "@api/conversations";
import { useFilters } from "@shared/components";

import {
  MESSAGES_FILTER_BAR_FORM_INITIAL_VALUES,
  MESSAGES_FILTER_BAR_FORM_SCHEMA,
} from "./constants";
import { MessagesFilterBarFormValues } from "./types";
import { useToggleParticipantsFilter } from "./hooks";
import { useActiveConversation } from "@features/conversation";

interface MessagesFilterBarProps {
  conversationId: number;
  initialValues?: MessagesFilterBarFormValues;
  onClose?: VoidFunction;
  onSubmit: (value: MessagesFilterBarFormValues) => void;
}

export const MessagesFilterBar: React.FC<MessagesFilterBarProps> = ({
  conversationId,
  initialValues,
  onClose = noop,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { setFilters, isActive } = useFilters();
  const { currentConversationParticipant } = useActiveConversation();
  const getChatParticipants = useGetChatParticipants();
  const [chatParticipants, setChatParticipants] = useState<ChatParticipant[]>(
    []
  );
  const toggleParticipantFilter = useToggleParticipantsFilter(chatParticipants);

  useEffect(() => {
    getChatParticipants(conversationId).then(setChatParticipants);
  }, []);

  const onHandleSubmit = (values: MessagesFilterBarFormValues) => {
    setFilters(values);
    onSubmit(values);
  };

  const onReset = () => {
    setFilters(MESSAGES_FILTER_BAR_FORM_INITIAL_VALUES);
    onSubmit(MESSAGES_FILTER_BAR_FORM_INITIAL_VALUES);
  };

  return (
    <Form
      initialValues={{
        ...MESSAGES_FILTER_BAR_FORM_INITIAL_VALUES,
        ...initialValues,
      }}
      validationSchema={MESSAGES_FILTER_BAR_FORM_SCHEMA}
      onSubmit={onHandleSubmit}
    >
      {({
        values,
        setFieldValue,
        setValues,
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
              isTrue={isActive}
            >
              <Button
                color="secondary"
                onClick={() => {
                  onReset();
                  setValues(MESSAGES_FILTER_BAR_FORM_INITIAL_VALUES);
                }}
                size="medium"
              >
                {t("button.actions.reset")}
              </Button>
            </Show.When>

            <Button color="secondary" onClick={onClose} size="medium">
              {t("button.actions.close")}
            </Button>
          </CenteredVertialLayout>
        </StackLayout>
      )}
    </Form>
  );
};
