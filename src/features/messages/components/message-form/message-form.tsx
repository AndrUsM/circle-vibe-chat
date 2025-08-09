import { useCallback, useRef } from "react";
import { FormikHelpers, FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import MDEditor from "@uiw/react-md-editor";

import {
  Button,
  CenteredVertialLayout,
  ClusterLayout,
  ExtendedReactFunctionalComponent,
  Form,
  FormikFormControl,
  FormSubmitButton,
  GridLayout,
  Icon,
  LoadingOverlay,
  Show,
  StackLayout,
  Tooltip,
  useIcons,
} from "@circle-vibe/components";
import { MessageFileEntityType } from "@circle-vibe/shared";

import {
  MESSAGE_FORM_INITIAL_VALUE,
  MESSAGE_FORM_VALIDATION_SCHEMA,
  MessageFormValues,
  useFileEntityType,
  useHandleFileUpload,
} from "@features/messages";
import { UploadedFilePreview } from "./uploaded-file-preview";

import "./message-form.scss";

interface MessageFormProps {
  initialValues?: Partial<MessageFormValues>;
  onStartTyping: VoidFunction;
  onStopTyping: VoidFunction;
  onCreateMessage: (
    values: MessageFormValues,
    options: FormikHelpers<MessageFormValues>
  ) => void;
}

export const MessageForm: ExtendedReactFunctionalComponent<
  MessageFormProps
> = ({
  initialValues = MESSAGE_FORM_INITIAL_VALUE,
  onCreateMessage,
  onStartTyping,
  onStopTyping,
}) => {
  const { cilFile, cilSend } = useIcons();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileMimeType = useFileEntityType(fileInputRef);
  const {
    fileLoadingForPreview,
    fileSource,
    readFileProgress,
    totalReadedMb,
    totalFileSize,

    abortReadFile,
    handleFileChange,
    setFileSource,
    setFileLoadingForPreview,
  } = useHandleFileUpload();

  const openFileSelectionDialog = () => fileInputRef?.current?.click();
  const onSubmit = useCallback(
    (values: MessageFormValues, options: FormikHelpers<MessageFormValues>) => {
      setFileLoadingForPreview(false);
      setFileSource(undefined);

      onCreateMessage(values, options);
    },
    []
  );

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
      {({ values, setFieldValue }: FormikProps<MessageFormValues>) => (
        <StackLayout space="1rem">
          <Show.When isTrue={fileLoadingForPreview}>
            <StackLayout space="0.25rem" className="w-fit relative">
              <Button
                color="primary"
                size="small"
                onClick={() => {
                  abortReadFile();
                  setFileLoadingForPreview(false);
                  if (fileInputRef.current) {
                    setFieldValue("file", null);
                  }
                }}
              >
                {t("button.actions.cancel")}
              </Button>

              <div className="relative overflow-hidden file-empty-block bg-light rounded-2">
                <LoadingOverlay />
              </div>

              <span className="text-xs italic bg-tertiary rounded-2 p-2 text-center">
                {readFileProgress}%, {totalReadedMb}/{totalFileSize} MB
              </span>
            </StackLayout>
          </Show.When>

          <Show.When isTrue={Boolean(fileSource) && !fileLoadingForPreview}>
            <UploadedFilePreview
              fileSource={String(fileSource)}
              entityType={fileMimeType as MessageFileEntityType}
              fileName={String(fileInputRef.current?.files?.[0]?.name)}
              onClear={() => {
                setFileSource(undefined);
                setFieldValue("file", undefined);
              }}
            />
          </Show.When>

          <StackLayout
            space="0.5rem"
            alignItems="flex-start"
            data-color-mode="light"
          >
            <FormikFormControl formFieldName="content" className="w-full">
              <MDEditor
                preview="edit"
                highlightEnable={false}
                fullscreen={false}
                hideToolbar={true}
                enableScroll={false}
                height={200}
                minHeight={200}
                maxHeight={200}
                textareaProps={{
                  placeholder: t("conversations.send.input.placeholder"),
                  onKeyDown: values.content.length
                    ? onStartTyping
                    : onStopTyping,
                  onMouseLeave: onStopTyping,
                }}
                value={values.content}
                onChange={(message) => {
                  setFieldValue("content", message);
                }}
              />
            </FormikFormControl>

            <ClusterLayout justifyContent="flex-end" space="0.5rem">
              <Button
                disabled={Boolean(values.file?.name)}
                type="button"
                onClick={openFileSelectionDialog}
              >
                <Icon size={18} color="var(--cv-light)" name={cilFile} />

                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  onChange={(event) => {
                    setFileLoadingForPreview(true);
                    handleFileChange(event, setFieldValue);
                  }}
                />
              </Button>

              <FormSubmitButton
                className="text-center"
                disabled={!values.file?.name && !values.content.length}
                color="primary"
                size="large"
              >
                <Tooltip title={t("conversations.send.button")}>
                  <Icon color="var(--cv-light)" size={18} name={cilSend} />
                </Tooltip>
              </FormSubmitButton>
            </ClusterLayout>
          </StackLayout>
        </StackLayout>
      )}
    </Form>
  );
};
