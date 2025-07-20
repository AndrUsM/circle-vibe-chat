import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Form,
  FormControlTextarea,
  FormGroup,
  FormSubmitButton,
  StackLayout,
} from "@circle-vibe/components";

import {
  MESSAGE_UPDATE_FORM_INITIAL_VALUE,
  MESSAGE_UPDATE_FORM_VALIDATION_SCHEMA,
} from "@features/messages/constants";
import { MessageUpdateFormValues } from "@features/messages/types";
import { useUpdateMessage } from "@api/messages";

interface MessageUpdateDialogProps {
  chatId: number;
  messageId: number;
  initialValues: MessageUpdateFormValues;
  onSuccess: VoidFunction;
}

export const MessageUpdateDialog: React.FC<MessageUpdateDialogProps> = ({
  chatId,
  messageId,
  initialValues,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const updateMessage = useUpdateMessage();

  const onSubmit = useCallback(async (values: MessageUpdateFormValues) => {
    const response = await updateMessage(chatId, messageId, values);

    if (response) {
      onSuccess();
    }
  }, []);

  return (
    <StackLayout>
      <div>Update Message</div>

      <Form
        enableReinitialize={true}
        onSubmit={onSubmit}
        initialValues={initialValues ?? MESSAGE_UPDATE_FORM_INITIAL_VALUE}
        validationSchema={MESSAGE_UPDATE_FORM_VALIDATION_SCHEMA}
      >
        <StackLayout>
          <FormGroup formFieldName="content">
            <FormControlTextarea
              className="resize-vertical min-h-60 p-3"
              placeholder={t("conversations.send.input.placeholder")}
            />
          </FormGroup>

          <FormSubmitButton color="primary" size="large">
            {t("conversations.send.button")}
          </FormSubmitButton>
        </StackLayout>
      </Form>
    </StackLayout>
  );
};
