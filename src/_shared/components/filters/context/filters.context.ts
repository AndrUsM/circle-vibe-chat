import { createContext } from "react";
import { noop } from "@circle-vibe/components";

import { IFiltersContext } from "./filters.context-type";

export const FiltersContext = createContext<IFiltersContext<any>>({
  filters: {},
  isActive: false,
  setFilters: noop,
  setFilter: noop,
  resetFilters: noop,
  resetFilter: noop,
})
