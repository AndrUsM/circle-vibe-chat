import { Form, Formik } from "formik";
import React, { useCallback } from "react";

import { request } from "../../core/request/request";
import { TextInput } from "../../_shared/components/fields/text-input/text-input";
import { FormContainer } from "../../_shared/components/form-container/form-container";

// import {request} from 'core/request/request';

export const AuthorizationForm: React.FC = () => {
  const onSubmit = useCallback(async () => {
    const requestResult = await request({
      url: "/api/test",
    });
  }, []);

  return (
    <Formik>
      <Form>
        <FormContainer>
          <TextInput />
        </FormContainer>
      </Form>
    </Formik>
  );
};
