import React, { RefObject, useCallback, useRef, useState } from 'react';

import { MessageFileEntityType, MessageType } from '@circle-vibe/shared';

import {
  Button,
  ClusterLayout,
  ExtendedReactFunctionalComponent,
  Form,
  FormikFormControl,
  FormSubmitButton,
  Icon,
  LoadingOverlay,
  Show,
  StackLayout,
  Tooltip,
  useBoolean,
  useIcons,
} from '@circle-vibe/components';

import MDEditor, { RefMDEditor } from '@uiw/react-md-editor';
import { FormikHelpers, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';

import {
  getMessageType,
  MESSAGE_FORM_INITIAL_VALUE,
  MESSAGE_FORM_VALIDATION_SCHEMA,
  MessageFormValues,
  useFileEntityType,
  useHandleFileUpload,
} from '@/features/messages';

import { UploadedFilePreview } from './uploaded-file-preview';
import { UploadFileMenuModal } from './upload-file-menu-modal';

import './message-form.scss';

interface MessageFormProps {
  initialValues?: Partial<MessageFormValues>;
  onStartTyping: VoidFunction;
  onStopTyping: VoidFunction;
  onCreateMessage: (values: MessageFormValues, options: FormikHelpers<MessageFormValues>) => void;
}

export const MessageForm: ExtendedReactFunctionalComponent<MessageFormProps> = ({
  initialValues = MESSAGE_FORM_INITIAL_VALUE,
  onCreateMessage,
  onStartTyping,
  onStopTyping,
  children,
}) => {
  const { cilFile, cilSend } = useIcons();
  const { t } = useTranslation();
  const [submittedFileType, setSubmittedFileType] = useState<MessageType>(MessageType.FILE);
  const textareaRef = useRef<RefObject<RefMDEditor>>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileMimeType = useFileEntityType(fileInputRef);
  const [
    isMessageTypeDialogOpen,
    _triggerMessageTypeDialogVisibility,
    setMessageTypeDialogVisibility,
  ] = useBoolean(false);
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
      if (isMessageTypeDialogOpen || values.content) {
        onSendMessage(values, options);

        return;
      }

      if (values?.file) {
        setMessageTypeDialogVisibility(true);
      }
    },
    [isMessageTypeDialogOpen],
  );

  const onSendMessage = useCallback(
    (values: MessageFormValues, options: FormikHelpers<MessageFormValues>) => {
      setFileLoadingForPreview(false);
      setFileSource(undefined);

      onCreateMessage(values, options);
    },
    [],
  );

  return (
    <>
      <Form
        onSubmit={onSubmit}
        enableReinitialize={true}
        initialValues={{
          ...initialValues,
          ...MESSAGE_FORM_INITIAL_VALUE,
        }}
        validationSchema={MESSAGE_FORM_VALIDATION_SCHEMA}
      >
        {({ values, setFieldValue, submitForm }: FormikProps<MessageFormValues>) => (
          <StackLayout space='1rem'>
            <UploadFileMenuModal
              isOpen={isMessageTypeDialogOpen}
              initialType={submittedFileType}
              onClose={() => setMessageTypeDialogVisibility(false)}
              onSuccess={async (type) => {
                await setFieldValue('uploadAs', type);
                await submitForm();
              }}
            />

            <Show.When isTrue={fileLoadingForPreview}>
              <StackLayout space='0.25rem' className='w-fit relative'>
                <Button
                  color='primary'
                  size='small'
                  onClick={() => {
                    abortReadFile();
                    setFileLoadingForPreview(false);

                    if (fileInputRef.current) {
                      setFieldValue('file', null);
                    }

                    setFieldValue('uploadAs', fileInputRef.current ? getMessageType(values) : null);
                  }}
                >
                  {t('button.actions.cancel')}
                </Button>

                <div className='relative overflow-hidden file-empty-block bg-light rounded-2'>
                  <LoadingOverlay />
                </div>

                <span className='text-xs italic bg-tertiary rounded-2 p-2 text-center'>
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
                  setFieldValue('file', undefined);
                  setFieldValue('uploadAs', null);
                }}
              />
            </Show.When>

            <StackLayout space='0.5rem' alignItems='flex-end' data-color-mode='light'>
              <FormikFormControl formFieldName='content' className='w-full'>
                <MDEditor
                  ref={textareaRef}
                  preview='edit'
                  highlightEnable={false}
                  fullscreen={false}
                  hideToolbar={true}
                  enableScroll={false}
                  height={50}
                  minHeight={50}
                  maxHeight={500}
                  textareaProps={{
                    placeholder: t('conversations.send.input.placeholder'),
                    onKeyDown: values.content.length ? onStartTyping : onStopTyping,
                    onMouseLeave: onStopTyping,
                  }}
                  value={values.content}
                  onChange={(message) => {
                    setFieldValue('content', message);
                  }}
                />
              </FormikFormControl>

              <ClusterLayout justifyContent='flex-end' space='0.5rem' alignItems='flex-end'>
                {children}

                <Button
                  disabled={Boolean(values.file?.name)}
                  type='button'
                  onClick={openFileSelectionDialog}
                >
                  <Tooltip
                    title={t('conversations.buttons.upload-files.tooltip')}
                    className='flex '
                  >
                    <Icon size={16} color='var(--cv-light)' name={cilFile} />
                  </Tooltip>

                  <input
                    type='file'
                    ref={fileInputRef}
                    hidden
                    onChange={(event) => {
                      setFileLoadingForPreview(true);
                      handleFileChange(event, setFieldValue);

                      const fileType = getMessageType({ file: event.currentTarget.files?.item(0) as File });

                      setFieldValue('uploadAs', null);
                      setSubmittedFileType(fileType);
                    }}
                  />
                </Button>

                <FormSubmitButton
                  className='text-center'
                  disabled={!values.file?.name && !values.content.length}
                  color='primary'
                >
                  <Tooltip title={t('conversations.send.button')} className='flex '>
                    <Icon color='var(--cv-light)' size={16} name={cilSend} />
                  </Tooltip>
                </FormSubmitButton>
              </ClusterLayout>
            </StackLayout>
          </StackLayout>
        )}
      </Form>
    </>
  );
};
