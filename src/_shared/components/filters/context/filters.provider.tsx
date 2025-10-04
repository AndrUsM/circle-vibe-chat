import React, { useEffect, useMemo, useState } from 'react';

import { noop } from '@circle-vibe/components';

import { IFiltersContext } from '@shared/components';

import { FiltersContext } from './filters.context';

interface FiltersProviderProps {
  initialValue: any;
  onChange?: (value: any) => void;
  children?: ((state: IFiltersContext<any>) => React.ReactNode) | React.ReactNode;
}

export const Filters: React.FC<FiltersProviderProps> = ({
  initialValue,
  children,
  onChange = noop,
}) => {
  const [value, setValue] = useState<typeof initialValue>(initialValue);
  const state: IFiltersContext<typeof initialValue> = useMemo(
    () => ({
      filters: value,
      setFilters: (updatedValue) => setValue(updatedValue),
      setFilter: (key, fieldValue) => {
        setValue({
          ...value ?? {},
          [key]: fieldValue,
        });
      },
      initialValue,
      resetFilter: (key) => {
        setValue({
          ...value ?? {},
          [key]: (initialValue as Record<string, any>)[key as string],
        });
      },
      resetFilters: () => setValue(initialValue),
      isActive: JSON.stringify(value) !== JSON.stringify(initialValue),
    }),
    [value],
  );

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <FiltersContext.Provider value={state}>
      {typeof children === 'function' ? children(state as IFiltersContext<typeof initialValue>) : children}
    </FiltersContext.Provider>
  );
};
