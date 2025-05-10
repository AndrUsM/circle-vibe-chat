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
  Show,
} from "@circle-vibe/shared";

import {
  SIGN_UP_FORM_VALIDATION_SCHEMA,
  SIGN_UP_FORM_INITIAL_VALUES,
} from "./constants";
import { USER_TYPE_DROPDOWN_OPTIONS } from "@shared/constants";
import { PhonesField } from "./components/phones-field";

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
      <FormGroup isRequired label={"Name"} formFieldName={"username"}>
        <FormControlInput />
      </FormGroup>

      <FormGroup isRequired label={"Surname"} formFieldName={"surname"}>
        <FormControlInput />
      </FormGroup>

      <FormGroup isRequired label={"Email"} formFieldName={"email"}>
        <FormControlInput type="email" />
      </FormGroup>

      <FormGroup
        isRequired
        label={"Primary Phone"}
        formFieldName={"primaryPhone"}
      >
        <FormControlInput type="tel" />
      </FormGroup>

      <FormGroup isRequired label={"Birth Date"} formFieldName={"birthDate"}>
        <FormControlInput type="date" />
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

      <FormGroup isRequired label="Avatar" formFieldName="avatar">
        <FormControlInput type="file" accept="image/*" />
      </FormGroup>

      <PhonesField />

      <StackLayout space="1rem">
        <FormGroup
          isRequired
          label="Is Hidden"
          formFieldName="isHiddenContactInfo"
        >
          <FormControlInput type="checkbox" />
        </FormGroup>

        <FormGroup isRequired label="isSecret" formFieldName="secret">
          <FormControlInput type="checkbox" />
        </FormGroup>

        <FormGroup isRequired label="User Type" formFieldName="type">
          <FormControlSelect>
            {USER_TYPE_DROPDOWN_OPTIONS.map(({ key, label }) => (
              <option value={key}>{t(label)}</option>
            ))}
          </FormControlSelect>
        </FormGroup>
      </StackLayout>

      <ClusterLayout>
        <FormGroup isRequired label="Country" formFieldName="country">
          <FormControlSelect>
            {countryDropdownOptions.map(({ code, label }) => (
              <option value={code}>{t(label)}</option>
            ))}
          </FormControlSelect>
        </FormGroup>

        <FormGroup isRequired label="City" formFieldName="city">
          <FormControlInput />
        </FormGroup>

        <FormGroup isRequired label="Zip Code" formFieldName="zipCode">
          <FormControlInput />
        </FormGroup>
      </ClusterLayout>

      <StackLayout space={"1rem"}>
        <FormSubmitButton> Save</FormSubmitButton>

        <CenteredVertialLayout space={"1rem"} justifyContent="center">
          <Button color="secondary">Register</Button>

          <Button color="secondary">Register</Button>
        </CenteredVertialLayout>
      </StackLayout>
    </Form>
  );
};
