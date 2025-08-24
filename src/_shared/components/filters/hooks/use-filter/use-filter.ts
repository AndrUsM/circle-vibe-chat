import { useContext } from 'react';

import { FiltersContext } from '../../context';

export const useFilter = (filterKey: string) => {
  const { filters, initialValue, setFilter, resetFilter } = useContext(FiltersContext);

  return {
    filter: filters[filterKey],
    isActive: JSON.stringify(filters[filterKey]) !== JSON.stringify(initialValue[filterKey]),
    reset: () => resetFilter(filterKey),
    setFilter: (value: any) => setFilter(filterKey, value),
  };
};
