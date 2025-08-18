import { useContext } from "react";
import { FiltersContext } from "../../context";

export const useFilters = () => {
  const { filters, isActive, setFilters, resetFilters } = useContext(FiltersContext)

  return {
    filters,
    isActive,
    resetFilters,
    setFilters,
  }
};
