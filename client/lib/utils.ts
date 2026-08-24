import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Strips leading and trailing slashes from a slug.
 * Prevents double-slash URLs when constructing root-level content paths.
 */
export function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '');
}
