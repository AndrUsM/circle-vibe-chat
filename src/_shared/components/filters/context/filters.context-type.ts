export interface IFiltersContext<T> {
  filters: T;
  isActive: boolean;
  initialValue: T;
  setFilters: (filters: T) => void;
  setFilter: (key: keyof T, value: T[keyof T]) => void;
  resetFilters: VoidFunction;
  resetFilter: (key: keyof T) => void;
}
