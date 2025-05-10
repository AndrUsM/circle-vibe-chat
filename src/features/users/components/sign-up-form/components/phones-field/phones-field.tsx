import { FieldArray } from "formik";

import {
  Button,
  CenteredVertialLayout,
  FormControlInput,
  FormGroup,
  Label,
  Show,
  StackLayout,
  useFormContext,
} from "@circle-vibe/shared";

export const PhonesField: React.FC = () => {
  const { values } = useFormContext<{
    phones: string[];
  }>();

  return (
    <StackLayout>
      <Label>Phones</Label>

      <FieldArray name="phones">
        {({ push, remove }) => (
          <StackLayout space="1rem">
            {values.phones.map((_, index) => {
              <FormGroup formFieldName={`phones[${index}]`}>
                <CenteredVertialLayout>
                  <FormControlInput type="email" />
                  <Button
                    onClick={() => {
                      push("");
                    }}
                  >
                    + Add
                  </Button>
                </CenteredVertialLayout>

                <Show.When isTrue={Boolean(values?.phones?.length)}>
                  <Button
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    Remove
                  </Button>
                </Show.When>
              </FormGroup>;
            })}
          </StackLayout>
        )}
      </FieldArray>
    </StackLayout>
  );
};
