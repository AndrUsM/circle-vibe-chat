import {
  ExtendedReactFunctionalComponent,
  Form,
  FormControlCheckbox,
  FormControlInput,
  FormControlSelect,
  FormControlTextarea,
  FormGroup,
  FormikFormControl,
  SubmitButton,
} from "@circle-vibe/components";
import { ChatType } from "@circle-vibe/shared";
import { useHandleChatCreation } from "@features/conversation/hooks";
import {
  CREATE_CONVERSATION_FORM_INITIAL_VALUES,
  CREATE_CONVERSATION_FORM_VALIDATION_SCHEMA,
} from "./constants";

export const ConversationForm: ExtendedReactFunctionalComponent = () => {
  const createConversation = useHandleChatCreation();

  return (
    <Form
      validationSchema={CREATE_CONVERSATION_FORM_VALIDATION_SCHEMA}
      initialValues={CREATE_CONVERSATION_FORM_INITIAL_VALUES}
      onSubmit={createConversation}
    >
      <FormGroup isRequired label="Name" formFieldName="name">
        <FormControlInput placeholder="My Chat" />
      </FormGroup>

      <FormGroup isRequired label="Description" formFieldName="description">
        <FormControlTextarea
          className="resize-vertical p-3 min-h-20"
          placeholder="My Chat"
        />
      </FormGroup>

      <FormGroup isRequired label="Type" formFieldName="type">
        <FormControlSelect>
          <option value={ChatType.PRIVATE}>Private</option>
          <option value={ChatType.PUBLIC}>Public</option>
        </FormControlSelect>
      </FormGroup>

      <FormGroup isRequired label="Members Limit" formFieldName="usersLimit">
        <FormControlInput min={0} step={1} type="number" />
      </FormGroup>

      <FormGroup formFieldName="hidden">
        <FormControlCheckbox>Hidden</FormControlCheckbox>
      </FormGroup>

      <SubmitButton>Create</SubmitButton>
    </Form>
  );
};
