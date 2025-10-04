import { useTranslation } from 'react-i18next';

import {
  ExtendedReactFunctionalComponent,
  Form,
  FormControlInput,
  FormControlSelect,
  FormControlTextarea,
  FormGroup,
  noop,
  StackLayout,
  SubmitButton,
} from '@circle-vibe/components';

import { useHandleChatCreation } from '@api/conversations';
import { CONVERSATION_TYPE_DROPDOWN_OPTIONS } from '@shared/constants';

import {
  CREATE_CONVERSATION_FORM_INITIAL_VALUES,
  CREATE_CONVERSATION_FORM_VALIDATION_SCHEMA,
} from './constants';

interface ConversationFormProps {
  onClose?: VoidFunction;
}

export const ConversationForm: ExtendedReactFunctionalComponent<ConversationFormProps> = ({
  onClose = noop,
}) => {
  const { t } = useTranslation();
  const createConversation = useHandleChatCreation(onClose);

  return (
    <Form
      validationSchema={CREATE_CONVERSATION_FORM_VALIDATION_SCHEMA}
      initialValues={CREATE_CONVERSATION_FORM_INITIAL_VALUES}
      onSubmit={createConversation}
    >
      <StackLayout space='0.5rem'>
        <FormGroup isRequired label={t('conversations.form.field.name.label')} formFieldName='name'>
          <FormControlInput placeholder={t('conversations.form.field.name.placeholder')} />
        </FormGroup>

        <FormGroup
          isRequired
          label={t('conversations.form.field.description.label')}
          formFieldName='description'
        >
          <FormControlTextarea
            className='resize-vertical p-3 min-h-20'
            placeholder={t('conversations.form.field.description.placeholder')}
          />
        </FormGroup>

        <FormGroup isRequired label={t('conversations.form.field.type.label')} formFieldName='type'>
          <FormControlSelect>
            {CONVERSATION_TYPE_DROPDOWN_OPTIONS.map(({ key, label }) => (
              <option key={`conversation-type-${key}`} value={key}>
                {t(label)}
              </option>
            ))}
          </FormControlSelect>
        </FormGroup>

        <FormGroup
          isRequired
          label={t('conversations.form.field.members-limit.label')}
          formFieldName='usersLimit'
        >
          <FormControlInput min={0} step={1} type='number' />
        </FormGroup>

        <SubmitButton>{t('button.actions.create')}</SubmitButton>
      </StackLayout>
    </Form>
  );
};
