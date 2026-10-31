import { clsx, type ClassValue } from "clsx";

/**
 * Conditional class joining, deliberately without tailwind-merge.
 *
 * The design tokens generate classes that share Tailwind's own prefixes —
 * `text-title`, `text-body`, `text-lede`. A merge step has to guess whether
 * those are font sizes or colors, and when it guesses wrong it silently deletes
 * one of them. Later-wins in the stylesheet is the honest behaviour here.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
