import { useState } from "react";

export const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    () => setValue(!value),
    setValue
  ] as const;
}