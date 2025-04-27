import { flip, offset, shift } from "@floating-ui/react";

export const DEFAULT_MIDDLEWARE = [offset(10), flip(), shift()];
