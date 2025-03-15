import { Form, Formik } from "formik";
import { useCallback } from "react";

import { TextInput, FormikFormControl } from '@circle-vibe/shared';

import { request } from "@core/request/request";

import { AUTHORIZATON_FORM_SCHEMA } from "./constants/authorizaton-form-schema";

export const AuthorizationFormByEmail: React.FC = () => {
  const onSubmit = useCallback(async () => {
    // ToDo
  }, []);

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={AUTHORIZATON_FORM_SCHEMA}
      initialValues={{} as any}
    >
      <Form>
        <FormikFormControl>
          <TextInput />
        </FormikFormControl>
      </Form>
    </Formik>
  );
};
