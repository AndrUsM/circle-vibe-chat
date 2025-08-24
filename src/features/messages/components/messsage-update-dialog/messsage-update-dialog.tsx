import { useCallback } from 'react';

import {
  Form,
  FormGroup,
  FormSubmitButton,
  HorizontalDivider,
  StackLayout,
} from '@circle-vibe/components';

import MDEditor from '@uiw/react-md-editor';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';

import {
  MESSAGE_UPDATE_FORM_INITIAL_VALUE,
  MESSAGE_UPDATE_FORM_VALIDATION_SCHEMA,
} from '@features/messages/constants';
import { MessageFormValues, MessageUpdateFormValues } from '@features/messages/types';

import { useUpdateMessage } from '@api/messages';

import { TextMessagePreview } from '../text-message-preview';

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
    <Form
      enableReinitialize={true}
      onSubmit={onSubmit}
      initialValues={initialValues ?? MESSAGE_UPDATE_FORM_INITIAL_VALUE}
      validationSchema={MESSAGE_UPDATE_FORM_VALIDATION_SCHEMA}
    >
      {({ values, setFieldValue }: FormikProps<MessageFormValues>) => (
        <StackLayout data-color-mode='light'>
          <FormGroup formFieldName='content' className='min-h-60'>
            <StackLayout>
              <MDEditor
                preview='edit'
                highlightEnable={false}
                fullscreen={false}
                height={200}
                minHeight={200}
                hideToolbar={true}
                enableScroll={false}
                textareaProps={{
                  placeholder: t('conversations.send.input.placeholder'),
                }}
                value={values.content}
                onChange={(message) => {
                  setFieldValue('content', message);
                }}
              />

              <HorizontalDivider height='2px' />

              <TextMessagePreview className='overflow-y-container'>
                {values.content}
              </TextMessagePreview>
            </StackLayout>
          </FormGroup>

          <FormSubmitButton color='primary' size='large'>
            {t('conversations.send.button')}
          </FormSubmitButton>
        </StackLayout>
      )}
    </Form>
  );
};
