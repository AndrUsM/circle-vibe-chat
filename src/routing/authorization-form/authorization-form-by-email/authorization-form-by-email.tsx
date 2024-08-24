import { Form, Formik } from "formik";
import { useCallback } from "react";

import { TextInput } from "../../../_shared/components/fields/text-input/text-input";
import { FormContainer } from "../../../_shared/components/form-container/form-container";
import { request } from "@core/request/request";

import { AUTHORIZATON_FORM_BY_EMAIL_SCHEMA } from "./constants/authorizaton-form-by-email-schema";

export const AuthorizationFormByEmail: React.FC = () => {
  const onSubmit = useCallback(async () => {
    // ToDo
  }, []);

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={AUTHORIZATON_FORM_BY_EMAIL_SCHEMA}
      initialValues={{} as any}
    >
      <Form>
        <FormContainer>
          <TextInput />
        </FormContainer>
      </Form>
    </Formik>
  );
};
