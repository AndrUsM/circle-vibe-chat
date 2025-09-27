import { ChatType } from '@circle-vibe/shared';

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

import {
  CREATE_CONVERSATION_FORM_INITIAL_VALUES,
  CREATE_CONVERSATION_FORM_VALIDATION_SCHEMA,
} from './constants';

interface ConversationFormProps {
  onClose?: VoidFunction;
}

export const ConversationForm: ExtendedReactFunctionalComponent<ConversationFormProps> = ({
  onClose = noop
}) => {
  const createConversation = useHandleChatCreation(onClose);

  return (
    <Form
      validationSchema={CREATE_CONVERSATION_FORM_VALIDATION_SCHEMA}
      initialValues={CREATE_CONVERSATION_FORM_INITIAL_VALUES}
      onSubmit={createConversation}
    >
      <StackLayout space='0.5rem'>
        <FormGroup isRequired label='Name' formFieldName='name'>
          <FormControlInput placeholder='Book Club Picks' />
        </FormGroup>

        <FormGroup isRequired label='Description' formFieldName='description'>
          <FormControlTextarea className='resize-vertical p-3 min-h-20' placeholder='Book Club Picks' />
        </FormGroup>

        <FormGroup isRequired label='Type' formFieldName='type'>
          <FormControlSelect>
            <option value={ChatType.PRIVATE}>Private</option>
            <option value={ChatType.PUBLIC}>Public</option>
          </FormControlSelect>
        </FormGroup>

        <FormGroup isRequired label='Members Limit' formFieldName='usersLimit'>
          <FormControlInput min={0} step={1} type='number' />
        </FormGroup>

        <SubmitButton>Create</SubmitButton>
      </StackLayout>
    </Form>
  );
};
