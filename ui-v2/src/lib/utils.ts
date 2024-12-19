import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 /**
  * A utility function to merge Tailwind CSS classes with the ability to use the `cn` function from `clsx`.
  */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
