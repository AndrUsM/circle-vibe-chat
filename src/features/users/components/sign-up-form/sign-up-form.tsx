import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  CenteredVertialLayout,
  FormControlInput,
  FormGroup,
  Button,
  FormSubmitButton,
  Form,
  StackLayout,
  ClusterLayout,
  FormControlSelect,
  useCountries,
  FormControlCheckbox,
  FormControlError,
  HorizontalDivider,
} from "@circle-vibe/shared";

import { USER_TYPE_DROPDOWN_OPTIONS } from "@shared/constants";
import {
  SIGN_UP_FORM_VALIDATION_SCHEMA,
  SIGN_UP_FORM_INITIAL_VALUES,
} from "./constants";

export const SignUpForm: React.FC = () => {
  const { t } = useTranslation();
  const countryDropdownOptions = useCountries();
  const onSubmit = useCallback(async () => {
    // ToDo
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      validationSchema={SIGN_UP_FORM_VALIDATION_SCHEMA}
      initialValues={SIGN_UP_FORM_INITIAL_VALUES}
    >
      <StackLayout space="0.75rem">
        <FormGroup isRequired label={"Name"} formFieldName={"username"}>
          <FormControlInput />
        </FormGroup>

        <FormGroup isRequired label={"Surname"} formFieldName={"surname"}>
          <FormControlInput />
        </FormGroup>

        <FormGroup isRequired label={"Email"} formFieldName={"email"}>
          <FormControlInput type="email" />
        </FormGroup>

        <FormGroup isRequired label="Password" formFieldName="password">
          <FormControlInput type="password" />
        </FormGroup>

        <FormGroup
          isRequired
          label="Password Confirmation"
          formFieldName="passwordConfirmation"
        >
          <FormControlInput type="passwordConfirmation" />
        </FormGroup>

        <FormGroup label={"Primary Phone"} formFieldName={"primaryPhone"}>
          <FormControlInput type="tel" />
        </FormGroup>

        <FormGroup label={"Birth Date"} formFieldName={"birthDate"}>
          <FormControlInput type="date" />
        </FormGroup>

        <FormGroup label="Avatar" formFieldName="avatar">
          <FormControlInput type="file" accept="image/*" />
        </FormGroup>

        <FormGroup label="User Type" formFieldName="type">
          <FormControlSelect>
            {USER_TYPE_DROPDOWN_OPTIONS.map(({ key, label }) => (
              <option value={key}>{t(label)}</option>
            ))}
          </FormControlSelect>
        </FormGroup>

        <ClusterLayout>
          <FormGroup isRequired label="Country" formFieldName="country">
            <FormControlSelect>
              {countryDropdownOptions.map(({ code, label }) => (
                <option value={code}>{t(label)}</option>
              ))}
            </FormControlSelect>
          </FormGroup>

          <FormGroup label="City" formFieldName="city">
            <FormControlInput />
          </FormGroup>
        </ClusterLayout>

        <FormGroup formFieldName="isHiddenContactInfo">
          <FormControlCheckbox>Is Hidden</FormControlCheckbox>
        </FormGroup>


        <StackLayout space={"1rem"}>
          <FormSubmitButton>Sign-up</FormSubmitButton>

          <HorizontalDivider height="1px" />

          <CenteredVertialLayout space={"1rem"} justifyContent="center">
            <Button color="secondary">Sign-in</Button>

            <Button color="secondary">Restore Password</Button>
          </CenteredVertialLayout>
        </StackLayout>
      </StackLayout>
    </Form>
  );
};
