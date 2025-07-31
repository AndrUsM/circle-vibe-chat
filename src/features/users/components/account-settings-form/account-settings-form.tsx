import { SectionHeader, SectionContent } from "@shared/components";

import {
  Button,
  ClusterLayout,
  Form,
  FormControlCheckbox,
  FormControlError,
  FormControlInput,
  FormControlSelect,
  FormGroup,
  FormikFormControl,
  FormSubmitButton,
  HorizontalDivider,
  Icon,
  StackLayout,
  SubmitButton,
  useCopyToClickboard,
  useIcons,
} from "@circle-vibe/components";
import { UserType } from "@circle-vibe/shared";

import { useUpdateUserSettings } from "@api/user";
import { useCurrentUser } from "@core/hooks";

import { composeAccountSettingsFormValues } from "./utils";
import { ACCOUNT_SETTINGS_FORM_VALIDATION_SCHEMA } from "./constants";

export const AccountSettingsForm: React.FC = () => {
  const { user } = useCurrentUser();
  const { cilCopy } = useIcons();
  const onSubmit = useUpdateUserSettings();
  const copyToClickboard = useCopyToClickboard();
  const initialValues = composeAccountSettingsFormValues(user);

  return (
    <Form
      initialValues={initialValues}
      validationSchema={ACCOUNT_SETTINGS_FORM_VALIDATION_SCHEMA}
      onSubmit={onSubmit}
    >
      <StackLayout space="2rem" className="pt-6">
        <StackLayout>
          <SectionHeader>General Account Setting</SectionHeader>

          <SectionContent>
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
              <FormControlInput />
            </FormGroup>
          </SectionContent>
        </StackLayout>

        <StackLayout>
          <SectionHeader>Contact Information</SectionHeader>

          <SectionContent>
            <FormGroup label="Email" formFieldName="email">
              <FormControlInput type="email" />
            </FormGroup>

            <FormGroup label="Phone" formFieldName="primaryPhone">
              <FormControlInput type="phone" />
            </FormGroup>
          </SectionContent>
        </StackLayout>

        <StackLayout>
          <SectionHeader>Security</SectionHeader>

          <SectionContent>
            <StackLayout space="1rem">
              <StackLayout space="0.5rem">
                <FormGroup label="Password" formFieldName="password">
                  <FormControlInput type="password" />
                </FormGroup>

                <FormGroup
                  label="Password Confirmation"
                  formFieldName="passwordConfirmation"
                >
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
          </SectionContent>
        </StackLayout>

        <StackLayout>
          <SectionHeader>Location Information</SectionHeader>

          <SectionContent>
            <FormGroup label="Country" formFieldName="country">
              <FormControlInput />
            </FormGroup>

            <FormGroup label="City" formFieldName="city">
              <FormControlInput />
            </FormGroup>
          </SectionContent>
        </StackLayout>

        <StackLayout>
          <SectionHeader>Personal Key</SectionHeader>

          <SectionContent>
            <StackLayout>
              <Button
                size="small"
                color="secondary"
                onClick={() => copyToClickboard(user.privateToken)}
              >
                <Icon color="var(--cv-light)" name={cilCopy} size={14} />
              </Button>

              <textarea value={user.privateToken} readOnly />
            </StackLayout>
          </SectionContent>
        </StackLayout>

        <FormSubmitButton>Save</FormSubmitButton>
      </StackLayout>
    </Form>
  );
};
