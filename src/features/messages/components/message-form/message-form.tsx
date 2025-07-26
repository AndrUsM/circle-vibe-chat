import { useCallback, useRef } from "react";
import { FormikHelpers, FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import {
  Button,
  ClusterLayout,
  ExtendedReactFunctionalComponent,
  Form,
  FormControlTextarea,
  FormikFormControl,
  FormSubmitButton,
  Icon,
  useIcons,
} from "@circle-vibe/components";
import {
  MESSAGE_FORM_INITIAL_VALUE,
  MESSAGE_FORM_VALIDATION_SCHEMA,
  MessageFormValues,
} from "@features/messages";

interface MessageFormProps {
  initialValues?: Partial<MessageFormValues>;
  onSubmit: (
    values: MessageFormValues,
    options: FormikHelpers<MessageFormValues>
  ) => void;
}

export const MessageForm: ExtendedReactFunctionalComponent<
  MessageFormProps
> = ({ initialValues = MESSAGE_FORM_INITIAL_VALUE, onSubmit }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { cilFile } = useIcons();
  const openFileSelectionDialog = useCallback((e: React.SyntheticEvent) => {
    fileInputRef?.current?.click();
  }, []);

  return (
    <Form
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={MESSAGE_FORM_VALIDATION_SCHEMA}
      initialValues={{
        ...initialValues,
        ...MESSAGE_FORM_INITIAL_VALUE,
      }}
    >
      {({ setFieldValue }: FormikProps<MessageFormValues>) => (
        <ClusterLayout space="0.5rem" alignItems="flex-start">
          <FormikFormControl formFieldName="content" className="w-full">
            <FormControlTextarea
              className="resize-vertical min-h-10 p-3"
              placeholder={t("conversations.send.input.placeholder")}
            />
          </FormikFormControl>

          <Button type="button" onClick={openFileSelectionDialog}>
            <Icon size={18} color="var(--cv-light)" name={cilFile} />

            <input
              type="file"
              ref={fileInputRef}
              hidden
              onChange={(event) => {
                event.currentTarget.files &&
                  setFieldValue("file", event.currentTarget.files[0]);
              }}
            />
          </Button>

          <FormSubmitButton color="primary" size="large">
            {t("conversations.send.button")}
          </FormSubmitButton>
        </ClusterLayout>
      )}
    </Form>
  );
};
