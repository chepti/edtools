import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Basic error handler function
export const handleError = (error: unknown) => {
  console.error("An error occurred:", error)
  // In a real application, you might want to log this error to a service
  // or display a more user-friendly message.
  // For Server Actions, throwing an error might be appropriate
  // to propagate it back to the client component.
  if (error instanceof Error) {
    throw new Error(`Error: ${error.message}`);
  } else {
    throw new Error('An unknown error occurred');
  }
}
