import { useContext } from "react";
import { IFiltersContext, FiltersContext } from "../../context";

export const useFilters = () => {
  const { filters, isActive, setFilters, resetFilters } = useContext(FiltersContext)

  return {
    filters,
    isActive,
    resetFilters,
    setFilters,
  }
};
