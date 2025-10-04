export interface IFiltersContext<T> {
  filters: T;
  isActive: boolean;
  initialValue: T;
  setFilters: (filters: T) => void;
  setFilter: (key: string | number | symbol, value: T[keyof T]) => void;
  resetFilters: VoidFunction;
  resetFilter: (key: string | number | symbol) => void;
}
