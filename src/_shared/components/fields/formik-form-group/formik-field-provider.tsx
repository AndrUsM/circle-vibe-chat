import { useField } from "formik";
import { ExtendedReactFunctionalComponent } from "../../../types/extended-react-functional-component";
import { FieldContextProvider } from "../_shared/field-context/field-context-provider";

interface FormikFormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  formFieldName: string;
}

export const FormikFormGroup: ExtendedReactFunctionalComponent<FormikFormGroupProps> = ({
  formFieldName,
  children
}) => {
  const [{ value, onBlur }, { touched, error }, { setValue, setTouched, setError }] = useField<unknown>(formFieldName);
  return (
    <FieldContextProvider
      value={{
        value,
        errors: error ?? null,
        touched,
        setTouched,
        setValue: (updatedValue) => {
          !touched && setTouched(true);
          setValue(updatedValue);
        },
        onBlur: (e: unknown) => {
          setTouched(true);
          onBlur(e);
        },

        setError: (err) => {
          !touched && setTouched(true);
          setError(err ?? undefined);
        }
      }}
    >{children}</FieldContextProvider>
  )
}