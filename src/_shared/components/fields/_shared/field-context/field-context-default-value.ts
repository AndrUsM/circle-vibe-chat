import { FieldContextValue } from "./field-context-value.type";

export const FIELD_CONTEXT_DEFAULT_VALUE: FieldContextValue = {
  value: undefined,
  errors: null,
  touched: false,
  setTouched: (_touched: boolean) => {},
  setError: (_error) => {},
  setValue: (_value) => {},
  onBlur: (_e) => {},
};
