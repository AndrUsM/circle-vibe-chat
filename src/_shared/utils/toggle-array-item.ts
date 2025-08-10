const DEFAULT_COMPARATOR = (a: any, b: any) => a === b;

export const toggleArrayItem = <T>(
  array: T[],
  item: T,
  comparator?: (a: T, b: T) => boolean
): T[] => {
  const index = array.findIndex((el) =>
    (comparator ?? DEFAULT_COMPARATOR)(el, item)
  );

  if (index === -1) {
    return [...array, item];
  }

  return array.filter((_, i) => i !== index);
};
