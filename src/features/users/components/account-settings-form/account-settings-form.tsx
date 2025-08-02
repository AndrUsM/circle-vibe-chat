import { Section } from "@shared/components";

import {
  Button,
  Form,
  FormControlCheckbox,
  FormControlError,
  FormControlInput,
  FormControlSelect,
  FormGroup,
  FormikFormControl,
  FormSubmitButton,
  Icon,
  StackLayout,
  useCopyToClickboard,
  useIcons,
  Textarea,
} from "@circle-vibe/components";
import { UserType } from "@circle-vibe/shared";

import { useUpdateUserSettings } from "@api/user";
import { useCurrentUser } from "@core/hooks";

import { composeAccountSettingsFormValues } from "./utils";
import { ACCOUNT_SETTINGS_FORM_VALIDATION_SCHEMA } from "./constants";
import { useCallback } from "react";
import { AccountSettingsFormValues } from "./types";

export const AccountSettingsForm: React.FC = () => {
  const { user } = useCurrentUser();
  const { cilCopy } = useIcons();
  const updateUserSettings = useUpdateUserSettings();
  const onSubmit = useCallback((values: AccountSettingsFormValues) => {
    return updateUserSettings(user.id, values);
  }, [user?.id]);
  const copyToClickboard = useCopyToClickboard();
  const initialValues = composeAccountSettingsFormValues(user);

  return (
    <Form
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={ACCOUNT_SETTINGS_FORM_VALIDATION_SCHEMA}
      onSubmit={onSubmit}
    >
      <StackLayout space="2rem" className="pt-6">
        <Section>
          <Section.Header>General Account Setting</Section.Header>

          <Section.Content>
            <FormGroup label="Firstname" formFieldName="firstname">
              <FormControlInput />
            </FormGroup>

            <FormGroup label="Surname" formFieldName="surname">
              <FormControlInput />
            </FormGroup>

            <FormGroup label="Nickname" formFieldName="username">
              <FormControlInput />
            </FormGroup>

            <FormGroup label="Birth Date" formFieldName="birthDate">
              <FormControlInput type="date" />
            </FormGroup>
          </Section.Content>
        </Section>

        <Section>
          <Section.Header>Contact Information</Section.Header>

          <Section.Content>
            <FormGroup label="Email" formFieldName="email">
              <FormControlInput type="email" />
            </FormGroup>

            <FormGroup label="Phone" formFieldName="primaryPhone">
              <FormControlInput type="phone" />
            </FormGroup>
          </Section.Content>
        </Section>

        <Section>
          <Section.Header>Security</Section.Header>

          <Section.Content>
            <StackLayout space="1rem">
              <StackLayout space="0.5rem">
                <FormGroup label="Password" formFieldName="password">
                  <FormControlInput type="password" />
                </FormGroup>

                <FormikFormControl label="Account Type" formFieldName="type">
                  <FormControlSelect>
                    <option value={UserType.PRIVATE}>Private</option>
                    <option value={UserType.PUBLIC}>Public</option>
                  </FormControlSelect>

                  <FormControlError />
                </FormikFormControl>
              </StackLayout>

              <StackLayout space="0">
                <FormikFormControl formFieldName="isAllowedToSearch">
                  <FormControlCheckbox>Show in search</FormControlCheckbox>
                </FormikFormControl>

                <FormikFormControl formFieldName="isHiddenContactInfo">
                  <FormControlCheckbox>Hide contact info</FormControlCheckbox>
                </FormikFormControl>
              </StackLayout>
            </StackLayout>
          </Section.Content>
        </Section>

        <Section>
          <Section.Header>Location Information</Section.Header>

          <Section.Content>
            <FormGroup label="Country" formFieldName="country">
              <FormControlInput />
            </FormGroup>

            <FormGroup label="City" formFieldName="city">
              <FormControlInput />
            </FormGroup>
          </Section.Content>
        </Section>

        <Section>
          <Section.Header>Personal Key</Section.Header>

          <Section.Content>
            <StackLayout>
              <Button
                size="small"
                color="secondary"
                onClick={() => copyToClickboard(user.privateToken)}
              >
                <Icon color="var(--cv-light)" name={cilCopy} size={14} />
              </Button>

              <Textarea value={user.privateToken} readOnly />
            </StackLayout>
          </Section.Content>
        </Section>

        <FormSubmitButton>Save</FormSubmitButton>
      </StackLayout>
    </Form>
  );
};
