import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Removes properties with empty string values from an object.
 * @param obj - The object to filter.
 * @returns A new object with empty string values removed.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterEmptyValues = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(obj).filter(([_, value]) => value !== "")
  ) as Partial<T>;
};
