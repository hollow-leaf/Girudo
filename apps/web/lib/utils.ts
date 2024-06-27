import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string) {
  if (!address) {
    return ""; // If the address is undefined, return an empty string
  }
  if (address.length <= 12) {
    return address; // If the address is shorter than 12 characters, return it as is
  } else {
    const prefix = address.slice(0, 8); // Get the first six characters
    const suffix = address.slice(-8); // Get the last six characters
    return `${prefix}...${suffix}`; // Combine the first six, ..., and last six characters
  }
}