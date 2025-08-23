import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { noop } from "@circle-vibe/components";

import { FiltersContext } from "./filters.context";
import { IFiltersContext } from "@shared/components";

interface FiltersProviderProps<T = unknown> {
  initialValue: T;
  onChange?: (value: T) => void;
  children?: ((state: IFiltersContext<T>) => React.ReactNode) | React.ReactNode;
}

export const Filters: React.FC<FiltersProviderProps> = ({
  initialValue,
  children,
  onChange = noop,
}) => {
  const [value, setValue] = useState<any>(initialValue);
  const state: IFiltersContext<any> = useMemo(
    () => ({
      filters: value,
      setFilters: (updatedValue) => setValue(updatedValue),
      setFilter: (key, fieldValue) => {
        setValue({
          ...value,
          [key]: fieldValue,
        });
      },
      initialValue,
      resetFilter: (key) => {
        setValue({
          ...value,
          [key]: (initialValue as Record<string, any>)[key as string],
        });
      },
      resetFilters: () => setValue(initialValue),
      isActive: JSON.stringify(value) !== JSON.stringify(initialValue),
    }),
    [value]
  );

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <FiltersContext.Provider value={state}>
      {typeof children === "function" ? children(state) : children}
    </FiltersContext.Provider>
  );
};
