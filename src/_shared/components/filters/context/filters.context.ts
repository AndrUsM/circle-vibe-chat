import { createContext } from "react";
import { noop } from "@circle-vibe/components";

import { IFiltersContext } from "@shared/components";

export const FiltersContext = createContext<IFiltersContext<any>>({
  filters: {},
  initialValue: {},
  isActive: false,
  setFilters: noop,
  setFilter: noop,
  resetFilters: noop,
  resetFilter: noop,
})
